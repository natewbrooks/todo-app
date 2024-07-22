import React, { useState, useEffect } from 'react';
import { BiSolidDownArrow, BiSolidStar } from 'react-icons/bi';
import TodoCategory from '../components/Todo/TodoCategory';
import SelectActionModal from '../components/UI/SelectActionModal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Notes() {
	const [completeShown, setComplete] = useState(false);
	const [taskModalActive, setTaskModalActive] = useState(false);
	const [schedules] = useState(['Combined', 'Personal', 'Academic', 'Work']);
	const [currentSchedule, setCurrentSchedule] = useState(schedules[0]);
	const [dropdownActive, setDropdownActive] = useState(false);
	const [notes, setNotes] = useState([
		{
			title: 'edgar',
			description:
				'# Singing songs in the moonlight\n- Bullet point 1\n- Bullet point 2\n![Alt text](https://via.placeholder.com/150)',
			archived: false,
		},
	]);
	const [archivedNotes, setArchivedNotes] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const handleScheduleClick = (schedule) => {
		setCurrentSchedule(schedule);
		setDropdownActive(false);
	};

	const addNote = (title, description) => {
		setNotes([...notes, { title, description, archived: false }]);
	};

	const archiveNote = (index) => {
		const newNotes = [...notes];
		newNotes[index].archived = true;
		setNotes(newNotes);
		setArchivedNotes([...archivedNotes, newNotes[index]]);
	};

	const toggleArchiveView = () => {
		setComplete(!completeShown);
	};

	const handleSearch = (term) => {
		setSearchTerm(term);
		const results = notes.filter(
			(note) => note.title.includes(term) || note.description.includes(term)
		);
		setSearchResults(results);
	};

	useEffect(() => {
		handleSearch(searchTerm);
	}, [notes, searchTerm]);

	return (
		<section className='relative w-full h-full flex flex-col'>
			<div
				className={`${
					taskModalActive ? 'blur' : 'blur-none'
				} w-full h-full flex flex-col overflow-auto px-0 lg:px-20 pb-4 transition-all duration-300`}>
				<div className='flex justify-between items-center p-4'>
					<input
						type='text'
						placeholder='Search...'
						value={searchTerm}
						onChange={(e) => handleSearch(e.target.value)}
						className='border p-2 rounded'
					/>
					<button
						onClick={toggleArchiveView}
						className='border p-2 rounded'>
						{completeShown ? 'Hide' : 'Show'} Archived Notes
					</button>
				</div>
				<div className='p-4'>
					{(completeShown ? archivedNotes : searchResults).map((note, index) => (
						<div
							key={index}
							className='border p-4 rounded mb-4'>
							<h3>{note.title}</h3>
							<ReactMarkdown
								remarkPlugins={[remarkGfm]}
								components={{
									img: ({ node, ...props }) => (
										<img
											style={{ maxWidth: '100%' }}
											{...props}
										/>
									),
									video: ({ node, ...props }) => (
										<video
											controls
											style={{ maxWidth: '100%' }}>
											<source {...props} />
											Your browser does not support the video tag.
										</video>
									),
									iframe: ({ node, ...props }) => (
										<iframe
											style={{ maxWidth: '100%' }}
											{...props}
										/>
									),
								}}>
								{note.description}
							</ReactMarkdown>
							{!note.archived && (
								<button
									onClick={() => archiveNote(index)}
									className='border p-2 rounded mt-2'>
									Archive
								</button>
							)}
						</div>
					))}
				</div>
			</div>
			{taskModalActive && <SelectActionModal selectModalActive={setTaskModalActive} />}
		</section>
	);
}
