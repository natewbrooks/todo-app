import React from 'react';
import { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { BiSolidEdit } from 'react-icons/bi';
import { FaXmark } from 'react-icons/fa6';
import ScheduleTaskModal from './ScheduleTaskModal';
import { AnimatePresence, motion } from 'framer-motion';

export default function SelectActionModal({ selectModalActive }) {
	const [actionSelected, setAction] = useState('none');
	const selectAction = (action) => {
		switch (action) {
			case 'none':
				setAction('none');
				selectModalActive(false);
				break;
			case 'task':
				setAction('task');
				break;
			case 'blueprint':
				setAction('blueprint');
				break;
		}
	};
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className='absolute z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-zinc-800 pb-1 rounded-lg'>
				<motion.div
					className='drop-shadow-sm flex flex-row'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}>
					{actionSelected == 'none' && (
						<div className='relative flex flex-col w-full h-full'>
							<div className='outline -outline-offset-1 outline-zinc-800 rounded-md overflow-hidden'>
								<div className='flex justify-between items-center bg-zinc-800 w-full h-full text-zinc-200 header text-center'>
									<span className='px-2'>Select an Action:</span>
									<div className='h-full'>
										<button
											onClick={() => selectAction('none')}
											className='flex w-full h-full p-2 items-start bg-zinc-800 hover:bg-zinc-700 rounded-l-md'>
											<div>
												<FaXmark
													size={14}
													className='text-zinc-200'
												/>
											</div>
										</button>
									</div>
								</div>
								<div className='flex flex-col w-full bg-white'>
									<button
										onClick={() => selectAction('blueprint')}
										className='hover:bg-zinc-200 flex flex-row items-center justify-start space-x-2 px-4 py-2 border-b-2 border-zinc-300'>
										<div className='p-1 bg-zinc-200 rounded-full flex items-center justify-center'>
											<BiSolidEdit
												size={20}
												className='text-zinc-800'
											/>
										</div>
										<div className='flex flex-col items-start -space-y-[0.15rem]'>
											<h2 className='text-[16px] text-zinc-800'>Create Blueprint</h2>
											<p className='text-zinc-800 subtext text-[10px]'>
												Design a new reusable task blueprint.
											</p>
										</div>
									</button>
									<button
										onClick={() => selectAction('task')}
										className='hover:bg-zinc-200 flex flex-row items-center justify-start space-x-2 px-4 py-2 '>
										<div className='p-1 bg-zinc-200 rounded-full flex items-center justify-center'>
											<FaBell
												size={20}
												className='text-zinc-800'
											/>
										</div>
										<div className='flex flex-col items-start -space-y-[0.15rem] '>
											<h2 className='text-[16px] text-zinc-800'>Schedule Task</h2>
											<p className='text-zinc-800 subtext text-[10px]'>
												Add a task to the calendar.
											</p>
										</div>
									</button>
								</div>
							</div>
						</div>
					)}
					{actionSelected == 'task' && <ScheduleTaskModal selectAction={selectAction} />}
					{actionSelected == 'blueprint' && <ScheduleTaskModal selectAction={selectAction} />}
					{/* ANOTHER ACTION COULD BE IMPORTING FROM BLACKBORAD OR CANVAS */}
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
