import React, { useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { isLoading } from '../App.js';
import Swal from 'sweetalert2';

import { Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer);
		toast.addEventListener('mouseleave', Swal.resumeTimer);
	},
});

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
			.put(
				`${nodeEnv}/order/${_id}`,
				{ state: 'created' },
				{
					headers: {
						auth_token: Cookies.get('auth_token'),
					},
				},
			)
			.then((response) => {
				console.log(response);
				setLoading(false);
				Toast.fire({
					icon: 'success',
					title: 'Order approved',
				});
				getAllOrders();
			})
			.catch((error) => {
				console.log(error);
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
			<td>
				<i>{total}</i>
				<i>$</i>
			</td>
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
							<option value="pending">Pending</option>
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
				<td style={{ color: '#007bff' }}>
					<button
						className="btn"
						onClick={() => {
							Swal.fire({
								input: 'textarea',
								inputLabel: 'Review Order',
								inputPlaceholder: 'Type your message here...',
								inputAttributes: {
									'aria-label': 'Type your message here',
									name: 'review',
								},
								showCancelButton: true,
							}).then((res) => {
								if (res.isConfirmed) {
									axios
										.put(
											`${nodeEnv}/order/${_id}`,
											{
												review: res.value,
											},
											{
												headers: {
													auth_token:
														Cookies.get(
															'auth_token',
														),
												},
											},
										)
										.then((res) => {
											res.status === 200 &&
												Toast.fire({
													icon: 'success',
													title: 'Review sent successfully',
												});
										})
										.catch((err) => {
											console.log(err.message);
										});
									console.log(res.value);
								}
							});
						}}
					>
						<EmojiObjectsIcon />
					</button>
				</td>
			)}
			{isPending && (
				<td style={{ color: '#5cb85c' }}>
					<button
						className="btn success-icon"
						onClick={() => {
							setLoading(true);
							handleEditOrder(_id);
						}}
					>
						<Grid x={1}>
							<CheckCircleIcon />
						</Grid>
					</button>
				</td>
			)}

			<td className="delete-icon">
				<button
					className=" btn "
					onClick={() => {
						Swal.fire({
							title: 'Are you sure?',
							text: "You won't be able to revert this!",
							icon: 'warning',
							showCancelButton: true,
							confirmButtonColor: '#d33',
							cancelButtonColor: '#3085d6',
							confirmButtonText: 'Delete',
						}).then((result) => {
							if (result.isConfirmed) {
								handleDeleteOrder(_id);
								Swal.fire('Deleted!', 'success');
							}
						});
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
