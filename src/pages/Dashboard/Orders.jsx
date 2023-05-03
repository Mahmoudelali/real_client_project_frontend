import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import OrderRow from '../../components/OrderRow';

const Orders = () => {
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
				console.log(res.data.docs);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	useEffect(getAllOrders, []);
	return <div>this is Order</div>;
};

export default Orders;
