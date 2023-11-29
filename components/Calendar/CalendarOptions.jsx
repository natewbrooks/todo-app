import React from 'react';
import MonthlyCalendarDay from './Grid/MonthlyCalendarGridDay';
import { FaSearch, FaClock } from 'react-icons/fa';
import { BsFillGrid3X3GapFill, BsList } from 'react-icons/bs';

export default function CalendarOptions({
	monthYearValues,
	setMonthYearValues,
	showSearch,
	setShowSearch,
	showSearchError,
	handleSearch,
	changeMonthToCurrent,
	layout,
	setLayoutManually,
}) {
	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<div>
			<div className={`hidden xs:flex flex-col items-center top-6 xl:top-10 left-10 absolute`}>
				<div
					className={`${
						showSearch ? 'block' : 'hidden'
					} absolute left-11 md:-left-8 md:top-6  w-fit h-fit flex space-x-1`}>
					<input
						className='w-[50px] text-center bg-zinc-200 rounded-full text-zinc-800 focus:outline-none text-[10px] subtext'
						id='monthSearch'
						type='number'
						maxLength={2}
						min={1}
						max={12}
						onChange={(e) => {
							setMonthYearValues([e.currentTarget.value, monthYearValues[1]]);
						}}
						onKeyDown={(e) => handleKeyPress(e)}
						placeholder='Month'></input>
					<input
						className='w-[50px] text-center bg-zinc-200 rounded-full text-zinc-800 focus:outline-none text-[10px] subtext'
						id='yearSearch'
						type='number'
						maxLength={4}
						min={0}
						max={5000}
						onChange={(e) => {
							setMonthYearValues([monthYearValues[0], e.currentTarget.value]);
						}}
						onKeyDown={(e) => handleKeyPress(e)}
						placeholder='Year'></input>
				</div>
				{showSearchError[0] && (
					<div className='text-center absolute w-[200px] top-6 -left-6 md:left-20 md:top-2 md:w-[100px] subtext text-[8px] text-red-400'>
						{showSearchError[1]}
					</div>
				)}
				<div className={`hidden xs:flex space-x-2`}>
					<FaSearch
						className={`text-zinc-800 hover:cursor-pointer hover:scale-105 transition-all duration-300 active:scale-90 active:duration-100`}
						onClick={() => {
							if (showSearch) {
								handleSearch();
							} else {
								setShowSearch(true);
							}
							document.getElementById('monthSearch').value = null;
							document.getElementById('yearSearch').value = null;
							setMonthYearValues([null, null]);
						}}
						size={14}
					/>
					<FaClock
						className={`text-zinc-800 hover:cursor-pointer hover:scale-105 transition-all duration-300 active:scale-90 active:duration-100`}
						onClick={() => changeMonthToCurrent()}
						size={14}
					/>
				</div>
			</div>
			{/* GRID OR LIST */}
			<div className='hidden xs:flex flex-row top-4 xl:top-8 right-10 absolute'>
				<div
					onClick={() => setLayoutManually('grid')}
					className={`${
						layout == 'grid'
							? 'bg-white text-zinc-800 border-zinc-800'
							: 'bg-zinc-800 text-white border-transparent opacity-50 hover:opacity-100 hover:drop-shadow-md hover:cursor-pointer'
					} bg-white px-2 py-1 rounded-l-md transition-all duration-300 border-2`}>
					<BsFillGrid3X3GapFill size={14} />
				</div>
				<div
					onClick={() => setLayoutManually('list')}
					className={`${
						layout == 'list'
							? 'bg-white text-zinc-800 border-zinc-800'
							: 'bg-zinc-800 text-white border-transparent opacity-50 hover:opacity-100 hover:drop-shadow-md hover:cursor-pointer'
					}  px-2 py-1 rounded-r-md transition-all duration-300 border-2`}>
					<BsList size={14} />
				</div>
			</div>
		</div>
	);
}
