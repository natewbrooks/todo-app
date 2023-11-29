import React from 'react';
import { useState } from 'react';
import MonthlyCalendarDay from './MonthlyCalendarGridDay';
import CalendarOptions from '../CalendarOptions';
import CalendarTaskbar from '../CalendarTaskbar';

export default function MonthlyCalendarGridItem({ layout, name, date }) {
	const [isGrid, setIsGrid] = useState(layout === 'grid');

	return (
		<div className='z-50 flex w-full justify-between text-[8px] lg:text-[10px] whitespace-nowrap space-x-1'>
			<div className='w-[70%] overflow-hidden'>
				<span className=''>{name}</span>
			</div>
			<span className='header-bold'>{date}</span>
		</div>
	);
}
