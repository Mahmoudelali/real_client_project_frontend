import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

const AddAdmin = ({
	endPoint,
	getAllAdmins,
	display,
	admin_window_expanded,
	set_admin_window_expanded,
}) => {
	const nodeEnv = process.env.REACT_APP_URL;
	const [adminData, setAdminData] = useState({});

	const handleInputChange = (e) => {
		setAdminData({ ...adminData, [e.target.name]: e.target.value });
	};

	const handleAddAdmin = (e) => {
		e.preventDefault();
		axios
			.post(`${nodeEnv}/user${endPoint}`, adminData, {
				headers: {
					auth_token: Cookies.get('auth_token'),
				},
			})
			.then((res) => {
				res.status === 200 && setAdminData({});
				res.status === 200 &&
					set_admin_window_expanded(!admin_window_expanded);

				console.log(res);
				getAllAdmins();
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return (
		<form
			encType="multipart/form-data"
			style={{
				backgroundColor: 'powderblue',
				display: display ? 'block' : 'none',
			}}
		>
			<button
				onClick={(e) => {
					e.preventDefault();
					set_admin_window_expanded(!admin_window_expanded);
				}}
			>
				<Grid x={1}>
					<CloseIcon />
				</Grid>
			</button>

			<label className="block" htmlFor="username">
				Username
				<input
					onChange={handleInputChange}
					className="block"
					type="text"
					id="username"
					name="username"
				/>
			</label>

			<label className="block" htmlFor="password">
				password
				<input
					onChange={handleInputChange}
					className="block"
					type="password"
					id="password"
					name="password"
				/>
			</label>

			<label className="block" htmlFor="email">
				email
				<input
					onChange={handleInputChange}
					className="block"
					type="text"
					id="email"
					name="email"
				/>
			</label>

			<label htmlFor="number">
				Number
				<input
					onChange={handleInputChange}
					type="text"
					name="phone"
					id="number"
				/>
			</label>

			<label className="block" htmlFor="image">
				image
				<input
					onChange={handleInputChange}
					className="block"
					type="file"
					id="image"
					name="image"
				/>
			</label>

			<button onClick={handleAddAdmin} className="btn">
				Add New Admin{' '}
			</button>
		</form>
	);
};

export default AddAdmin;
