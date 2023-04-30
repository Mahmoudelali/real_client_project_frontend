import React, { useState } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Grid } from '@mui/material';
import Cookies from 'js-cookie';
import Switcher from './Switcher';
var urlEnv = process.env.REACT_APP_URL;
const User = ({
	phone,
	username,
	email,
	role,
	_id,
	country,
	getAllUsers,
	countryCallingCode,
	adminsView,
}) => {
	const [processing, setProcessing] = useState(false);
	const [isSuper, setIsSuper] = useState(
		role === 'superAdmin' ? true : false,
	);
	const handleDeleteUser = () => {
		axios
			.delete(`${urlEnv}/user/${_id}`, {
				headers: {
					auth_token: Cookies.get('auth_token'),
				},
			})
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
			{adminsView && (
				<td>
					<Switcher
						_id={_id}
						setAdmin={true}
						isSuper={isSuper}
						setIsSuper={setIsSuper}
					/>
				</td>
			)}
			<td style={{ color: 'GrayText', textAlign: 'start' }}>
				<span>
					{role === 'admin'
						? 'admin'
						: role === 'user'
						? 'user'
						: 'Super Admin '}
				</span>
			</td>
			<td style={{ color: 'GrayText' }}>{phone}</td>

			{countryCallingCode && (
				<td style={{ color: 'GrayText' }}>+{countryCallingCode}</td>
			)}

			{!adminsView && <td>{_id}</td>}
			<td>
				<button
					className="delete-user delete-icon btn"
					onClick={handleDeleteUser}
					// style={{ all: 'unset' }}
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
