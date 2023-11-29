import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaListUl } from 'react-icons/fa';
import { FaCalendarDays } from 'react-icons/fa6';
import { IoSettingsSharp } from 'react-icons/io5';
import Settings from './Settings';
import { useState } from 'react';

export default function Navbar({ navRef, isMobileViewport }) {
	const [isSettingsActive, setSettingsActive] = useState(false);
	const router = useRouter();
	return (
		<>
			<nav
				id='navbar'
				ref={navRef}
				className='z-50 flex justify-center items-center drop-shadow-md bg-zinc-900 w-screen h-fit lg:w-fit lg:h-screen'>
				<ul className='flex xs:flex-row lg:flex-col space-x-10 lg:space-x-0 lg:space-y-20 items-center justify-center'>
					<Link href='/todo'>
						<div
							className={`${
								router.pathname == '/todo' ? 'bg-zinc-800 bg-opacity-40' : ''
							} flex flex-col justify-center items-center space-y-2 hover:cursor-pointer hover:bg-zinc-800 hover:bg-opacity-50 w-[3.5rem] p-4`}
							onClick={() => setSettingsActive(false)}>
							<FaListUl
								className={`text-zinc-200`}
								size='24'
							/>
							<h3 className={`hidden lg:block text-zinc-200 text-[10px] xs:hidden lg:visible`}>
								Todo
							</h3>
						</div>
					</Link>
					<Link href='/calendar'>
						<div
							className={`${
								router.pathname == '/calendar' ? 'bg-zinc-800  bg-opacity-40' : ''
							} flex flex-col justify-center items-center space-y-2 hover:cursor-pointer hover:bg-zinc-800 hover:bg-opacity-50 w-[3.5rem] p-4`}
							onClick={() => setSettingsActive(false)}>
							<FaCalendarDays
								className={`text-zinc-200`}
								size='24'
							/>
							<h3 className={`hidden lg:block text-zinc-200 text-[10px]`}>Calendar</h3>
						</div>
					</Link>
					<div
						className={`group flex flex-col justify-center items-center space-y-2 hover:cursor-pointer hover:bg-zinc-800 hover:bg-opacity-50 w-[3.5rem] p-4`}
						onClick={() => setSettingsActive(!isSettingsActive)}>
						<IoSettingsSharp
							fill='white'
							size='24'
							className={`duration-75 ${isSettingsActive ? 'animate-spin-slow' : ''}`}
						/>
						<h3 className='hidden lg:block text-zinc-200 text-[10px]'>Settings</h3>
					</div>
				</ul>
			</nav>
			<Settings
				isSettingsVisible={isSettingsActive}
				setSettingsVisible={setSettingsActive}
			/>
		</>
	);
}
{
}
