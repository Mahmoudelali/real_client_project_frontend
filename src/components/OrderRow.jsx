import React from 'react';
import { Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import Cookies from 'js-cookie';
const OrderRow = ({
	getAllOrders,
	product,
	address,
	message,
	total,
	username,
	email,
	_id,
}) => {
	const nodeEnv = process.env.REACT_APP_URL;
	const handleDeleteOrder = (_id) => {
		axios
			.delete(`${nodeEnv}/order/${_id}`, {
				headers: {
					auth_token: Cookies.get('auth_token'),
				},
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error.message);
			});
		getAllOrders();
	};
	const handleEditOrder = (_id) => {
		axios
			.put(`${nodeEnv}/order/${_id}`, {
				headers: {
					auth_token: Cookies.get('auth_token'),
				},
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error.message);
			});
		getAllOrders();
	};

	return (
		<tr>
			<td>{username}</td>
			<td>
				<a href={`mailto:${email}`}>{email}</a>
			</td>
			<td>{address}</td>
			<td>{product}</td>
			<td>{total}</td>
			<td>{message}</td>
			<td>{_id}</td>
			<td>
				<button
					className="btn success-icon"
					onClick={() => {
						handleEditOrder(_id);
					}}
				>
					<Grid x={1}>
						<CheckCircleIcon />
					</Grid>
				</button>
			</td>
			<td>
				<button
					className=" btn delete-icon"
					onClick={() => {
						handleDeleteOrder(_id);
					}}
				>
					<Grid x={1}>
						<DeleteIcon />
					</Grid>
				</button>
			</td>
		</tr>
	);
};

export default OrderRow;
