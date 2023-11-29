import React from 'react';
import { useState } from 'react';
import { BiSolidStar } from 'react-icons/bi';
import Checkbox from '../Widgets/Checkbox';
import colors from '@/constants/colors';

export default function TodoTask({
	index,
	name,
	assignDate,
	dueDate,
	completedDate,
	weekly,
	category,
}) {
	const [isComplete, setComplete] = useState(completedDate != null);
	const [date, setCompleteDate] = useState(completedDate);
	const alternateBKG = index % 2 == 0;
	let backgroundColor = '#FFFFFF';
	if (alternateBKG && !isComplete) {
		backgroundColor = colors['zinc'][200];
	} else if (alternateBKG && isComplete) {
		backgroundColor = colors['green'][200];
	} else if (!alternateBKG && isComplete) {
		backgroundColor = colors['green'][100];
	} else if (!alternateBKG && !isComplete) {
		backgroundColor = '#FFFFFF';
	}

	if (isComplete && weekly && !alternateBKG) {
		backgroundColor = colors['green'][100];
	} else if (alternateBKG && isComplete && weekly) {
		backgroundColor = colors['green'][200];
	}

	if (!isComplete && !alternateBKG) {
		backgroundColor = '#FFFFFF';
	} else if (!isComplete && alternateBKG) {
		backgroundColor = colors['zinc'][200];
	}

	const setCompleted = () => {
		setComplete(!isComplete);
		const currentDate = new Date();
		setCompleteDate(currentDate.getDay() + ' ' + currentDate.getDate());
	};

	return (
		<div
			className={`relative w-full flex space-x-4 lg:px-5 py-3 items-center rounded-md transition-all duration-300`}
			style={{ backgroundColor: backgroundColor }}>
			<span
				className={`flex header text-[14px] lg:text-[16px] px-2 lg:px-3 border-r-2 ${
					isComplete ? 'border-green-200' : 'border-zinc-200'
				}`}>
				#{index}
			</span>
			<div className='flex flex-col w-fit space-y-1 py-1'>
				<h2 className='text-zinc-800 text-[14px] lg:text-[16px]'>{name}</h2>
				<div className='flex space-x-1 items-center  text-center mr-2'>
					{!isComplete && (
						<div className='flex flex-col'>
							<span className='bg-zinc-800 px-2 rounded-full text-zinc-200 subtext text-[10px] lg:text-[12px] flex items-center'>
								5 <BiSolidStar size={8} />
							</span>
							<span className='text-zinc-800 subtext text-[7px] lg:text-[9px] text-center'>
								Priority
							</span>
						</div>
					)}
					{weekly && category != null && (
						<div className='flex flex-col'>
							<span
								className={`bg-blue-300 px-2 rounded-full text-zinc-800 subtext text-[10px] lg:text-[12px]`}>
								{category}
							</span>
							<span className='text-zinc-800 subtext text-[7px] lg:text-[9px] text-center'>
								Category
							</span>
						</div>
					)}
					<div className='flex flex-col'>
						<span
							className={`bg-zinc-300 px-2 rounded-full text-zinc-800 subtext text-[10px] lg:text-[12px]`}>
							{assignDate}
						</span>
						<span className='text-zinc-800 subtext text-[7px] lg:text-[9px] text-center'>
							Assigned
						</span>
					</div>
					<div className='flex flex-col'>
						<span
							className={`${
								isComplete ? 'bg-zinc-300' : 'bg-red-300'
							} px-2 rounded-full text-zinc-800 subtext text-[10px] lg:text-[12px] transition-all duration-300`}>
							{dueDate}
						</span>
						<span className='text-zinc-800 subtext text-[7px] lg:text-[9px] text-center'>Due</span>
					</div>
					<div
						className={`flex flex-col ${
							isComplete ? 'opacity-100' : 'opacity-0'
						} transition-all duration-300`}>
						<span className='bg-zinc-300 px-2 rounded-full text-zinc-800 subtext text-[10px] lg:text-[12px] text-center'>
							{date}
						</span>
						<span className='text-zinc-800 subtext text-[7px] lg:text-[9px] text-center'>
							Completed
						</span>
					</div>
				</div>
			</div>
			<div
				onClick={() => setCompleted()}
				className={`hidden xs:block absolute right-4 ${isComplete ? 'opacity-50' : 'opacity-100'}`}>
				<Checkbox
					size={12}
					checked={isComplete ? true : false}
				/>
			</div>
		</div>
	);
}
