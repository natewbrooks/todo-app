import React from 'react';
import SettingsOption from './SettingsOption';

const SettingsCategory = ({ categoryName, settings }) => {
	return (
		<div className='flex flex-col space-y-2 w-full h-full text-start'>
			<span className='subtext text-[8px] text-zinc-400'>{categoryName.toUpperCase()}</span>
			{settings.map((setting, index) => (
				<SettingsOption
					key={index}
					optionName={setting.name}
					defaultValue={setting.defaultValue}
				/>
			))}
		</div>
	);
};

export default SettingsCategory;
