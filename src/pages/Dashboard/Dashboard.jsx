import React, { useContext, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { SidebarStatus } from '../../App';
import './dashboard.css';
import cookie from 'react-cookies';
import Cookies from 'js-cookie';
// icons
import { Grid } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import GroupIcon from '@mui/icons-material/Group';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import PendingIcon from '@mui/icons-material/Pending';
import HandshakeIcon from '@mui/icons-material/Handshake';
import axios from 'axios';

const sideLinks = [
	{
		icon: <HomeSharpIcon />,
		path: '/admin/dashboard/',
		name: 'Home',
	},
	{
		icon: <AdminPanelSettingsIcon />,
		path: '/admin/dashboard/admins',
		name: 'Admins',
	},
	{
		icon: <GroupIcon />,
		path: '/admin/dashboard/users',
		name: 'Users',
	},
	{
		icon: <ShoppingCartIcon />,
		path: '/admin/dashboard/products',
		name: 'Products',
	},
	{
		icon: <PendingIcon />,
		path: '/admin/dashboard/pending',
		name: 'Pending',
	},

	{
		icon: <HandshakeIcon />,
		path: '/admin/dashboard/orders',
		name: 'Orders',
	},
];
const Dashboard = ({ loggedIn, setLoggedIn }) => {
	const [sidebarExpanded, setSidebarExpanded] = useContext(SidebarStatus);
	const username = cookie.load('user').username;
	const userData = JSON.parse(Cookies.get('user'));

	return (
		<div className="dashboard-container">
			<button
				onClick={() => {
					setSidebarExpanded(!sidebarExpanded);
				}}
				className="toggle-menu-icon"
			>
				<Grid item lg={1}>
					{sidebarExpanded ? <CloseIcon /> : <MenuIcon />}
				</Grid>
			</button>
			<div
				className={
					sidebarExpanded
						? 'side-bar-container'
						: 'side-bar-container side-bar-hidden'
				}
			>
				<div className="greetings">
					<h1>Khizana</h1>
					<h2>hello, {username}</h2>
				</div>

				<div className="side-links-container">
					{userData.role !== 'admin'
						? sideLinks.map(({ icon, path, name }, index) => {
								return (
									<NavLink
										key={index}
										to={path}
										onClick={() => {
											window.screen.width < 468 &&
												setSidebarExpanded(
													!sidebarExpanded,
												);
										}}
									>
										<Grid item xs={1}>
											{icon}
										</Grid>
										{name}
									</NavLink>
								);
						  })
						: sideLinks
								.filter((link) => {
									return link.name != 'Admins';
								})
								.map(({ name, icon, path }, index) => {
									return (
										<NavLink
											key={index}
											to={path}
											onClick={() => {
												window.screen.width < 468 &&
													setSidebarExpanded(
														!sidebarExpanded,
													);
											}}
										>
											<Grid item xs={1}>
												{icon}
											</Grid>
											{name}
										</NavLink>
									);
								})}
				</div>
				<NavLink
					onClick={() => {
						cookie.remove('user');
						cookie.remove('auth_token');
						setLoggedIn(!loggedIn);
					}}
					className={'logout-btn'}
					to={'/'}
				>
					<Grid item xs={1}>
						<LogoutIcon />
					</Grid>
					Logout
				</NavLink>
			</div>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Dashboard;
