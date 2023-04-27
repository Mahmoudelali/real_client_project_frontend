import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader.jsx';
import User from '../../components/User.jsx';

var urlEnv = process.env.REACT_APP_URL;
const Users = () => {
	const tableTitles = [
		'Username',
		'Country',
		'Email',
		'Role',
		'Phone',
		'ID',
		'Delete',
	];
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
										getAllUsers={getAllUsers}
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
							<td colSpan={8}>
								{' '}
								<strong>Total </strong>: {users.length}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Users;
