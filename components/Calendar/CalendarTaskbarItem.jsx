import React from 'react';
import COLORS from '../../constants/colors';

export default function CalendarTaskbarItem({ color, itemName }) {
	let myColor = COLORS.green[300];
	if (COLORS[color] != null) {
		myColor = COLORS[color][300];
	}

	return (
		<div
			className={`px-3 py-[0.15rem] text-black flex flex-col rounded-xl merri text-center justify-center items-center text-[10px] drop-shadow-sm select-none hover:cursor-pointer hover:scale-105 transition-all duration-300 active:scale-100 active:duration-100`}
			style={{ backgroundColor: myColor }}>
			{itemName}
		</div>
	);
}
