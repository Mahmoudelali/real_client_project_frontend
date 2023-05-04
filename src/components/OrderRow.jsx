import React, { useContext, useState } from 'react';
import { Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import Cookies from 'js-cookie';
import { isLoading } from '../App.js';
const OrderRow = ({
	getAllOrders,
	product,
	address,
	message,
	total,
	username,
	email,
	_id,
	state,
	isPending,
}) => {
	const nodeEnv = process.env.REACT_APP_URL;
	const [loading, setLoading] = useContext(isLoading);

	const handleInputChange = (e) => {
		setLoading(true);
		axios
			.put(
				`${nodeEnv}/order/${_id}`,
				{ state: e.target.value },
				{
					headers: {
						auth_token: Cookies.get('auth_token'),
					},
				},
			)
			.then((response) => {
				console.log(response);
				getAllOrders();
			})
			.catch((err) => {
				console.log(err);
			});
	};
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
			{state && <td>{state}</td>}
			{state && (
				<td>
					<form>
						<select
							name="state"
							id="state"
							onChange={handleInputChange}
						>
							<option>{state}</option>
							<option value="created">Created</option>
							<option value="processing">Processing</option>
							<option value="shipped">Shipped</option>
							<option value="cancelled">Cancelled</option>
						</select>
					</form>
				</td>
			)}
			<td>{message}</td>
			<td>{_id}</td>
			{isPending && (
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
			)}

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
