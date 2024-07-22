import { React, useState } from 'react';
import Checkbox from '../Widgets/Checkbox';

function TodoSubtask({ name, completed, toggleSubtask }) {
	const [checked, setChecked] = useState(completed);

	return (
		<div className='flex items-center space-x-2 mt-1'>
			<Checkbox
				size={6}
				checked={completed}
				clickHandler={() => {
					setChecked(!checked);
					toggleSubtask();
				}}
			/>
			<span className={`text-[10px] subtext ${checked ? 'line-through' : ''}`}>{name}</span>
		</div>
	);
}

export default TodoSubtask;
