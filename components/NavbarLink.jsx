import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function NavbarLink({ href, Icon, label, onClick }) {
	const router = useRouter();
	return (
		<Link
			href={href}
			className={`w-full h-full lg:h-fit lg:w-full ${
				router.pathname == href
					? 'border-purple-300 bg-zinc-200/[5%] cursor-default'
					: 'border-transparent md:hover:border-zinc-200 md:hover:bg-zinc-200/10 cursor-pointer'
			} border-b-2 lg:border-b-0 lg:border-l-2 h-fit p-3 md:p-2 lg:p-3 `}>
			<div
				className={`flex flex-col justify-center items-center space-y-2  w-full`}
				onClick={onClick}>
				<Icon
					className={`text-zinc-200`}
					size='18'
				/>
				<h3 className={`hidden leading-none md:block text-zinc-200 text-[10px]`}>{label}</h3>
			</div>
		</Link>
	);
}
{
}
