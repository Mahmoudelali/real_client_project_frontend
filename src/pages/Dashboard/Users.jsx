import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader.jsx';
import User from '../../components/User.jsx';
import Cookies from 'js-cookie';
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
	const [search, setSearch] = useState('');

	const getAllUsers = () => {
		axios
			.get(`${urlEnv}/user/users`, {
				headers: {
					auth_token: `${Cookies.get('auth_token')}`,
				},
			})
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
		<Loader isComponent={true} />
	) : (
		<div className="users-container">
			<div className="users-table-container w-100">
				<h2 className="title center">Users Table</h2>
				<form style={{ marginBottom: '10px' }}>
					<input
						placeholder="Search"
						type="text"
						className="input"
						style={{
							width: '20%',
							display: 'block',
							margin: '0 auto',
						}}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
				</form>
				<table style={{ margin: '0 auto' }}>
					<thead>
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
								.filter((user) => {
									return search.toLocaleLowerCase() === ''
										? user
										: user.username
												.toLowerCase()
												.includes(search) ||
												user.email
													.toLowerCase()
													.includes(search) ||
												user.role
													.toLowerCase()
													.includes(search) ||
												user.phone
													.toLowerCase()
													.includes(search);
								})
								.map(
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
											adminsView={false}
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
