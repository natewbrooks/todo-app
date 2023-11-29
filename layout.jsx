import Navbar from './components/Navbar';
import { useRef, useEffect, useState, useCallback } from 'react';

export default function Layout({ children }) {
	const navRef = useRef(null);
	const [sectionDimensions, setSectionDimensions] = useState([0, 0]);
	const [isMobileDevice, setMobileDevice] = useState(false);

	// useCallback to memoize the function based on specific states
	const handleResize = useCallback(() => {
		const width = window.innerWidth;
		setMobileDevice(width <= 1024);

		if (navRef.current != null) {
			const navHeight = navRef.current.offsetHeight;
			const navWidth = navRef.current.offsetWidth;
			// Set dimensions based on updated state
			setSectionDimensions([
				width <= 1024 ? window.innerWidth : window.innerWidth - navWidth,
				width <= 1024 ? window.innerHeight - navHeight : window.innerHeight,
			]);
		}
	}, []);

	// useEffect with proper dependency array
	useEffect(() => {
		if (navRef.current != null) {
			handleResize(); // Call once to set initial size
			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	}, [handleResize, isMobileDevice]); // Dependency on isMobileDevice state

	return (
		<div className={`w-full h-full flex ${isMobileDevice ? 'flex-col' : 'flex-row'}`}>
			{!isMobileDevice && <Navbar navRef={navRef} />}
			<div
				style={{ width: sectionDimensions[0], height: sectionDimensions[1] }}
				className={`h-full xs:w-fit lg:w-full flex flex-row`}>
				{children}
			</div>
			{isMobileDevice && <Navbar navRef={navRef} />}
		</div>
	);
}
