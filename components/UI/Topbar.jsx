import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BiSolidDownArrow } from 'react-icons/bi';
import { IoSettingsSharp } from 'react-icons/io5';
import { FaSquarePlus } from 'react-icons/fa6';
import Settings from './Settings/Settings';
import { motion, useAnimation } from 'framer-motion';

export default function Topbar({ topbarRef }) {
	const [schedules] = useState(['Personal', 'Academic', 'Work']);
	const [currentSchedule, setCurrentSchedule] = useState(schedules[0]);
	const [dropdownActive, setDropdownActive] = useState(false);
	const [isSettingsActive, setSettingsActive] = useState(false);
	const router = useRouter();
	const [topbarHeight, setTopbarHeight] = useState(0);
	const controls = useAnimation();

	const handleScheduleClick = (schedule) => {
		setCurrentSchedule(schedule);
		setDropdownActive(false);
	};

	useEffect(() => {
		if (topbarRef.current) {
			setTopbarHeight(topbarRef.current.offsetHeight);
		}
	}, [topbarHeight, isSettingsActive]);

	useEffect(() => {
		if (isSettingsActive) {
			controls.start({
				rotate: 360,
				transition: {
					duration: 3,
					ease: 'linear',
					repeat: Infinity,
				},
			});
		} else {
			controls.start({
				rotate: 0,
				transition: {
					duration: 0.5,
					ease: 'easeInOut',
				},
			});
		}
	}, [isSettingsActive, controls]);

	return (
		<>
			<div
				id='topbar'
				ref={topbarRef}
				className='z-50 flex drop-shadow-md bg-zinc-900 w-full'>
				<div className='w-full group justify-between px-4 md:px-8 flex'>
					<div className='relative flex flex-col justify-center translate-y-[0.15rem] py-2 lg:-space-y-1'>
						<h2 className='hidden lg:block text-[8px] subtext'>
							{router.pathname.toUpperCase().split('/')[1]}
						</h2>
						<div
							onClick={() => setDropdownActive(!dropdownActive)}
							className='flex items-center space-x-2 cursor-pointer'>
							<h2 className='text-[18px] header'>{currentSchedule}</h2>
							<BiSolidDownArrow
								fill='white'
								size={8}
								className={`relative  ${
									dropdownActive ? 'rotate-0' : 'rotate-180'
								} transition-all duration-300`}
							/>
						</div>
						{dropdownActive && (
							<div className='flex flex-col absolute translate-y-12 bg-zinc-300 z-50 rounded-md outline outline-zinc-800'>
								{schedules.map((schedule, i) => (
									<span
										key={i}
										className={`${
											currentSchedule == schedule
												? 'bg-zinc-200 text-zinc-800 outline rounded-sm hover:cursor-default'
												: 'bg-zinc-800/50 hover:bg-zinc-800 text-zinc-200 hover:cursor-pointer'
										} text-[16px] header w-full text-center px-2 select-none`}
										onClick={() => {
											if (schedule != currentSchedule) {
												handleScheduleClick(schedule);
											}
										}}>
										{schedule}
									</span>
								))}
							</div>
						)}
					</div>
					<div className='flex items-center space-x-4'>
						<div className='flex flex-col justify-center items-center space-y-2 cursor-pointer w-fit'>
							<FaSquarePlus
								className='text-zinc-200'
								size='18'
							/>
						</div>
						<div className='text-zinc-200 -translate-y-[0.15rem] opacity-10 cursor-default'>|</div>
						<div
							className='group space-y-[0.15rem] flex flex-col justify-center items-center hover:cursor-pointer hover:bg-opacity-50 w-fit'
							onClick={() => setSettingsActive(!isSettingsActive)}>
							<motion.div
								animate={controls}
								initial={{ rotate: 0 }}>
								<IoSettingsSharp
									fill='white'
									size='18'
								/>
							</motion.div>
							{/* <h3 className='hidden lg:block text-zinc-200 text-[10px]'>Settings</h3> */}
						</div>
					</div>
				</div>
			</div>
			<Settings
				isSettingsVisible={isSettingsActive}
				setSettingsVisible={setSettingsActive}
				topbarHeight={topbarHeight}
			/>
		</>
	);
}
