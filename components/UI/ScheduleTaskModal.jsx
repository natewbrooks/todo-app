import React, { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { BiSolidDownArrow } from 'react-icons/bi';
import COLORS from '../../constants/colors';
import DateComponent from '../TaskModal/DateComponent';
import SubtasksComponent from '../TaskModal/SubtasksComponent';
import ColorPickerComponent from '../TaskModal/ColorPickerComponent';

export default function ScheduleTaskModal({ selectAction }) {
	const colors = [];
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
	const currentDate = new Date();
	const [taskColor, setTaskColor] = useState('');
	const [day, setDay] = useState(new Date().getDate() + 3);
	const [month, setMonth] = useState(monthNames[new Date().getMonth()]);
	const [year, setYear] = useState(new Date().getFullYear());
	const [hours, setHours] = useState('');
	const [minutes, setMinutes] = useState('');
	const [amOrPM, setAmOrPM] = useState('AM');

	const [isBlueprint, setIsBlueprint] = useState(true);
	const [selectingBlueprint, setSelectingBlueprint] = useState(false);

	for (const color in COLORS) {
		if (Object.hasOwnProperty.call(COLORS, color)) {
			colors.push(COLORS[color][300]);
		}
	}

	return (
		<div className='relative flex flex-col w-full h-full items-center'>
			<div className='outline outline-zinc-800 -outline-offset-1 rounded-md overflow-hidden'>
				<div className='flex justify-between items-center bg-zinc-800 w-full h-full text-zinc-200 header text-center'>
					{!selectingBlueprint && <span className='px-2'>Schedule Task:</span>}
					{selectingBlueprint && <span className='px-2'>Select Blueprint:</span>}
					<div className='h-full'>
						<div
							onClick={() => {
								if (selectingBlueprint) {
									setSelectingBlueprint(false);
								} else {
									selectAction('none');
								}
							}}
							className='flex w-full h-full p-2 items-start bg-zinc-800 hover:bg-zinc-700 rounded-l-md'>
							<div>
								<FaXmark
									size={14}
									className='text-zinc-200'
								/>
							</div>
						</div>
					</div>
				</div>
				<div className=' w-full h-full bg-white'>
					{!selectingBlueprint && (
						<form className='flex flex-col space-y-1 text-zinc-800 items-center justify-center'>
							<div className='flex flex-row w-full h-full text-zinc-800 items-center text-[12px] header'>
								<div
									onClick={() => setIsBlueprint(true)}
									className={`${
										isBlueprint
											? 'bg-white text-zinc-800 border-b-2'
											: 'bg-zinc-800/50 text-zinc-200 hover:bg-zinc-800 hover:cursor-pointer'
									} px-2 py-[0.15rem] w-full h-full text-center transition-all duration-300`}>
									Blueprint
								</div>
								<div
									onClick={() => setIsBlueprint(false)}
									className={`${
										!isBlueprint
											? 'bg-white text-zinc-800 border-b-2'
											: 'bg-zinc-800/50 text-zinc-200 hover:bg-zinc-800 hover:cursor-pointer'
									}   text-zinc-200 px-2 py-[0.15rem] w-full h-full text-center transition-all duration-300`}>
									Non-Blueprint
								</div>
							</div>
							<div className='flex flex-col w-full justify-center items-center py-2'>
								<div className='flex flex-col space-y-1 justify-center items-center w-full'>
									<div className='flex flex-col'>
										{isBlueprint && (
											<div
												onClick={() => setSelectingBlueprint(true)}
												className='header text-[12px] placeholder:text-zinc-800 flex items-center justify-center w-full px-1 text-center focus:select-none focus:outline-none  hover:bg-zinc-200 hover:cursor-pointer'>
												<span>Select Blueprint..</span>
											</div>
										)}
										{!isBlueprint && (
											<select className='header text-[12px] placeholder:text-zinc-800 flex items-center justify-center w-full px-1 text-center focus:select-none focus:outline-none  hover:bg-zinc-200 hover:cursor-pointer'>
												<option>Schedule</option>
												<option>Personal</option>
												<option>School</option>
											</select>
										)}

										<input
											placeholder='Task Name'
											className='text-[20px] text-zinc-800  placeholder:text-zinc-800 text-center w-fit px-2 select-none focus:outline-none hover:bg-zinc-200 hover:cursor-text'
										/>
									</div>
									<div className='flex flex-row space-x-1'>
										{!isBlueprint && (
											<select className='text-[12px] w-fit rounded-full text-zinc-800 py-[0.05rem] text-center bg-blue-300 focus:select-none focus:outline-none hover:bg-zinc-200 hover:cursor-pointer'>
												<option>Category</option>
												<option>COSC 336</option>
												<option>MATH 330</option>
												<option>HLTH 102</option>
												<option>MTRO 101</option>
												<option>ENGL 106</option>
												<option>Add Category...</option>
											</select>
										)}
										{!isBlueprint && <ColorPickerComponent />}
									</div>
								</div>

								<div className='flex flex-col space-y-4 px-4 py-4 w-full justify-center items-center'>
									{/* <div className='w-full flex justify-center items-center'>
								<ColorPickerComponent
									taskColor={taskColor}
									setTaskColor={setTaskColor}
									colors={colors}
								/>
							</div> */}
									{!isBlueprint && <SubtasksComponent />}
									<DateComponent
										day={day}
										month={month}
										year={year}
										minutes={minutes}
										hours={hours}
										amOrPM={amOrPM}
										monthNames={monthNames}
										currentDate={currentDate}
										setMonth={setMonth}
										setDay={setDay}
										setYear={setYear}
										setMinutes={setMinutes}
										setHours={setHours}
										setAmOrPM={setAmOrPM}
									/>
									<button
										type='submit'
										className='bg-zinc-800 text-zinc-200 hover:bg-zinc-300 hover:text-zinc-800 hover:cursor-pointer active:scale-90 transition-all duration-300 px-3 py-1 rounded-md header text-[12px] justify-center items-center w-fit'>
										Schedule Task
									</button>
								</div>
							</div>
						</form>
					)}
					{selectingBlueprint && (
						<div className='w-full flex flex-col space-y-1 p-2'>
							{/* <select className='header text-[12px] text-zinc-800 flex items-center justify-center w-full px-1 text-center focus:select-none focus:outline-none hover:bg-zinc-200 hover:cursor-pointer'>
								<option>Schedule</option>
								<option>Personal</option>
								<option>School</option>
							</select> */}
							<div className='flex flex-col w-full space-y-1 header'>
								<div className='flex flex-row items-center space-x-1 w-full justify-center whitespace-nowrap'>
									<span className='text-start text-[10px] bg-blue-400 px-2 rounded-full text-zinc-200'>
										COSC 336
									</span>
									<div className='rounded-sm bg-zinc-400 h-[1px] w-[100%]'></div>

									<BiSolidDownArrow
										fill='black'
										size={10}
										// className={`${
										// 	isCategoryCollapsed ? 'rotate-180' : 'rotate-0'
										// } transition-all duration-300`}
									/>
								</div>
								<div className='flex flex-col space-y-1'>
									<span className='hover:bg-zinc-200 hover:cursor-pointer text-center text-[10px] text-zinc-800'>
										Assignment
									</span>
									<span className='hover:bg-zinc-200 hover:cursor-pointer text-center text-[10px] text-zinc-800'>
										Quiz
									</span>
									<span className='hover:bg-zinc-200 hover:cursor-pointer text-center text-[10px] text-zinc-800'>
										Spinach Puffs
									</span>
									<span className='hover:bg-zinc-200 hover:cursor-pointer text-center text-[10px] text-zinc-800'>
										Margot Robbie
									</span>
								</div>
							</div>
							<div className='flex flex-col w-full space-y-1 header'>
								<div className='flex flex-row items-center space-x-1 w-full justify-center whitespace-nowrap'>
									<span className='text-start text-[10px] bg-red-400 px-2 rounded-full text-zinc-200'>
										HLTH 220
									</span>
									<div className='rounded-sm bg-zinc-400 h-[1px] w-[100%]'></div>

									<BiSolidDownArrow
										fill='black'
										size={10}
										// className={`${
										// 	isCategoryCollapsed ? 'rotate-180' : 'rotate-0'
										// } transition-all duration-300`}
									/>
								</div>
								<div className='flex flex-col space-y-1'>
									<span className='hover:bg-zinc-200 hover:cursor-pointer text-center text-[10px] text-zinc-800'>
										Essay
									</span>
									<span className='hover:bg-zinc-200 hover:cursor-pointer text-center text-[10px] text-zinc-800'>
										Quiz
									</span>
									<span className='hover:bg-zinc-200 hover:cursor-pointer text-center text-[10px] text-zinc-800'>
										Assignment
									</span>
									<span className='hover:bg-zinc-200 hover:cursor-pointer text-center text-[10px] text-zinc-800'>
										VoiceThread
									</span>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

// export default function ScheduleTaskModal({ selectAction }) {
// 	const colors = [];
// 	const monthNames = [
// 		'January',
// 		'February',
// 		'March',
// 		'April',
// 		'May',
// 		'June',
// 		'July',
// 		'August',
// 		'September',
// 		'October',
// 		'November',
// 		'December',
// 	];
// 	const currentDate = new Date();
// 	const [taskColor, setTaskColor] = useState('');
// 	const [day, setDay] = useState(new Date().getDate() + 3);
// 	const [month, setMonth] = useState(monthNames[new Date().getMonth()]);
// 	const [year, setYear] = useState(new Date().getFullYear());
// 	const [hours, setHours] = useState('');
// 	const [minutes, setMinutes] = useState('');
// 	const [amOrPM, setAmOrPM] = useState('AM');

// 	for (const color in COLORS) {
// 		if (Object.hasOwnProperty.call(COLORS, color)) {
// 			colors.push(COLORS[color][300]);
// 		}
// 	}

// 	return (
// 		<div className='relative flex flex-col w-full h-full items-center'>
// 			<div className='outline outline-zinc-800 -outline-offset-1 rounded-md overflow-hidden'>
// 				<div className='flex justify-between items-center bg-zinc-800 w-full h-full text-zinc-200 header text-center'>
// 					<span className='px-2'>Schedule Task:</span>
// 					<div className='h-full'>
// 						<div
// 							onClick={() => selectAction('none')}
// 							className='flex w-full h-full p-2 items-start bg-zinc-800 hover:bg-zinc-700 rounded-l-md'>
// 							<div>
// 								<FaXmark
// 									size={14}
// 									className='text-zinc-200'
// 								/>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 				<div className='flex flex-col rounded-r-md rounded-bl-md bg-white px-4 py-2'>
// 					<form className='flex flex-col space-y-3 text-zinc-800'>
// 						<div className='flex flex-row space-x-2'>
// 							<div className='flex flex-col space-y-1 w-full items-start text-zinc-800'>
// 								<h3 className='opacity-100 text-[10px] merri'>* Schedule</h3>
// 								<select className='text-zinc-800 flex items-center justify-center w-full px-1 py-[0.15rem] text-center bg-zinc-300 rounded-md focus:select-none focus:outline-none  hover:bg-zinc-200 hover:cursor-pointer'>
// 									<option>Personal</option>
// 									<option>School</option>
// 								</select>
// 							</div>
// 							<div className='flex flex-col space-y-1 w-full items-start text-zinc-800'>
// 								<h3 className='opacity-100 text-[10px] merri'>Task Category</h3>
// 								<select className='text-zinc-800 flex items-center justify-center w-full px-1 py-[0.15rem] text-center bg-zinc-300 rounded-md focus:select-none focus:outline-none hover:bg-zinc-200 hover:cursor-pointer'>
// 									<option>NONE</option>
// 									<option>COSC 336</option>
// 									<option>MATH 330</option>
// 									<option>HLTH 102</option>
// 									<option>MTRO 101</option>
// 									<option>ENGL 106</option>
// 									<option>Add Category...</option>
// 								</select>
// 							</div>
// 						</div>
// 						<div className='flex flex-col space-y-1 w-full items-start text-zinc-800'>
// 							<h3 className='opacity-100 text-[10px] merri'>* Task Name</h3>
// 							<div className='flex items-center justify-center w-full'>
// 								<input className='text-zinc-800 placeholder:text-zinc-800 text-center w-full px-2 select-none focus:outline-none bg-zinc-300 rounded-md hover:bg-zinc-200 hover:cursor-text' />
// 							</div>
// 						</div>
// 						<SubtasksComponent />

// 						<DateComponent
// 							day={day}
// 							month={month}
// 							year={year}
// 							minutes={minutes}
// 							hours={hours}
// 							amOrPM={amOrPM}
// 							monthNames={monthNames}
// 							currentDate={currentDate}
// 							setMonth={setMonth}
// 							setDay={setDay}
// 							setYear={setYear}
// 							setMinutes={setMinutes}
// 							setHours={setHours}
// 							setAmOrPM={setAmOrPM}
// 						/>

// 						<ColorPickerComponent
// 							taskColor={taskColor}
// 							setTaskColor={setTaskColor}
// 							colors={colors}
// 						/>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
