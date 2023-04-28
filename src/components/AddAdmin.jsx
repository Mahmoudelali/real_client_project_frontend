import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const AddAdmin = ({
	getAllAdmins,
	display,
	admin_window_expanded,
	set_admin_window_expanded,
}) => {
	const nodeEnv = process.env.REACT_APP_URL;
	const [adminData, setAdminData] = useState({
		country: '',
		countryCallingCode: '',
		email: '',
		image: '',
		password: '',
		role: '',
		username: '',
	});

	const handleInputChange = (e) => {
		setAdminData({ ...adminData, [e.target.name]: e.target.value });
	};

	const handleAddAdmin = (e) => {
		e.preventDefault();
		adminData.role === 'admin'
			? axios
					.post(`${nodeEnv}/user/add-admin`, adminData)
					.then((res) => {
						console.log(res);
						res.status === 200 && setAdminData({});
						set_admin_window_expanded(!admin_window_expanded);
						getAllAdmins();
					})
					.catch((err) => {
						console.log(err.message);
					})
			: axios
					.post(`${nodeEnv}/user/add-super-admin`, adminData)
					.then((res) => {
						console.log(res);
						res.status === 200 && setAdminData({});
						set_admin_window_expanded(!admin_window_expanded);
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
			<label className="block" htmlFor="country">
				Country
				<input
					onChange={handleInputChange}
					className="block"
					type="text"
					id="country"
					name="country"
				/>
			</label>
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
			<label htmlFor="role" className="block">
				<span className="block">Role</span>
				<select onChange={handleInputChange} name="role" id="admin">
					<option value="admin">select role </option>
					<option value="admin">Admin</option>
					<option value="superAdmin">Super Admin</option>
				</select>
			</label>
			<label htmlFor="number">
				Number
				<input
					onChange={handleInputChange}
					type="number"
					name="phone"
					id="number"
				/>
			</label>
			<label className="block" htmlFor="country-code">
				country code
				<input
					onChange={handleInputChange}
					className="block"
					type="text"
					id="country-code"
					name="countryCallingCode"
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
			<button onClick={handleAddAdmin}>Add New Admin </button>
		</form>
	);
};

export default AddAdmin;
