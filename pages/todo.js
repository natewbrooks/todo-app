import React, { useState, useEffect } from 'react';
import TodoCategory from '../components/Todo/TodoCategory';
import SelectActionModal from '../components/SelectActionModal';
import Checkbox from '@/components/Widgets/Checkbox';
import { BiSolidDownArrow } from 'react-icons/bi';

export default function Todo() {
	const [completeShown, setComplete] = useState(false);
	const [taskModalActive, setTaskModalActive] = useState(false);
	const [categorySort, setCategorySort] = useState('taskCount'); // 'taskCount' or 'alphabetical'
	const [taskSort, setTaskSort] = useState('priorityDate'); // 'priorityDate' or 'alphabetical' or 'priorityAlphabetical'  or 'priority' or 'dueDate'
	const [pinnedCategories, setPinnedCategories] = useState([]);
	const [sortedCategories, setSortedCategories] = useState([]);
	const [filterMethod, setFilterMethod] = useState('week'); // 'week', 'month' or 'all'
	const [dropdownActive, setDropdownActive] = useState(false);

	const exampleCategories = [
		{
			name: 'MATH 265',
			bgColor: 'bg-red-300',
			outlineColor: 'border-red-300',
			tasks: [
				{
					name: 'Vector Calculus Homework',
					assignDate: '08/01/24',
					dueDate: '08/15/24',
					dueTime: '11:00 AM',
					completedDate: null,
					priority: 2,
					description: 'Complete all assigned problems from the textbook for sections 2.1 and 2.2.',
					subtasks: [
						{ name: 'Complete section 2.1', completed: true },
						{ name: 'Complete section 2.2', completed: false },
					],
				},
				{
					name: 'Prepare for upcoming exam',
					assignDate: '08/10/24',
					dueDate: '08/20/24',
					dueTime: '9:00 AM',
					completedDate: null,
					priority: 2,
					description:
						'Review all topics covered in the course so far, with a focus on vector fields.',
					subtasks: [],
				},
				{
					name: 'Group Study Session',
					assignDate: '08/12/24',
					dueDate: '08/19/24',
					dueTime: '2:00 PM',
					completedDate: null,
					priority: 1,
					description: 'Organize a session with classmates to discuss difficult topics.',
					subtasks: [
						{ name: 'Arrange meeting room', completed: false },
						{ name: 'Prepare study materials', completed: false },
					],
				},
			],
		},
		{
			name: 'COSC 418',
			bgColor: 'bg-purple-300',
			outlineColor: 'border-purple-300',
			tasks: [
				{
					name: 'Research paper on AI Ethics',
					assignDate: '08/05/24',
					dueDate: '09/01/24',
					dueTime: '5:00 PM',
					completedDate: null,
					priority: 0,
					description:
						'Write a comprehensive paper on the ethical implications of AI in decision making.',
					subtasks: [
						{ name: 'Draft introduction', completed: false },
						{ name: 'Compile bibliography', completed: false },
						{ name: 'Conduct interviews', completed: false },
						{ name: 'Write conclusion', completed: false },
					],
				},
				{
					name: 'Presentation on AI in Healthcare',
					assignDate: '08/15/24',
					dueDate: '09/05/24',
					dueTime: '1:30 PM',
					completedDate: null,
					priority: 3,
					description: 'Prepare a 20-minute presentation on how AI is transforming healthcare.',
					subtasks: [],
				},
			],
		},
		{
			name: 'CIS 377',
			bgColor: 'bg-orange-300',
			outlineColor: 'border-orange-300',
			tasks: [
				{
					name: 'Network Security Project Phase 1',
					assignDate: '08/12/24',
					dueDate: '08/25/24',
					dueTime: '10:00 AM',
					completedDate: null,
					priority: 3,
					description: 'Set up a secure network environment using VPNs and firewalls.',
					subtasks: [
						{ name: 'Set up VPN', completed: true },
						{ name: 'Test firewall configurations', completed: false },
					],
				},
				{
					name: 'Seminar on Cybersecurity Threats',
					assignDate: '08/20/24',
					dueDate: '08/27/24',
					dueTime: '3:00 PM',
					completedDate: null,
					priority: 2,
					description: '',
					subtasks: [
						{ name: 'Prepare slides', completed: false },
						{ name: 'Practice speech', completed: false },
					],
				},
			],
		},
		{
			name: 'POSC 107',
			bgColor: 'bg-yellow-300',
			outlineColor: 'border-yellow-300',
			tasks: [
				{
					name: 'Debate preparation on Climate Policies',
					assignDate: '07/22/24',
					dueDate: '08/05/24',
					dueTime: '12:00 PM',
					completedDate: null,
					priority: 3,
					description:
						'Gather information and form arguments for the upcoming debate on global climate policies.',
					subtasks: [],
				},
				{
					name: 'George Washington address',
					assignDate: '07/21/24',
					dueDate: '07/20/24',
					dueTime: '12:00 PM',
					completedDate: null,
					priority: 3,
					description: '',
					subtasks: [],
				},
				{
					name: 'Read assigned articles',
					assignDate: '07/25/24',
					dueDate: '08/02/24',
					dueTime: '4:30 PM',
					completedDate: null,
					priority: 1,
					description: 'Read and summarize the provided articles on political theories.',
					subtasks: [
						{ name: 'Article by Smith et al.', completed: true },
						{ name: 'Article by Doe et al.', completed: false },
					],
				},
			],
		},
		{
			name: 'COSC 290',
			bgColor: 'bg-slate-300',
			outlineColor: 'border-slate-300',
			tasks: [
				{
					name: 'Final Project Submission',
					assignDate: '08/01/24',
					dueDate: '08/30/24',
					dueTime: '11:59 PM',
					completedDate: null,
					priority: 3,
					description: 'Ensure all components of the final project are completed and integrated.',
					subtasks: [
						{ name: 'Complete coding phase', completed: false },
						{ name: 'Write project documentation', completed: false },
						{ name: 'Create presentation slides', completed: false },
					],
				},
			],
		},
	];

	useEffect(() => {
		sortCategories();
	}, [categorySort, pinnedCategories]);

	const sortCategories = () => {
		let sorted = [...exampleCategories];

		switch (categorySort) {
			case 'taskCount':
				sorted.sort((a, b) => b.tasks.length - a.tasks.length);
				break;
			case 'alphabetical':
				sorted.sort((a, b) => a.name.localeCompare(b.name));
				break;
		}

		// Prioritize pinned categories
		sorted = [
			...sorted.filter((cat) => pinnedCategories.includes(cat.name)),
			...sorted.filter((cat) => !pinnedCategories.includes(cat.name)),
		];

		setSortedCategories(sorted);
	};

	const togglePinCategory = (categoryName) => {
		setPinnedCategories((prev) =>
			prev.includes(categoryName)
				? prev.filter((name) => name !== categoryName)
				: [...prev, categoryName]
		);
	};

	const handleFilterSelection = (method) => {
		setFilterMethod(method);
		setDropdownActive(false);
	};

	const getFilterLabel = () => {
		switch (filterMethod) {
			case 'week':
				return 'This Week';
			case 'month':
				return 'This Month';
			case 'all':
				return 'All';
			default:
				return 'Filter';
		}
	};

	return (
		<section className='relative w-full h-full flex flex-col'>
			<div
				className={`${
					taskModalActive ? 'blur' : ''
				} w-full h-full flex flex-col items-center overflow-auto px-0 lg:px-20`}>
				<div className='flex flex-col w-full max-w-[80%] lg:max-w-[40%] space-x-2 items-center'>
					<div className='flex space-x-1 py-2 translate-y-1 items-center w-full'>
						<div className='rounded-sm bg-zinc-700 h-[1px] w-full'></div>
						<div
							className={`flex px-4 space-x-2 items-center cursor-pointer`}
							onClick={() => setDropdownActive(!dropdownActive)}>
							<h2 className='text-zinc-800 header text-[20px] whitespace-nowrap'>
								{getFilterLabel()}
							</h2>
							<BiSolidDownArrow
								fill='black'
								size={8}
								className={`transition-transform duration-300 ${
									!dropdownActive ? 'rotate-180' : 'rotate-0'
								}`}
							/>
						</div>
						<div className='rounded-sm bg-zinc-700 h-[1px] w-full'></div>
					</div>
					{dropdownActive && (
						<div className='absolute top-full mt-1 bg-white shadow-lg rounded-md z-10'>
							<div
								className='p-2'
								onClick={() => handleFilterSelection('week')}>
								This Week
							</div>
							<div
								className='p-2'
								onClick={() => handleFilterSelection('month')}>
								This Month
							</div>
							<div
								className='p-2'
								onClick={() => handleFilterSelection('all')}>
								All
							</div>
						</div>
					)}
				</div>

				<div className={`w-full h-full flex flex-col -space-y-4 xl:max-w-[80%]`}>
					{sortedCategories.map((category, idx) => (
						<TodoCategory
							key={idx}
							name={category.name}
							tasks={category.tasks}
							bgColor={category.bgColor}
							outlineColor={category.outlineColor}
							pin={() => togglePinCategory(category.name)}
							isPinned={pinnedCategories.includes(category.name)}
							taskSort={taskSort}
						/>
					))}
				</div>
			</div>
			{taskModalActive && <SelectActionModal selectModalActive={setTaskModalActive} />}
		</section>
	);
}
