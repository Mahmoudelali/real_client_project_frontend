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

	useEffect(getAllProducts, []);
	useEffect(getAllAdmins, []);

	return !products || !users ? (
		<Loader />
	) : (
		<div className="dash-home-container">
			<h1 className="center">Khizana Dashboard</h1>
			<div className="products-home-section">
				<article className="total-products center">
					<p className="center big-font">
						{products && products.length}
					</p>
					<NavLink to="/admin/dashboard/products">Products</NavLink>
				</article>

				<article className="onpage-products center">
					<p className="center big-font">
						{products &&
							products.filter((prod) => {
								return prod.onPage;
							}).length}
					</p>
					<NavLink to="/admin/dashboard/products">Visible</NavLink>
				</article>
				<article className="hidden-products center ">
					<p className="center big-font">
						{products &&
							products.filter((prod) => {
								return !prod.onPage;
							}).length}
					</p>
					<NavLink to="/admin/dashboard/products">Hidden</NavLink>
				</article>
			</div>
			<div className="users-home-section">
				<article>
					<p className="center" style={{ fontSize: '2rem' }}>
						{
							users.filter((user) => {
								return user.role === 'user';
							}).length
						}
					</p>
					<p className="center">
						<Grid>
							<PersonIcon
								sx={{
									fontSize: '6rem',
								}}
							/>
						</Grid>
					</p>
					<div className="center">
						<NavLink to="/admin/dashboard/users">Users</NavLink>
					</div>
				</article>
				<article>
					<p className="center" style={{ fontSize: '2rem' }}>
						{
							users.filter((user) => {
								return (
									user.role === 'admin' ||
									user.role === 'superAdmin'
								);
							}).length
						}
					</p>
					<p className="center">
						<Grid x={1}>
							<AdminPanelSettingsIcon sx={{ fontSize: '6rem' }} />
						</Grid>
					</p>
					<p className="center">
						<NavLink to="/admin/dashboard/admins">Admins</NavLink>
					</p>
				</article>
			</div>
		</div>
	);
};

export default DashHome;
