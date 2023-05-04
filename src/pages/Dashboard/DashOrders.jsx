import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import OrderRow from '../../components/OrderRow';
import Loader from '../../components/Loader';
import { isLoading } from '../../App.js';

const DashOrders = () => {
	const orderTableTitles = [
		'OrderedBy',
		'Email',
		'Address',
		'Product',
		'Total',
		'State',
		'Manage',
		'message',
		'id',
		'delete',
	];
	const [loading, setLoading] = useContext(isLoading);
	const nodeEnv = process.env.REACT_APP_URL;
	const [orders, setOrders] = useState(null);
	const getAllOrders = () => {
		axios
			.get(`${nodeEnv}/order`, {
				headers: {
					auth_token: Cookies.get('auth_token'),
				},
			})
			.then((res) => {
				setOrders(res.data.docs);
				setLoading(false);
				console.log(res.data.docs);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	useEffect(getAllOrders, []);
	return !orders || loading ? (
		<Loader isComponent={true} />
	) : (
		<div className="orders-container">
			<h2 className="title center">Orders</h2>
			<table>
				<thead>
					<tr>
						{orderTableTitles.map((title, index) => {
							return <th key={index}>{title.toUpperCase()}</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{orders &&
						orders
							.filter((order) => {
								return order.state !== 'pending';
							})
							.map(
								({
									address,
									message,
									total,
									user_id,
									_id,
									state,
								}) => (
									<OrderRow
										state={state}
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
							<strong>Total </strong>:{' '}
							{orders &&
								orders.filter((order) => {
									return order.state !== 'pending';
								}).length}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default DashOrders;
