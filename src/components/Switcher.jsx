import React from 'react';
import '../Styles/Switcher.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Switcher = ({
	isSuper,
	setIsSuper,
	onPage,
	_id,
	getAllProducts,
	setAdmin,
	getAllUsers,
}) => {
	const nodeEnv = process.env.REACT_APP_URL;

	const handleEditVisibility = () => {
		axios
			.put(
				`${nodeEnv}/products/edit/${_id}`,
				{ onPage: !onPage },
				{
					headers: {
						auth_token: `${Cookies.get('auth_token')}`,
					},
				},
			)
			.then((res) => {
				console.log(res);

				getAllProducts();
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const handleEditAdmin = () => {
		axios
			.put(`${nodeEnv}/user/edit/${_id}`, {
				headers: {
					auth_token: `${Cookies.get('auth_token')}`,
				},
			})
			.then((res) => {
				console.log(res);
				res.status === 200 && setIsSuper(!isSuper);
				getAllUsers();
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return (
		<div
			className="switcher-container"
			style={{
				justifyContent: onPage || isSuper ? 'flex-end' : 'flex-start',
			}}
		>
			<div
				className="switcher-circle"
				style={{
					backgroundColor: onPage || isSuper ? '#28a745' : '#dc3545',
					cursor: 'pointer',
				}}
				// {}
				onClick={setAdmin ? handleEditAdmin : handleEditVisibility}
			></div>
		</div>
	);
};

export default Switcher;
