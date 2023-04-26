import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader.jsx';
import User from '../../components/User.jsx';
import AddIcon from '@mui/icons-material/Add';
import { Grid } from '@mui/material';

var urlEnv = process.env.REACT_APP_URL;
const Users = () => {
	const tableTitles = ['Username', 'Country', 'Email', 'Role', 'Phone', 'ID'];
	const [users, setUsers] = useState(null);

	const getAllUsers = () => {
		axios
			.get(`${urlEnv}/user/users`)
			.then((res) => {
				console.log(res.data.response.docs);
				setUsers(res.data.response.docs);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	useEffect(getAllUsers, []);
	return !users ? (
		<Loader />
	) : (
		<div className="users-container">
			<div className="users-table-container w-100">
				<h2 className="title center">Users Table</h2>
				<table style={{ margin: '0 auto' }}>
					<thead>
						<tr>
							{tableTitles.map((title) => {
								return (
									<th key={tableTitles.indexOf(title)}>
										{title}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{users &&
							users.map(
								({
									role,
									phone,
									country,
									username,
									email,
									_id,
									isAdmin,
								}) => (
									<User
										role={role}
										phone={phone}
										country={country}
										key={_id}
										username={username}
										email={email}
										_id={_id}
										isAdmin={isAdmin}
									/>
								),
							)}
						<tr>
							<td colSpan={2}>
								{' '}
								<strong>Total </strong>: {users.length}
							</td>
							<td colSpan={2}>
								{' '}
								<strong>Total </strong>: {users.length}
							</td>
							<td colSpan={3}>
								<button
								className='add-user-btn'
									style={{
										color: 'black',
										all: 'unset',
										display: 'block',
										width: '100%',
									}}
								>
									<span>Add New User !</span>
									<Grid item>
										<AddIcon>xs=8</AddIcon>
									</Grid>{' '}
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Users;
