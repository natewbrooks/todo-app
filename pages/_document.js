import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html
			lang='en'
			className='flex w-full h-full overflow-hidden'>
			<Head>
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='../public/apple-touch-icon'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='../public/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='../public/favicon-16x16.png'
				/>
				<link
					rel='manifest'
					href='../public/site.webmanifest'
				/>
				<link
					rel='mask-icon'
					href='../public/safari-pinned-tab.svg'
					color='#5bbad5'
				/>
				<meta
					name='msapplication-TileColor'
					content='#da532c'
				/>
				<meta
					name='theme-color'
					content='#ffffff'></meta>
			</Head>

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
