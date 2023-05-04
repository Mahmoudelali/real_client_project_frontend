import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

const AddAdmin = ({
	title,
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
		<div
			className="admin-form-container"
			style={{
				display: display ? 'flex' : 'none',
			}}
		>
			<form className="admin-form" encType="multipart/form-data">
				<button
					className="btn"
					onClick={(e) => {
						e.preventDefault();
						set_admin_window_expanded(!admin_window_expanded);
					}}
				>
					<Grid x={1}>
						<CloseIcon />
					</Grid>
				</button>
				<h2 className="title">{title}</h2>
				<label className="block" htmlFor="username">
					<span>Username</span>
					<input
						onChange={handleInputChange}
						className="block w-100   input"
						type="text"
						id="username"
						name="username"
					/>
				</label>

				<label className="block" htmlFor="password">
					<span>password </span>
					<input
						onChange={handleInputChange}
						className="block w-100  input"
						type="password"
						id="password"
						name="password"
					/>
				</label>

				<label className="block" htmlFor="email">
					<span>email </span>
					<input
						onChange={handleInputChange}
						className="block w-100 input "
						type="text"
						id="email"
						name="email"
					/>
				</label>

				<label htmlFor="number">
					<span>Number </span>
					<input
						className="w-100 input "
						onChange={handleInputChange}
						type="text"
						name="phone"
						id="number"
					/>
				</label>

				<label className="block" htmlFor="image">
					<span>image</span>
					<input
						onChange={handleInputChange}
						className="block w-100 input "
						type="file"
						id="image"
						name="image"
					/>
				</label>

				<button onClick={handleAddAdmin} className="btn submit-btn">
					Add New Admin{' '}
				</button>
			</form>
		</div>
	);
};

export default AddAdmin;
