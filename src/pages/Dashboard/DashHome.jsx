import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loader from '../../components/Loader';
import { NavLink } from 'react-router-dom';

import { Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const DashHome = () => {
	const nodeEnv = process.env.REACT_APP_URL;
	const [products, setProducts] = useState(null);
	const [users, setUsers] = useState(null);
	const [orders, setOrders] = useState(null);

	const getAllAdmins = () => {
		axios
			.get(`${process.env.REACT_APP_URL}/user/`, {
				headers: {
					auth_token: Cookies.get('auth_token'),
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

	const getAllProducts = () => {
		axios
			.get(`${nodeEnv}/products/`, {
				headers: { auth_token: Cookies.get('auth_token') },
			})
			.then((res) => {
				// console.log(res.data.docs);
				setProducts(res.data.docs);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	const getAllOrders = () => {
		axios
			.get(`${nodeEnv}/order`, {
				headers: {
					auth_token: Cookies.get('auth_token'),
				},
			})
			.then((res) => {
				setOrders(res.data.docs);
				// console.log(res.data.docs);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	useEffect(getAllProducts, []);
	useEffect(getAllAdmins, []);
	useEffect(getAllOrders, []);

	return (
		<div className="dash-home-container">
			<h1 className="center">Khizana Dashboard</h1>
			<div className="home-grid-container">
				<div className="products-home-section">
					<article className="total-products center">
						<div className="center big-font">
							{!products ? (
								<Loader border={'5px dotted #fff'} />
							) : (
								products.length
							)}
						</div>
						<NavLink to="/admin/dashboard/products">
							Total <br /> Products
						</NavLink>
					</article>

					<article className="onpage-products center">
						<div className="center big-font">
							{!orders ? (
								<Loader border={'5px dotted #fff'} />
							) : (
								orders.length
							)}
						</div>
						<NavLink to="/admin/dashboard/orders">
							Active <br /> Orders
						</NavLink>
					</article>
					<article className="onpage-products center">
						<div className="center big-font">
							{!products ? (
								<Loader border={'5px dotted #fff'} />
							) : (
								products.filter((prod) => {
									return prod.onPage;
								}).length
							)}
						</div>
						<NavLink to="/admin/dashboard/products">
							Visible <br /> Products
						</NavLink>
					</article>
					<article className="hidden-products center ">
						<div className="center big-font">
							{!products ? (
								<Loader border={'5px dotted #fff'} />
							) : (
								products.filter((prod) => {
									return !prod.onPage;
								}).length
							)}
						</div>
						<NavLink to="/admin/dashboard/products">
							Hidden <br /> Products
						</NavLink>
					</article>
				</div>
				<div className="users-home-section">
					<article className="flex-card">
						<span
							className="center "
							style={{
								fontSize: '4rem',
								fontFamily: 'Arial Narrow',
								fontWeight: 900,
							}}
						>
							{!users ? (
								<Loader border={'5px dotted #fc6d26'} />
							) : (
								users.filter((user) => {
									return user.role === 'user';
								}).length
							)}
						</span>
						<span className="center">
							<Grid>
								<PersonIcon
									sx={{
										fontSize: '6rem',
									}}
								/>
							</Grid>
						</span>
						<div className="center">
							<NavLink to="/admin/dashboard/users">
								Khizana <br /> User
							</NavLink>
						</div>
					</article>
					<article className="flex-card">
						<div
							className="center"
							style={{
								fontSize: '4rem',
								fontFamily: 'Arial Narrow',
								fontWeight: 900,
							}}
						>
							{!users ? (
								<Loader border={'5px dotted #fc6d26'} />
							) : (
								users.filter((user) => {
									return (
										user.role === 'admin' ||
										user.role === 'superAdmin'
									);
								}).length
							)}
						</div>
						<span className="center">
							<Grid x={1}>
								<AdminPanelSettingsIcon
									sx={{ fontSize: '6rem' }}
								/>
							</Grid>
						</span>
						<p className="center">
							<NavLink to="/admin/dashboard/admins">
								Khizana <br /> Admin
							</NavLink>
						</p>
					</article>
				</div>
			</div>
		</div>
	);
};

export default DashHome;
