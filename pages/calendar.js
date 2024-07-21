import { React, useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import Calendar from '../components/Calendar/Calendar';

export default function Schedule() {
	const [schedules] = useState(['Personal', 'Academic', 'Work']);
	const [currentSchedule, setCurrentSchedule] = useState(schedules[0]);
	const [dropdownActive, setDropdownActive] = useState(false);

	const handleScheduleClick = (schedule) => {
		setCurrentSchedule(schedule);
		setDropdownActive(false);
	};

	return (
		<section className='relative flex flex-col w-full h-full items-center'>
			<div className='w-full h-full flex items-center justify-center lg:px-10'>
				<Calendar />
			</div>
		</section>
	);
}
