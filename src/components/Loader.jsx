import React from 'react';
import '../Styles/Loader.css';

const Loader = ({ border, isComponent, padding }) => {
	return (
		<div
			className="loader-container"
			style={{
				height: isComponent && '100vh',
				padding: padding && padding,
			}}
		>
			<span
				className="loader"
				style={{ border: border ? border : '5px dotted #000' }}
			></span>
		</div>
	);
};

export default Loader;
