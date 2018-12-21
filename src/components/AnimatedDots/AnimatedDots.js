import React, { useState, useEffect } from 'react';

const AnimatedDots = () => {

	const [dots, setDots] = useState('');
	// Animate three dots
	useEffect(() => {
		const animation =	setInterval(() => {
			setDots(prevDots => (prevDots.length === 3) ? '' : `${prevDots}.`);
			}, 750);
			return () => clearInterval(animation);
	}, []);
	return (
		<span id="animated-dots">{dots}</span>
	);
}

export default AnimatedDots;