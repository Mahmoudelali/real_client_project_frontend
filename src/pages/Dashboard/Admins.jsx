import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader.jsx';
import User from '../../components/User.jsx';
import { Grid } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddAdmin from '../../components/AddAdmin.jsx';
import Cookies from 'js-cookie';
import { isLoading } from '../../App.js';

const Admins = () => {
	const userData = JSON.parse(Cookies.get('user'));
	const [loading, setLoading] = useContext(isLoading);
	const [users, setUsers] = useState(null);
	const [admin_window_expanded, set_admin_window_expanded] = useState(false);
	const [endPoint, setEndPoint] = useState('/add-admin');
	const [search, setSearch] = useState('');

	const getAllAdmins = () => {
		console.log(loading);
		axios
			.get(`${process.env.REACT_APP_URL}/user/`, {
				headers: {
					auth_token: Cookies.get('auth_token'),
				},
			})
			.then((res) => {
				console.log(res.data.response.docs);
				setUsers(res.data.response.docs);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	useEffect(getAllAdmins, []);

	const tableTitles = [
		'Username',
		'Country',
		'Email',
		'admin/Super Admin',
		'Role',
		'Phone',
		'country Code',
		'Delete',
	];

	return !users || loading ? (
		<Loader isComponent={true} />
	) : (
		<div className="users-container">
			<div className="users-table-container w-100">
				<h2 className="title center">Admins Table</h2>

				<table style={{ margin: '0 auto' }}>
					<thead>
						<tr>
							<td colSpan={6} style={{ padding: 0 }}>
								<form style={{ marginBottom: '10px' }}>
									<input
										placeholder="Search"
										type="text"
										className="input"
										style={{
											display: 'block',
										}}
										onChange={(e) => {
											setSearch(e.target.value);
										}}
									/>
								</form>
							</td>
						</tr>
						<tr>
							{tableTitles.map((title) => {
								return (
									<th key={tableTitles.indexOf(title)}>
										{title.toUpperCase()}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{users &&
							users
								.filter((member) => {
									return member.role !== 'user';
								})
								.filter((admin) => {
									return search.toLocaleLowerCase() === ''
										? admin
										: admin.username
												.toLowerCase()
												.includes(search) ||
												admin.email
													.toLowerCase()
													.includes(search) ||
												admin.role
													.toLowerCase()
													.includes(search) ||
												admin.phone
													.toLowerCase()
													.includes(search);
								})
								.map(
									({
										role,
										country,
										username,
										email,
										_id,
										isAdmin,
										countryCallingCode,
										phone,
									}) => (
										<User
											admin_window_expanded={
												admin_window_expanded
											}
											set_admin_window_expanded={
												set_admin_window_expanded
											}
											adminsView={true}
											getAllUsers={getAllAdmins}
											role={role}
											phone={phone}
											country={country}
											countryCallingCode={
												countryCallingCode
											}
											key={_id}
											username={username}
											email={email}
											_id={_id}
											isAdmin={isAdmin}
										/>
									),
								)}
						<tr>
							{userData.role == 'superAdmin' && (
								<td style={{ color: 'red' }}>
									<button
										className="btn "
										onClick={() => {
											setEndPoint('/add-super-admin');

											set_admin_window_expanded(
												!admin_window_expanded,
											);
										}}
									>
										<Grid item xs={1}>
											<AdminPanelSettingsIcon />
										</Grid>
										<strong>New Super Admin</strong>
									</button>
								</td>
							)}
							{userData.role == 'superAdmin' && (
								<td
									style={{ display: 'flex', color: 'orange' }}
								>
									<button
										className="btn accent-color "
										onClick={() => {
											setEndPoint('/add-admin');
											console.log(admin_window_expanded);
											console.log(endPoint);
											set_admin_window_expanded(
												!admin_window_expanded,
											);
										}}
									>
										<Grid item xs={1}>
											<AdminPanelSettingsIcon />
										</Grid>
										<strong>New Admin</strong>
									</button>
								</td>
							)}

							<td colSpan={5}></td>
							<td>
								<strong>Total </strong>:{' '}
								{
									users.filter((admin) => {
										return admin.role !== 'user';
									}).length
								}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<AddAdmin
				endPoint={endPoint}
				title={
					endPoint == '/add-admin' ? 'Add Admin' : 'Add Super Admin'
				}
				getAllAdmins={getAllAdmins}
				display={admin_window_expanded}
				admin_window_expanded={admin_window_expanded}
				set_admin_window_expanded={set_admin_window_expanded}
			/>
		</div>
	);
};
export default Admins;
