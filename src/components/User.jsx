import React from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';
var urlEnv = process.env.REACT_APP_URL;
const User = ({ phone, username, email, role, _id, country, getAllUsers }) => {
	const handleDeleteUser = () => {
		axios
			.delete(`${urlEnv}/user/${_id}`)
			.then((res) => {
				console.log(res);
				getAllUsers();
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	return (
		<tr style={{ paddingTop: '30px' }}>
			<td>{username}</td>
			<td>{country}</td>
			<td style={{ color: 'GrayText' }}>
				<a href={`mailto:${email}`}>{email}</a>
			</td>
			<td style={{ color: 'GrayText' }}>
				{role === 'admin'
					? 'admin'
					: role === 'user'
					? 'user'
					: 'Super Admin '}
			</td>
			<td style={{ color: 'GrayText' }}>{phone}</td>
			<td>{_id}</td>
			<td>
				<button
					className="delete-user"
					onClick={handleDeleteUser}
					style={{ all: 'unset' }}
				>
					<Grid x={1}>
						<DeleteIcon />
					</Grid>
				</button>
			</td>
		</tr>
	);
};

export default User;
