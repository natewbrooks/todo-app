import React from 'react';
import { useState } from 'react';
import MonthlyCalendarGridItem from './MonthlyCalendarGridItem';
import colors from '@/constants/colors';

export default function MonthlyCalendarGridCategory({ layout, isGray, name, color }) {
	const [isGrid, setIsGrid] = useState(layout === 'grid');

	return (
		<div
			style={{ outlineColor: colors[color][400], backgroundColor: colors[color][200] }}
			className={`relative w-full flex justify-between h-fit px-2 outline rounded-md text-zinc-800`}>
			<span
				className={`subtext absolute -top-2 left-[20%] lg:left-[30%] px-2 text-[8px] lg:text-[10px] h-4 items-center justify-center flex rounded-full`}
				style={{ color: '#FFFFFF', backgroundColor: colors[color][400] }}>
				{name}
			</span>
			<div className='flex flex-col w-full -space-y-1 pt-2 pb-[0.35rem]'>
				<MonthlyCalendarGridItem
					name={'Assignment'}
					date={'12:45 PM'}
					color={color}
				/>
				<MonthlyCalendarGridItem
					name={'Quiz'}
					date={'1:05 PM'}
					color={color}
				/>
			</div>
		</div>
	);
}
