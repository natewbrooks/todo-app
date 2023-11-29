import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillClockCircle, AiFillCalendar } from 'react-icons/ai';
import { FaXmark } from 'react-icons/fa6';
import { HiCursorClick } from 'react-icons/hi';
import MiniCalendar from './MiniCalendar';

export default function DateComponent({
	day,
	month,
	year,
	minutes,
	hours,
	amOrPM,
	monthNames,
	currentDate,
	setMonth,
	setDay,
	setYear,
	setMinutes,
	setHours,
	setAmOrPM,
}) {
	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const [miniCalendarShown, setMiniCalendarShown] = useState(false);
	const [miniCalendarClicked, setMiniCalendarClicked] = useState(false);

	function handleMiniCalendarClicked() {
		setMiniCalendarShown(!miniCalendarShown);
		if (!miniCalendarClicked) {
			setMiniCalendarClicked(true);
		}
	}

	function getNumberWithSuffix(number) {
		const lastDigit = number % 10;
		const suffix =
			number > 10 && number < 20
				? 'th'
				: lastDigit === 1
				? 'st'
				: lastDigit === 2
				? 'nd'
				: lastDigit === 3
				? 'rd'
				: 'th';

		return number + suffix;
	}

	const handleHourChange = (e) => {
		var value = e.target.value;
		if (!/[a-zA-Z]/.test(value)) {
			const intValue = parseInt(value);
			if (value === '' || (intValue >= 1 && intValue <= 12)) {
				setHours(value);
			} else if (intValue > 12) {
				setHours('12');
				e.target.value = 12;
			} else if (intValue < 0) {
				e.target.value = 0;
			}
		} else {
			e.target.value = '';
		}
	};

	const handleMinuteChange = (e) => {
		var value = e.target.value;
		if (!/[a-zA-Z]/.test(value)) {
			const intValue = parseInt(value);
			if (value === '' || (intValue >= 0 && intValue <= 59)) {
				setMinutes(value);
			} else if (intValue > 59) {
				setMinutes('59');
				e.target.value = 59;
			} else if (intValue < 0) {
				e.target.value = 0;
			}
		} else {
			e.target.value = '';
		}
	};

	const handleYearChange = (e) => {
		var value = e.target.value;
		const intValue = parseInt(value);
		var newDate = new Date(currentDate);

		if (!/[a-zA-Z]/.test(value)) {
			if (intValue >= 2023 && intValue <= 5000) {
				// Prevent setting the year to past years
				if (
					newDate.getFullYear() === new Date().getFullYear() &&
					intValue < new Date().getFullYear()
				) {
					newDate.setFullYear(new Date().getFullYear());
				} else {
					newDate.setFullYear(intValue);
				}

				// If the selected year is the current year and the selected month is less than the current month, set the month to the current month
				if (intValue === new Date().getFullYear() && newDate.getMonth() < new Date().getMonth()) {
					newDate.setMonth(new Date().getMonth());
				}

				setYear(intValue);
			} else if (intValue > 5000) {
				newDate.setFullYear(5000);
				// If the selected year is in the future, set the month to the current month
				if (newDate.getMonth() < new Date().getMonth()) {
					newDate.setMonth(new Date().getMonth());
				}
				setYear(5000);
				e.target.value = 5000;
			} else {
				newDate.setFullYear(new Date().getFullYear());
				setYear(newDate.getFullYear());
			}
		} else {
			e.target.value = '';
		}
	};

	const handleMonthChange = (e) => {
		var value = e.target.value;
		if (!/[a-zA-Z]/.test(value)) {
			const intValue = parseInt(value);
			if (value === '' || (intValue >= 1 && intValue <= 12)) {
				setMonth(monthNames[value - 1]);
			} else if (intValue > 12) {
				setMonth(monthNames[11]);
				e.target.value = 12;
			} else if (intValue < 1) {
				setMonth(monthNames[0]);
				e.target.value = 1;
			}
		} else {
			e.target.value = '';
		}
	};

	const handleDayChange = (e) => {
		var value = e.target.value;
		if (!/[a-zA-Z]/.test(value)) {
			var daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), -1).getDate();
			const intValue = parseInt(value);
			if (value === '' || (intValue >= 1 && intValue <= daysInMonth)) {
				setDay(value);
			} else if (intValue > daysInMonth) {
				setDay(daysInMonth);
				e.target.value = daysInMonth;
			} else if (intValue < 1) {
				e.target.value = 1;
			}
		} else {
			e.target.value = '';
		}
	};

	const calendarVariant = {
		hidden: {
			height: 0,
			overflow: 'hidden',
		},
		visible: {
			height: 'auto',
			transition: {
				duration: 0.5,
			},
		},
		exit: {
			height: 0,
			transition: {
				duration: 0.5,
				delay: 1,
			},
		},
	};

	const closeButtonVariant = {
		hidden: {
			x: '100px',
			maxWidth: 0,
		},
		visible: {
			x: [100, -10, 0],
			maxWidth: '400px',
			transition: {
				delay: 1,
				duration: 0.4,
				ease: 'easeInOut',
			},
		},
		exit: {
			x: [-10, 40],
			maxWidth: 0,
			transition: {
				duration: 0.3,
				ease: 'easeInOut',
			},
			transitionEnd: {
				display: 'none',
				x: 0,
			},
		},
	};

	return (
		<div className='flex flex-col w-full h-full'>
			{miniCalendarShown && (
				<div className='fixed top-0 left-0 lg:left-[18rem] w-full h-fit flex items-center justify-center pb-1 rounded-b-md bg-zinc-800'>
					<div className='w-full h-full flex flex-col items-center justify-center outline outline-zinc-800 rounded-md'>
						<div className='flex justify-between items-center w-full h-full bg-zinc-800 text-zinc-200'>
							<span className='px-2 text-[16px] header'>Select a Date:</span>
							<button
								onClick={() => setMiniCalendarShown(!miniCalendarShown)}
								className='p-2 hover:bg-zinc-700'>
								<FaXmark
									size={14}
									className='text-zinc-200'
								/>
							</button>
						</div>
						<MiniCalendar
							setMonth={setMonth}
							setDay={setDay}
							setYear={setYear}
							selectedDay={day}
							selectedMonth={month}
							selectedYear={year}
						/>
					</div>
				</div>
			)}
			<div className='flex flex-col space-y-2 w-full items-center text-zinc-800'>
				<h2 className='opacity-100 text-[11px] w-full text-zinc-800 header text-center bg-zinc-300 px-2 rounded-md'>
					{daysOfWeek[(day - 1) % 7]}, {month} {getNumberWithSuffix(day)}, {year}{' '}
					{minutes !== '' && hours !== ''
						? `@ ${hours}:${minutes.length < 2 ? '0' + minutes : minutes} ${amOrPM}`
						: ''}
				</h2>

				<div className='flex flex-col w-full space-x-2 items-center justify-center'>
					<AnimatePresence>
						<div className={`flex w-full space-x-2 header items-center`}>
							<div className='rounded-md placeholder:text-zinc-800 text-zinc-800 h-fit w-full justify-start flex items-center space-x-2'>
								<AiFillCalendar
									size={18}
									className='text-zinc-800'
								/>
								<div className='flex flex-row w-full justify-end space-x-1 items-center'>
									<div className='flex flex-col w-fit items-center'>
										<input
											className='w-[30px] bg-zinc-300 placeholder:text-zinc-800 text-zinc-800 rounded-md focus:outline-none select-none text-center hover:bg-zinc-200 hover:cursor-text'
											type='text'
											placeholder={monthNames.indexOf(month) + 1}
											maxLength={2}
											onChange={(e) => handleMonthChange(e)}
										/>
									</div>
									<span className='header text-zinc-800'>/</span>
									<div className='flex flex-col w-fit items-center'>
										<input
											className='w-[30px] bg-zinc-300 placeholder:text-zinc-800 text-zinc-800 rounded-md focus:outline-none select-none text-center hover:bg-zinc-200 hover:cursor-text'
											type='text'
											placeholder={day}
											maxLength={2}
											onChange={(e) => handleDayChange(e)}
										/>
									</div>
									<span className='header text-zinc-800'>/</span>
									<div className='flex flex-col w-fit items-center'>
										<input
											className='w-[40px] bg-zinc-300 text-zinc-800 placeholder:text-zinc-800 rounded-md focus:outline-none select-none text-center hover:bg-zinc-200 hover:cursor-text'
											type='text'
											placeholder={year}
											maxLength={4}
											onChange={(e) => handleYearChange(e)}
										/>
									</div>
								</div>
							</div>
							<p className='header text-[12px] text-zinc-800'>or</p>
							<div
								onClick={() => handleMiniCalendarClicked()}
								className='group px-1 rounded-md bg-zinc-300 h-full w-fit items-center flex justify-center hover:scale-105 active:scale-90 hover:cursor-pointer hover:bg-zinc-200'>
								<HiCursorClick
									size={18}
									className='p-[0.15rem] text-zinc-800 group-active:scale-80 group-hover:scale-105'
								/>
							</div>
						</div>
					</AnimatePresence>
				</div>
			</div>
			<div className='flex flex-row w-full items-start text-zinc-800'>
				<AiFillClockCircle
					size={18}
					className='text-zinc-800'
				/>
				<div className='flex items-center justify-end w-full h-fit text-[12px] space-x-1'>
					<div className='flex items-center justify-center bg-zinc-300 rounded-md header'>
						<input
							className='w-[30px] header text-zinc-800 placeholder:text-zinc-800 px-2 select-none focus:outline-none bg-zinc-300 rounded-l-md text-center hover:bg-zinc-200 hover:cursor-text'
							placeholder='06'
							type='text'
							maxLength={2}
							onChange={(e) => handleHourChange(e)}
						/>
						<div className='text-zinc-800'>:</div>
						<input
							className='w-[30px] px-2 header select-none text-zinc-800 placeholder:text-zinc-800 focus:outline-none bg-zinc-300 rounded-r-md text-center hover:bg-zinc-200 hover:cursor-text'
							placeholder='30'
							type='text'
							maxLength={2}
							onChange={(e) => handleMinuteChange(e)}
						/>
					</div>
					<select
						className='bg-zinc-300 rounded-md pl-1 header py-[0.1rem] focus:outline-none hover:bg-zinc-200 hover:cursor-pointer'
						onChange={(e) => setAmOrPM(e.target.value)}>
						<option value='AM'>AM</option>
						<option value='PM'>PM</option>
					</select>
				</div>
			</div>
		</div>
	);
}
