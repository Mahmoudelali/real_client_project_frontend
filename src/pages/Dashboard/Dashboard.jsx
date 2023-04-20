import React, { useContext, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { sidebarStatus } from '../../App.js';
import './dashboard.css';

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

const sideLinks = [
	{
		icon: <HomeSharpIcon />,
		path: '/admin/dashboard/home',
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
		icon: <SettingsSharpIcon />,
		path: '/admin/dashboard/settings',
		name: 'Settings',
	},
	
];
const Dashboard = () => {
	const [sidebarExpanded, setSidebarExpanded] = useContext(sidebarStatus);

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
				className="side-bar-container"
				style={{
					width: sidebarExpanded ? '75%' : 0,
					display: sidebarExpanded ? 'flex' : 'none',
				}}
			>
				<div className="greetings">
					<h1>Khizana</h1>
					<h2>hello, name</h2>
				</div>
				<div className="side-links-container">
					{sideLinks.map(({ icon, path, name }, index) => {
						return (
							<NavLink
								key={index}
								to={path}
								onClick={() => {
									setSidebarExpanded(!sidebarExpanded);
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
					className={'logout-btn'}
					to={'/admin/dashboard/logout'}
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
