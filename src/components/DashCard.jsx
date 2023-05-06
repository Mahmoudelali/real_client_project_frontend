import React from 'react';
import Loader from './Loader.jsx';

const DashCard = ({ icon, link_name, value, path }) => {
	return (
		<article className="onpage-products center">
			<div className="center big-font">
				{!value ? <Loader border={'5px dotted #fff'} /> : value.length}
			</div>
			<Grid>{icon}</Grid>
			<NavLink to={path}>{link}</NavLink>
		</article>
	);
};

export default DashCard;
