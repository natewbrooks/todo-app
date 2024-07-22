import React from 'react';
import Toggle from '../../Widgets/Toggle';

export default function SettingsOption({ optionName, defaultValue }) {
	return (
		<div className='w-full flex space-x-2 rounded-md items-center justify-center'>
			<Toggle defaultValue={defaultValue} />
			<span
				className={`header text-zinc-300 text-[12px] text-start bg-zinc-700/40 px-4 py-1 w-full rounded-full overflow-hidden whitespace-nowrap`}>
				{optionName}
			</span>
		</div>
	);
}
