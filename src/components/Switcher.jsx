import React, { useState, useContext } from 'react';
import '../Styles/Switcher.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { isLoading } from '../App.js';

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
	const [Loading, setLoading] = useContext(isLoading);

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
				if (res.status === 200) {
					getAllProducts();
					setLoading(false);
					console.log(res);
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const handleEditAdmin = () => {
		axios
			.put(
				`${nodeEnv}/user/edit/${_id}`,
				isSuper ? { role: 'superAdmin' } : { role: 'admin' },
				{
					headers: {
						auth_token: `${Cookies.get('auth_token')}`,
					},
				},
			)
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
				onClick={() => {
					setLoading(true);
					console.log(Loading);
					setAdmin ? handleEditAdmin() : handleEditVisibility();
				}}
			></div>
		</div>
	);
};

export default Switcher;
