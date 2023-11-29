import React, { useState, useEffect } from 'react';
import { motion, usePresence, AnimatePresence } from 'framer-motion';
import { FaXmark } from 'react-icons/fa6';
import ProfilePicture from './ProfilePicture';

export default function UserLogin({}) {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [loginClicked, setLoginClicked] = useState(false);
	const [signupClicked, setSignupClicked] = useState(false);

	const [loginError, setLoginError] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleInputType = (type) => {
		switch (type) {
			case 'login':
				setLoginClicked(!loginClicked);
				setSignupClicked(false);
				break;
			case 'signup':
				setSignupClicked(!signupClicked);
				setLoginClicked(false);
				break;
			case 'none':
				setSignupClicked(false);
				setLoginClicked(false);
				break;
			default:
				console.warn('Unknown input type:', type);
		}
	};

	const handleLoginSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch('/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});

			if (response.ok) {
				console.log('success');
				setLoginError(false);
			} else {
				setLoginError('There is no matching account in our database.');
				console.log(username, ', ', password);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	useEffect(() => {
		if (!loginClicked && !signupClicked) {
			setLoginError(null);
		}
	}, [loginClicked, signupClicked]);

	const formVariants = {
		hidden: { opacity: 0, height: 0 },
		visible: {
			opacity: 1,
			height: 'auto',
			transition: { opacity: { delay: 0.3, duration: 0.4 }, height: { duration: 0.4 } },
		},
		exit: {
			opacity: 0,
			height: 0,
			transition: { opacity: { duration: 0.1 }, height: { duration: 0.5 } },
		},
	};

	return (
		<div className='w-full flex flex-col'>
			{(loginClicked || signupClicked) && (
				<div className='w-full flex flex-row text-[0.6rem] justify-between subtext text-zinc-200  bg-zinc-900 overflow-hidden'>
					<div className='flex text-zinc-400'>
						<button
							onClick={() => handleInputType('login')}
							className={`bg-zinc-900 border-t-2 ${
								loginClicked
									? 'text-white border-white'
									: 'border-transparent hover:border-zinc-700 '
							} px-2 py-1`}>
							Login
						</button>
						<button
							onClick={() => handleInputType('signup')}
							className={`bg-zinc-900 border-t-2 ${
								signupClicked
									? 'text-white border-white'
									: 'border-transparent hover:border-zinc-700 '
							} px-2 py-1`}>
							Create Account
						</button>
					</div>
					<button
						onClick={() => handleInputType('none')}
						className={`bg-zinc-900 focus:outline-none hover:scale:110 px-2 py-1`}>
						<FaXmark size={12} />
					</button>
				</div>
			)}
			<motion.div
				className={`bg-zinc-900 p-[0.35rem] w-[100%] flex flex-row justify-center text-zinc-200 items-center`}
				initial={{ height: 'auto' }}
				animate={{ height: loginClicked || signupClicked ? 'auto' : 'auto' }}>
				{isLoggedIn && (
					<div className='justify-between items-center w-full outline-offset-[4px] my-1 outline-zinc-800/50 rounded-md outline flex flex-row space-x-2 px-2'>
						<ProfilePicture size={1.25} />
						<span className='text-zinc-400 text-[0.65rem]'>Username</span>
					</div>
				)}
				{!isLoggedIn && (
					<div
						className={`${
							loginClicked || signupClicked ? 'flex justify-center' : ''
						} w-[95%] lg:w-full lg:outline-offset-[2px] py-1 my-1 outline-zinc-800/50 rounded-md outline`}>
						{!loginClicked && !signupClicked && (
							<div className='w-full flex flex-row items-center justify-between px-2'>
								<ProfilePicture size={1.25} />
								<div className='flex flex-row space-x-2 subtext text-[0.65rem] text-zinc-400'>
									<button
										onClick={() => handleInputType('login')}
										className='hover:underline hover:underline-offset-2 active:no-underline active:text-zinc-500 hover:text-zinc-200'>
										Login
									</button>
									<h3>/</h3>
									<button
										onClick={() => handleInputType('signup')}
										className='hover:underline hover:underline-offset-2 active:no-underline active:text-zinc-500 hover:text-zinc-200'>
										Create Account
									</button>
								</div>
							</div>
						)}
						<AnimatePresence>
							{loginClicked && (
								<motion.form
									initial='hidden'
									animate='visible'
									exit='exit'
									variants={formVariants}
									onSubmit={handleLoginSubmit}
									className='w-full flex flex-col space-y-4 items-center'>
									{/* Login Form Fields */}
									<div className='flex flex-col space-y-2'>
										<div className='flex flex-col w-full items-start text-zinc-200'>
											<h3 className='opacity-100 text-[10px] header'>
												<span className='text-red-400'>*</span> Username
											</h3>
											<div className='flex items-center justify-center w-full'>
												<input
													name='username'
													onChange={(e) => setUsername(e.target.value)}
													className=' text-center w-full px-2 select-none focus:outline-none bg-zinc-800 rounded-md hover:bg-zinc-700 hover:cursor-text'
												/>
											</div>
										</div>
										<div className='flex flex-col w-full items-start text-zinc-200'>
											<h3 className='opacity-100 text-[10px] header'>
												<span className='text-red-400'>*</span> Password
											</h3>
											<div className='flex items-center justify-center w-full'>
												<input
													name='password'
													onChange={(e) => setPassword(e.target.value)}
													className='text-center w-full px-2 select-none focus:outline-none bg-zinc-800 rounded-md hover:bg-zinc-700 hover:cursor-text'
												/>
											</div>
										</div>
										{loginError && (
											<div className='text-[0.6rem] w-[170px] subtext text-red-300 text-center'>
												{loginError}
											</div>
										)}
									</div>
									<button
										type='submit'
										className='text-[10px] group p-2 rounded-md header bg-zinc-800 h-full w-fit items-center flex justify-center hover:scale-105 active:scale-90 hover:cursor-pointer'>
										Submit
									</button>
								</motion.form>
							)}
							{signupClicked && (
								<motion.form
									initial='hidden'
									animate='visible'
									exit='exit'
									variants={formVariants}
									className='w-full flex flex-col space-y-4 items-center'>
									{/* Login Form Fields */}
									<div className='flex flex-col space-y-2'>
										<div className='flex flex-col w-full items-start text-zinc-200'>
											<h3 className='opacity-100 text-[10px] header'>
												<span className='text-red-400'>
													<span className='text-red-400'>*</span>{' '}
												</span>{' '}
												Username
											</h3>
											<div className='flex items-center justify-center w-full'>
												<input className=' text-center w-full px-2 select-none focus:outline-none bg-zinc-800 rounded-md hover:bg-zinc-700 hover:cursor-text' />
											</div>
										</div>
										<div className='flex flex-col w-full items-start text-zinc-200'>
											<h3 className='opacity-100 text-[10px] header'>
												<span className='text-red-400'>*</span> Email
											</h3>
											<div className='flex items-center justify-center w-full'>
												<input className=' text-center w-full px-2 select-none focus:outline-none bg-zinc-800 rounded-md hover:bg-zinc-700 hover:cursor-text' />
											</div>
										</div>
										<div className='flex flex-col w-full items-start text-zinc-200'>
											<h3 className='opacity-100 text-[10px] header'>
												<span className='text-red-400'>*</span> Password
											</h3>
											<div className='flex items-center justify-center w-full'>
												<input className=' text-center w-full px-2 select-none focus:outline-none bg-zinc-800 rounded-md hover:bg-zinc-700 hover:cursor-text' />
											</div>
										</div>
										<div className='flex flex-col w-full items-start text-zinc-200'>
											<h3 className='opacity-100 text-[10px] header'>
												<span className='text-red-400'>*</span> Confirm Password
											</h3>
											<div className='flex items-center justify-center w-full'>
												<input className=' text-center w-full px-2 select-none focus:outline-none bg-zinc-800 rounded-md hover:bg-zinc-700 hover:cursor-text' />
											</div>
										</div>
									</div>
									<button
										type='submit'
										className='text-[10px] group p-2 rounded-md header bg-zinc-800 h-full w-fit items-center flex justify-center hover:scale-105 active:scale-90 hover:cursor-pointer'>
										Submit
									</button>
								</motion.form>
							)}
						</AnimatePresence>
					</div>
				)}
			</motion.div>
		</div>
	);
}
