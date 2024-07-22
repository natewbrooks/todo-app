import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa';

const SearchInput = () => {
	return (
		<div className='w-fit flex'>
			<div className='relative flex items-center'>
				<FaMagnifyingGlass className='absolute left-2 text-zinc-800' />
				<input
					className='bg-zinc-200 text-zinc-800 rounded-md pl-8 pr-2 py-1 overflow-hidden'
					type='text'
					placeholder='Search...'
				/>
			</div>
		</div>
	);
};

export default SearchInput;
