import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import UserLogin from '../UserLogin/UserLogin';
import SettingsOption from './SettingsOption';
import SettingsCategory from './SettingsCategory';
import { FaXmark } from 'react-icons/fa6';

export default function Settings({ isSettingsVisible, setSettingsVisible, topbarHeight }) {
	const jitterEffect = {
		x: {
			type: 'tween',
			duration: 0.5,
		},
	};

	const categories = [
		{
			categoryName: 'Utility',
			settings: [
				{ name: 'Use Category Colors', defaultValue: false },
				{ name: 'Sort Blueprints by Category', defaultValue: true },
				{ name: 'Default Calendar Layout', defaultValue: true },
				{ name: 'Default TODO Layout', defaultValue: true },
				{ name: 'Tasks Collapsed by Default', defaultValue: true },
			],
		},
		{
			categoryName: 'Notifications',
			settings: [
				{ name: 'Recieve Task Due Reminders', defaultValue: true },
				{ name: 'Recieve Reminders... [1 day before, etc.]', defaultValue: true },
			],
		},
		{
			categoryName: 'Appearance',
			settings: [
				{ name: 'Dark Mode', defaultValue: true },
				{ name: 'Navigation Position', defaultValue: true },
			],
		},
		{
			categoryName: 'Maintenance',
			settings: [
				{ name: 'Delete a Schedule', defaultValue: false },
				{ name: 'Delete a Blueprint', defaultValue: false },
				{ name: 'Reset Account', defaultValue: false },
			],
		},
		{
			categoryName: 'Blueprint/Non-Blueprint Selection',
			settings: [
				{ name: 'Select Blueprint', defaultValue: false },
				{ name: 'Default selection', defaultValue: 'Non-Blueprint' },
			],
		},
		{
			categoryName: 'Popup UI Enhancements',
			settings: [
				{ name: 'Increase popup UI size', defaultValue: true },
				{ name: 'Smooth subtask animations', defaultValue: true },
				{ name: 'Add notes option', defaultValue: true },
				{ name: 'Remove background scrolling', defaultValue: true },
				{ name: 'Floating plus button', defaultValue: true },
				{ name: 'Enter key submits forms', defaultValue: true },
				{ name: 'Task added confirmation', defaultValue: true },
			],
		},
		{
			categoryName: 'Schedule Task UI Improvements',
			settings: [
				{ name: 'Simplify Schedule Task UI', defaultValue: true },
				{ name: "Hide previous months' days", defaultValue: true },
				{ name: 'Display formal date', defaultValue: true },
				{ name: 'Include NO DEADLINE option', defaultValue: true },
				{ name: 'Hide CALENDAR PERSONAL', defaultValue: true },
				{ name: 'Show current year on erase', defaultValue: true },
				{ name: 'Make year field editable', defaultValue: true },
			],
		},
		{
			categoryName: 'To-Do Page Enhancements',
			settings: [
				{ name: 'Add sorting methods', defaultValue: true },
				{ name: 'Display categories sorted alphabetically', defaultValue: true },
				{ name: 'Darker and contrasting category backgrounds', defaultValue: true },
				{ name: 'Sort tasks by priority', defaultValue: true },
				{ name: 'Include NO DEADLINE category', defaultValue: true },
				{ name: 'Hide completed tasks', defaultValue: true },
				{ name: 'Change due date color based on proximity', defaultValue: true },
				{ name: 'Remove INCOMPLETE/COMPLETE labels', defaultValue: true },
				{ name: 'Double-tap to complete task', defaultValue: true },
				{ name: 'Add ONE-TIME and REPEATING options', defaultValue: true },
				{ name: 'Show task priority with vibrancy of yellow', defaultValue: true },
				{ name: 'Add edit button', defaultValue: true },
			],
		},
		{
			categoryName: 'Notes Page',
			settings: [
				{ name: 'Persistent notes page', defaultValue: true },
				{ name: 'Archive button', defaultValue: true },
				{ name: 'Search bar for notes', defaultValue: true },
				{ name: 'Notes can be images/gifs', defaultValue: true },
				{ name: 'Support for multi-line and Markdown', defaultValue: true },
			],
		},
	];

	return (
		<section>
			<AnimatePresence>
				{isSettingsVisible && (
					<motion.div
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '110%' }}
						transition={jitterEffect}
						className='z-30 absolute bottom-0 border-zinc-900 flex flex-col lg:w-[20rem] lg:right-0 items-center bg-zinc-800 w-full'
						style={{ height: `calc(100% - ${topbarHeight}px)` }}>
						<div className='relative w-full justify-between h-full flex flex-col text-center overflow-hidden mt-4 lg:mt-6'>
							<div className='flex flex-col space-y-2 items-center w-full'>
								<h2>Settings</h2>
								<div className='line mb-1 rounded-sm border-zinc-700 border-t-2 w-[60%]'></div>
							</div>
							<div className='w-full h-full items-start flex flex-col space-y-4 overflow-y-auto p-4'>
								{categories.map((category, index) => (
									<SettingsCategory
										key={index}
										categoryName={category.categoryName}
										settings={category.settings}
									/>
								))}
							</div>
						</div>
						<UserLogin />
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
