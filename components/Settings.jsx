import React from 'react';
import UserLogin from './UserLogin/UserLogin';
import SettingsOption from './SettingsOption';
import { FaXmark } from 'react-icons/fa6';

export default function Settings({ isSettingsVisible, setSettingsVisible }) {
	return (
		<section className={``}>
			<div
				className={`hidden lg:flex transition-all duration-500 ease-in-out z-10 drop-shadow-md ${
					isSettingsVisible ? ' border-r-2' : 'translate-x-[100%] border-x-0'
				} absolute border-zinc-900 flex-col right-0 items-center bg-zinc-800 h-full py-5`}>
				<div className=' w-[20rem] h-full flex flex-col space-y-4 text-center'>
					<div className='flex flex-col space-y-2 items-center w-full'>
						<h2>Settings</h2>
						<div className='line mb-4 rounded-sm border-zinc-700 border-t-2 w-[60%]'></div>
					</div>

					<div className='w-full items-start flex flex-col space-y-4 max-h-[83%] overflow-y-auto pb-4 px-5'>
						{/* FIX ALL THIS SO EACH CATEGORY IS DYNAMICALLY MADE */}
						<div className='flex flex-col space-y-2 w-full text-start'>
							<span className='subtext text-[8px] text-zinc-400'>UTILITY</span>
							<SettingsOption
								optionName={'Use Category Colors'}
								defaultValue={false}
							/>
							<SettingsOption
								optionName={'Sort Blueprints by Category'}
								defaultValue={true}
							/>
							<SettingsOption
								optionName={'Default Calendar Layout'}
								defaultValue={true}
							/>
							<SettingsOption
								optionName={'Default TODO Layout'}
								defaultValue={true}
							/>
							<SettingsOption
								optionName={'Tasks Collapsed by Default'}
								defaultValue={true}
							/>
						</div>
						<div className='flex flex-col space-y-2 w-full text-start'>
							<span className='subtext text-[8px] text-zinc-400'>NOTIFICATIONS</span>
							<SettingsOption
								optionName={'Recieve Task Due Reminders'}
								defaultValue={true}
							/>
							<SettingsOption
								optionName={'Recieve Reminders... [1 day before, etc.]'}
								defaultValue={true}
							/>
						</div>
						<div className='flex flex-col space-y-2 w-full text-start'>
							<span className='subtext text-[8px] text-zinc-400'>APPEARANCE</span>
							<SettingsOption
								optionName={'Dark Mode'}
								defaultValue={true}
							/>
							<SettingsOption
								optionName={'Navigation Position'}
								defaultValue={true}
							/>
						</div>
						<div className='flex flex-col space-y-2 w-full text-start'>
							<span className='subtext text-[8px] text-zinc-400'>MAINTENANCE</span>
							<SettingsOption
								optionName={'Delete a Schedule'}
								defaultValue={false}
							/>
							<SettingsOption
								optionName={'Delete a Blueprint'}
								defaultValue={false}
							/>
							<SettingsOption
								optionName={'Reset Account'}
								defaultValue={false}
							/>
						</div>
					</div>
				</div>
				<div className='absolute w-full bottom-0'>
					<UserLogin />
				</div>
			</div>
			{/* MOBILE LAYOUT */}
			<div
				className={`${
					isSettingsVisible ? 'opacity-100 z-50' : 'opacity-0 -z-10'
				} lg:hidden transition-all duration-300 absolute top-[2.65rem] border-zinc-900 flex flex-col items-center bg-zinc-800 h-[91%] w-full py-5`}>
				<div className='relative w-[20rem] h-full flex flex-col space-y-4 text-center'>
					<div className='flex flex-col space-y-2 items-center w-full'>
						<h2>Settings</h2>
						<div className='line mb-4 rounded-sm border-zinc-700 border-t-2 w-[60%]'></div>
					</div>
					{/* <button
						onClick={() => {
							setSettingsVisible(false);
						}}
						className='absolute -top-2 right-4 flex bg-zinc-800 group'>
						<div>
							<FaXmark
								size={14}
								className='group-hover:text-zinc-700 text-zinc-200'
							/>
						</div>
					</button> */}

					<div className='w-full items-start flex flex-col space-y-4 max-h-[83%] overflow-y-auto pb-8 lg:pb-4 px-5'>
						{/* FIX ALL THIS SO EACH CATEGORY IS DYNAMICALLY MADE */}
						<div className='flex flex-col space-y-2 w-full text-start'>
							<span className='subtext text-[8px] text-zinc-400'>UTILITY</span>
							<SettingsOption
								optionName={'Use Category Colors'}
								defaultValue={false}
							/>
							<SettingsOption
								optionName={'Sort Blueprints by Category'}
								defaultValue={true}
							/>
							<SettingsOption
								optionName={'Default Calendar Layout'}
								defaultValue={true}
							/>
							<SettingsOption
								optionName={'Default TODO Layout'}
								defaultValue={true}
							/>
							<SettingsOption
								optionName={'Tasks Collapsed by Default'}
								defaultValue={true}
							/>
						</div>
						<div className='flex flex-col space-y-2 w-full text-start'>
							<span className='subtext text-[8px] text-zinc-400'>NOTIFICATIONS</span>
							<SettingsOption
								optionName={'Recieve Task Due Reminders'}
								defaultValue={true}
							/>
							<SettingsOption
								optionName={'Recieve Reminders... [1 day before, etc.]'}
								defaultValue={true}
							/>
						</div>
						<div className='flex flex-col space-y-2 w-full text-start'>
							<span className='subtext text-[8px] text-zinc-400'>APPEARANCE</span>
							<SettingsOption
								optionName={'Dark Mode'}
								defaultValue={true}
							/>
							<SettingsOption
								optionName={'Navigation Position'}
								defaultValue={true}
							/>
						</div>
						<div className='flex flex-col space-y-2 w-full text-start'>
							<span className='subtext text-[8px] text-zinc-400'>MAINTENANCE</span>
							<SettingsOption
								optionName={'Delete a Schedule'}
								defaultValue={false}
							/>
							<SettingsOption
								optionName={'Delete a Blueprint'}
								defaultValue={false}
							/>
							<SettingsOption
								optionName={'Reset Account'}
								defaultValue={false}
							/>
						</div>
					</div>
				</div>
				<div className='absolute w-full bottom-0'>
					<UserLogin />
				</div>
			</div>
		</section>
	);
}
