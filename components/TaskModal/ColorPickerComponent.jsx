import React from 'react';
import { FaEyeDropper } from 'react-icons/fa';

export default function ColorPickerComponent({ taskColor, setTaskColor, colors }) {
	return (
		<div className='flex flex-col space-y-1 w-full h-fit items-start text-zinc-800'>
			<div className='flex flex-row space-x-2 items-center justify-center w-fit'>
				{/* <div className='grid h-fit grid-cols-11 gap-[0.2rem] bg-zinc-300 px-2 py-[0.4rem] rounded-md'>
					{colors.map((element, i) => (
						<div
							style={{ backgroundColor: element }}
							className={`h-fit w-fit rounded-full border-2 p-[0.35rem] ${
								taskColor === element ? ' border-zinc-200' : 'border-transparent scale-100'
							} hover:scale-105 active:scale-90 hover:cursor-pointer`}
							key={i}
							onClick={() => setTaskColor(element)}></div>
					))}
				</div> */}
				<div
					style={{ backgroundColor: taskColor }}
					className={`${
						taskColor !== '' ? 'bg-zinc-300' : 'bg-zinc-300'
					} group rounded-md px-1 py-1 h-full items-center flex hover:scale-105 active:scale-90 hover:cursor-pointer hover:bg-zinc-400`}>
					<FaEyeDropper
						size={10}
						className={`${
							taskColor !== '' ? 'text-zinc-800' : 'text-zinc-800'
						} group-hover:scale-110`}
					/>
				</div>
			</div>
		</div>
	);
}
