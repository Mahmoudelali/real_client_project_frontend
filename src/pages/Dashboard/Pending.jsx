import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import Loader from '../../components/Loader';
import '../Dashboard/dashboard.css';
import OrderRow from '../../components/OrderRow';

const Pending = () => {
	const orderTableTitles = [
		'orderedBy',
		'email',
		'address',
		'product',
		'total',
		'message',
		'_id',
		'approve',
		'delete',
	];
	const nodeEnv = process.env.REACT_APP_URL;
	const [pendingOrders, setPendingOrders] = useState(null);

	const getAllOrders = () => {
		axios
			.get(`${nodeEnv}/order`, {
				headers: {
					auth_token: Cookies.get('auth_token'),
				},
			})
			.then((res) => {
				console.log(res.data.docs);
				setPendingOrders(
					res.data.docs.filter((doc) => {
						return doc.state === 'pending';
					}),
				);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	useEffect(getAllOrders, []);
	return !pendingOrders ? (
		<Loader />
	) : (
		<div className="orders-container">
			<h2 className="title center">Pending Orders</h2>
			<table>
				<thead>
					<tr>
						{orderTableTitles.map((title, index) => {
							return <th key={index}>{title}</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{pendingOrders &&
						pendingOrders
							.filter((order) => {
								return order.state === 'pending';
							})
							.map(
								({ address, message, total, user_id, _id }) => (
									<OrderRow
										key={_id}
										address={address}
										message={message}
										total={total}
										username={user_id.username}
										email={user_id.email}
										_id={_id}
										getAllOrders={getAllOrders}
									/>
								),
							)}
					<tr>
						<td>
							<strong>Total </strong>: {pendingOrders.length}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Pending;
