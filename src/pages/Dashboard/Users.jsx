import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader.jsx';
import User from '../../components/User.jsx';

var urlEnv = process.env.REACT_APP_URL;
const Users = () => {
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
							<td>
								{' '}
								<strong>total </strong>: {users.length}
							</td>
							<td>
								{' '}
								<strong>
									admins :{' '}
									{users &&
										users.filter((user) => {
											console.log(user);
											return user.role === 'admin';
										}).length}{' '}
								</strong>
								:
							</td>
							<td>
								{' '}
								<strong>
									users :{' '}
									{users &&
										users.filter((user) => {
											console.log(user);
											return user.role === 'user';
										}).length}{' '}
								</strong>
								:
							</td>
							<td>
								<button style={{ color: 'black' }}>
									add New !!
								</button>
							</td>
						</tr>
						<tr>
							<th>Username</th>
							<th>Country</th>
							<th>Email</th>
							<th>Admin/user</th>
							<th>Phone</th>
							<th>ID</th>
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
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Users;
