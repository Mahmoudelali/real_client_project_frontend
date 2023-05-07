import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import OrderRow from '../../components/OrderRow';
import Loader from '../../components/Loader';
import { isLoading } from '../../App';
import Swal from 'sweetalert2';
import { Pagination } from 'antd';

const DashOrders = () => {
	const nodeEnv = process.env.REACT_APP_URL;
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
	const [orders, setOrders] = useState(null);
	const [search, setSearch] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalDocs, setTotalDocs] = useState();

	const pageSize = 10;

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
				setTotalDocs(res.data.totalDocs);
				console.log(res.data.docs);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	useEffect(getAllOrders, []);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return !orders || loading ? (
		<Loader isComponent={true} />
	) : (
		<div className="orders-container">
			<h2 className="title center">Orders</h2>

			<table>
				<thead>
					<tr>
						<td
							colSpan={6}
							style={{ padding: 0, marginBottom: '10px' }}
						>
							<form style={{ marginBottom: '10px' }}>
								<input
									placeholder="Search"
									type="text"
									className="input"
									style={{
										display: 'block',
									}}
									onChange={(e) => {
										setSearch(e.target.value);
									}}
								/>
							</form>
						</td>
					</tr>
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
							.filter((order) => {
								return search === ''
									? order
									: order._id
											.toLowerCase()
											.includes(search) ||
											order.state
												.toLowerCase()
												.includes(search) ||
											order.total
												.toString()
												.includes(search) ||
											order.user_id._id
												.toLowerCase()
												.includes(search) ||
											order.user_id.username
												.toLowerCase()
												.includes(search);
							})
							.slice(
								(currentPage - 1) * pageSize,
								currentPage * pageSize,
							)
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
										initialPrice={total}
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
			<div className="dashboard-orders-pagination-container">
				<Pagination
					current={currentPage}
					onChange={handlePageChange}
					total={totalDocs}
					pageSize={pageSize}
				/>
			</div>
		</div>
	);
};

export default DashOrders;
