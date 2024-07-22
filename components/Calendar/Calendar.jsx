import React, { useCallback, useState, useEffect } from 'react';
import MonthlyCalendarDay from './Grid/MonthlyCalendarGridDay';
import MonthlyCalendarGrid from './Grid/MonthlyCalendarGrid';
import MonthlyCalendarList from './List/MonthlyCalendarList';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import SelectActionModal from '../UI/SelectActionModal';
import CalendarTaskbar from './CalendarTaskbar';
import CalendarOptions from './CalendarOptions';

export default function Calendar() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectActionModalActive, setSelectActionModalActive] = useState(false);
	const [showSearch, setSearchActive] = useState(false);
	const [showSearchError, setSearchError] = useState([
		false,
		'Please use numeric values for searches',
	]);
	const [monthYearValues, setMonthYearValues] = useState([null, null]);
	const initialLayout = 'grid';
	const [layout, setCurrentLayout] = useState(initialLayout);
	const [previousLayout, setPreviousLayout] = useState(initialLayout);
	const [layoutChangeSource, setLayoutChangeSource] = useState('initial');

	useEffect(() => {
		const updateLayoutBasedOnViewport = () => {
			const width = window.innerWidth;

			if (width < 548) {
				if (layout !== 'list') {
					setPreviousLayout(layout); // Save the current layout
					setCurrentLayout('list');
					setLayoutChangeSource('responsive'); // Set the source of the layout change
				}
			} else if (width >= 548 && layout === 'list' && layoutChangeSource === 'responsive') {
				// Revert to previous layout only if the change was responsive
				setCurrentLayout(previousLayout || 'grid');
				setPreviousLayout(null); // Clear the previous layout
			}
		};

		window.addEventListener('resize', updateLayoutBasedOnViewport);
		updateLayoutBasedOnViewport(); // Call on mount

		return () => {
			window.removeEventListener('resize', updateLayoutBasedOnViewport);
		};
	}, [layout, previousLayout]);

	const handleSearch = () => {
		// if (showSearch === false) {
		// 	setSearchActive(true);
		// 	setMonthYearValues([null, null]); // Reset values
		// 	setSearchError([false, showSearchError[1]]);
		// 	return;
		// }

		let month = parseInt(monthYearValues[0]);
		let year = parseInt(monthYearValues[1]);

		// Check if both month and year are default values or empty
		if (
			(isNaN(month) || month === null || month === '') &&
			(isNaN(year) || year === null || year === '')
		) {
			setSearchActive(false);
			setMonthYearValues([null, null]); // Reset values
			setSearchError([false, showSearchError[1]]);
			return;
		}

		// Clamp the year between 0 and 5000
		year = Math.max(0, Math.min(year, 5000));

		// if a number and is between 1 and 12
		if (!isNaN(month) && month >= 1 && month <= 12) {
			setCurrentDate(new Date(year || currentDate.getFullYear(), month - 1, 1)); // Months are zero-based
			setSearchActive(false);
			setSearchError([false, showSearchError[1]]);
			return;
		} else if (!isNaN(year)) {
			// If only year is provided, assume January for the search
			setCurrentDate(new Date(year, 0, 1));
			setSearchActive(false);
			setSearchError([false, showSearchError[1]]);
			return;
		} else {
			setSearchError([true, 'Please use numbers 1-12 for searching the month.']);
			return;
		}
	};

	const changeMonthToCurrent = () => {
		setCurrentDate(new Date());
	};

	const setLayoutManually = (proposedLayout) => {
		setPreviousLayout(layout); // Save the current layout before manual change
		setCurrentLayout(proposedLayout);
		scrollToToday();
		setLayoutChangeSource('manual'); // Set the source of the layout change
	};

	const scrollToToday = () => {
		const layoutContainer = document.getElementById('layoutContainer'); // ID of the container
		const targetElement = layoutContainer.querySelector('#todayElement');

		if (layoutContainer && targetElement) {
			// Calculate the top offset of the element
			const targetPosition = targetElement.offsetTop;
			// Calculate the height of the element
			const targetHeight = targetElement.offsetHeight;
			// Calculate the visible height of the container
			const containerHeight = layoutContainer.clientHeight;

			// Adjust the scroll position so the element is centered
			// Subtract half the container's height and add half the element's height
			const scrollTo = targetPosition - containerHeight / 2 + targetHeight / 2;

			layoutContainer.scrollTo({ top: scrollTo, behavior: 'smooth' });
		}
	};

	const daysInMonth = () => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth() + 1; // Months are zero-indexed
		return new Date(year, month, 0).getDate();
	};

	// Create an array of day numbers for the current month
	const daysArray = Array.from({ length: daysInMonth() }, (_, index) => index + 1);
	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	// Get the first day of the current month
	const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
	const previousMonthsDays = [];

	// If day of the week is not Sunday
	if (firstDayOfMonth.getDay() != 0) {
		// Create an array of day numbers for the previous month
		let daysToCount = firstDayOfMonth.getDay();
		let lastDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, -1);

		for (; daysToCount > 0; daysToCount--) {
			previousMonthsDays.unshift(lastDayOfLastMonth.getDate());
			lastDayOfLastMonth.setHours(-24);
		}
	}
	const handleMonthChange = (direction) => {
		const newDate = new Date(currentDate);
		if (direction === 'left') {
			newDate.setMonth(newDate.getMonth() - 1);
		} else if (direction === 'right') {
			newDate.setMonth(newDate.getMonth() + 1);
		}
		setCurrentDate(newDate);
		let yearDisplay = document.getElementById('yearDisplay');
		yearDisplay.value = newDate.getFullYear();
	};

	return (
		<section className='w-full h-full overflow-hidden'>
			{selectActionModalActive && (
				<SelectActionModal selectModalActive={setSelectActionModalActive} />
			)}
			<div
				className={`${
					selectActionModalActive ? 'blur' : 'blur-none'
				}   relative flex flex-col w-full justify-center items-center h-full transition-all duration-300`}>
				{/* HEADER */}
				<div className='relative flex flex-row space-x-5 w-full h-fit py-2 justify-center'>
					<button onClick={() => handleMonthChange('left')}>
						<FaArrowLeft
							className='text-zinc-900 hover:scale-125 transition-all duration-300 active:scale-100 active:duration-100'
							size={12}
						/>
					</button>
					<div className='flex flex-col items-center justify-center '>
						<h2 className='text-zinc-900 text-lg w-[8rem] text-center'>
							{monthNames[currentDate.getMonth()]}
						</h2>
						{/* <h3 className='text-zinc-900'>{currentDate.getFullYear()}</h3> */}
						<input
							className='text-zinc-400 text-center active:outline-none outline-none'
							id='yearDisplay'
							placeholder={currentDate.getFullYear()}
							maxLength={4}
							onChange={(e) => {
								setMonthYearValues([currentDate.getMonth() + 1, e.currentTarget.value]);
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleSearch();
									console.log('Searching ' + monthYearValues[1]);
								}
							}}
						/>
					</div>
					<button onClick={() => handleMonthChange('right')}>
						<FaArrowRight
							className='text-zinc-900 hover:scale-125 transition-all duration-300 active:scale-100 active:duration-100'
							size={12}
						/>
					</button>
				</div>

				{/* ABSOLUTE POSITIONED ELEMENTS */}

				<CalendarOptions
					monthYearValues={monthYearValues}
					setMonthYearValues={setMonthYearValues}
					showSearch={showSearch}
					setShowSearch={setSearchActive}
					showSearchError={showSearchError}
					handleSearch={handleSearch}
					changeMonthToCurrent={changeMonthToCurrent}
					layout={layout}
					setLayoutManually={setLayoutManually}
				/>

				{/* <div className='xl:flex flex-col space-y-2 items-center justify-center hidden'>
					<div className='line rounded-sm border-zinc-300 border-t-2 w-[15%]'></div>
					<div>
						<CalendarTaskbar
							isSelectModalActive={selectActionModalActive}
							selectAction={setSelectActionModalActive}
						/>
					</div>
					<div className='line rounded-sm border-zinc-300 border-t-2 w-[30%]'></div>
				</div> */}

				<div className='flex w-full h-full pb-4 px-2 overflow-auto'>
					{layout == 'grid' && (
						<MonthlyCalendarGrid
							previousMonthsDays={previousMonthsDays}
							daysArray={daysArray}
							currentDate={currentDate}
							bgColor={'bg-zinc-200'}
							itemColor={'bg-white'}
							textColor={`text-zinc-800`}
							monthYearValues={monthYearValues}
							setMonthYearValues={setMonthYearValues}
							selectActionModalActive={selectActionModalActive}
							setSelectActionModalActive={setSelectActionModalActive}
							setCurrentDate={setCurrentDate}
							onReadyToScroll={scrollToToday}
						/>
					)}
					{layout == 'list' && (
						<MonthlyCalendarList
							previousMonthsDays={previousMonthsDays}
							daysArray={daysArray}
							currentDate={currentDate}
							bgColor={'bg-zinc-200'}
							itemColor={'bg-white'}
							textColor={`text-zinc-800`}
							monthYearValues={monthYearValues}
							setMonthYearValues={setMonthYearValues}
							selectActionModalActive={selectActionModalActive}
							setSelectActionModalActive={setSelectActionModalActive}
							setCurrentDate={setCurrentDate}
							onReadyToScroll={scrollToToday}
						/>
					)}
				</div>
			</div>
			{selectActionModalActive && (
				<selectActionModal
					previousMonthsDays={previousMonthsDays}
					daysArray={daysArray}
					currentDate={currentDate}
					setSelectActionModalActive={setSelectActionModalActive}
					monthNames={monthNames}
				/>
			)}
		</section>
	);
}
