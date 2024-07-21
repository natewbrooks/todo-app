import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaListUl, FaPlus, FaStickyNote } from 'react-icons/fa';
import { FaCalendarDays, FaSquarePlus } from 'react-icons/fa6';
import { IoSettingsSharp } from 'react-icons/io5';
import Settings from './Settings';
import { useState } from 'react';
import NavbarLink from './NavbarLink';

export default function Navbar({ navRef, isMobileViewport }) {
	const [isSettingsActive, setSettingsActive] = useState(false);

	return (
		<>
			<nav
				id='navbar'
				ref={navRef}
				className='z-40 flex lg:flex-col justify-around items-center drop-shadow-md bg-zinc-900 w-screen h-fit lg:w-fit lg:h-screen'>
				<ul className='flex xs:flex-row lg:flex-col lg:space-x-0 lg:space-y-20 items-center justify-around w-full h-fit 	'>
					<NavbarLink
						href='/todo'
						Icon={FaListUl}
						label='Todo'
						onClick={() => setSettingsActive(false)}
					/>
					<NavbarLink
						href='/calendar'
						Icon={FaCalendarDays}
						label='Calendar'
						onClick={() => setSettingsActive(false)}
					/>
					<NavbarLink
						href='/notes'
						Icon={FaStickyNote}
						label='Notes'
						onClick={() => setSettingsActive(false)}
					/>
				</ul>
			</nav>
		</>
	);
}
{
}
