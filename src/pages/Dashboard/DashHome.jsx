import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loader from '../../components/Loader';
import { NavLink } from 'react-router-dom';
import { isLoading } from '../../App.js';
import Swal from 'sweetalert2';
// icons
import { Grid } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PendingIcon from '@mui/icons-material/Pending';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VerifiedIcon from '@mui/icons-material/Verified';
import FunctionsIcon from '@mui/icons-material/Functions';

import LinkIcon from '@mui/icons-material/Link';
import Message from '../../components/Message';
//social media icons
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TagIcon from '@mui/icons-material/Tag';

const DashHome = () => {
	const nodeEnv = process.env.REACT_APP_URL;
	const [products, setProducts] = useState(null);
	const [users, setUsers] = useState(null);
	const [orders, setOrders] = useState(null);
	const [socialLinks, setSocialLinks] = useState(null);
	const [socialInput, setSocialInput] = useState({});
	const [messages, setMessages] = useState(null);
	const [loading, setLoading] = useContext(isLoading);

	const handleInputChange = (e) => {
		setSocialInput({ ...socialInput, [e.target.name]: e.target.value });
		console.log(socialInput);
	};
	const getAllMessages = () => {
		axios
			.get(`${nodeEnv}/message`)
			.then((res) => {
				setMessages(res.data.message);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	const getAllAdmins = () => {
		axios
			.get(`${process.env.REACT_APP_URL}/user/`, {
				headers: {
					auth_token: Cookies.get('auth_token'),
				},
			})
			.then((res) => {
				// console.log(res.data.response.docs);
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
	const getSocialLinks = () => {
		axios
			.get(`${nodeEnv}/socialmedia/`)
			.then((res) => {
				setSocialLinks(res.data.docs[0]);
				// console.log(res.data.docs[0]);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	const getAllProfits = () => {
		axios
			.get(`${nodeEnv}/profit/`)
			.then((res) => {
				// console.log(res.data.docs);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	const updateSocialMediaLink = () => {
		axios
			.put(`${nodeEnv}/socialmedia`, socialInput)
			.then((res) => {
				res.status === 200 &&
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Your work has been saved',
						showConfirmButton: false,
						timer: 1500,
					});
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
		getSocialLinks();
	};
	const handleDeleteMessage = (_id) => {
		setLoading(true);
		axios
			.delete(`${nodeEnv}/message/${_id}`)
			.then((res) => {
				console.log(res);
				setLoading(false);
				getAllMessages();
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	useEffect(getAllMessages, []);
	useEffect(getAllProducts, []);
	useEffect(getAllAdmins, []);
	useEffect(getAllOrders, []);
	useEffect(getSocialLinks, []);
	useEffect(getAllProfits, []);

	const dashboard_cards = [
		{
			icon: <FunctionsIcon />,
			link_name: 'Total <br /> Products',
			path: '/admin/dashboard/products',
			value: products ? products.length : null,
		},
		{
			icon: <VerifiedIcon />,
			link_name: 'Active <br /> Orders',
			path: '/admin/dashboard/orders',
			value: orders ? orders.length : null,
		},
		{
			icon: <FunctionsIcon />,
			link_name: 'Pending <br /> Orders',
			path: '/admin/dashboard/orders',
			// value: orders ? orders.length : null,
		},
		{
			icon: <FunctionsIcon />,
			link_name: 'Total <br /> Products',
			path: '/admin/dashboard/products',
			// value: products.length,
		},
		{
			icon: <FunctionsIcon />,
			link_name: 'Total <br /> Products',
			path: '/admin/dashboard/products',
			// value: products.length,
		},
		{
			icon: <FunctionsIcon />,
			link_name: 'Total <br /> Products',
			path: '/admin/dashboard/products',
			// value: products.length,
		},
		{
			icon: <FunctionsIcon />,
			link_name: 'Total <br /> Products',
			path: '/admin/dashboard/products',
			// value: products.length,
		},
	];
	return (
		<div className="dash-home-container">
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
						<Grid>
							<FunctionsIcon />
						</Grid>
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
						<Grid>
							<VerifiedIcon />
						</Grid>
						<NavLink to="/admin/dashboard/orders">
							Active <br /> Orders
						</NavLink>
					</article>
					<article className="onpage-products center">
						<div className="center big-font">
							{!orders ? (
								<Loader border={'5px dotted #fff'} />
							) : (
								orders.filter((order) => {
									return order.state === 'pending';
								}).length
							)}
						</div>
						<Grid>
							<PendingIcon />
						</Grid>
						<NavLink to="/admin/dashboard/orders">
							Pending <br /> Orders
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
						<Grid>
							<RemoveRedEyeIcon />
						</Grid>
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
						<Grid>
							<VisibilityOffIcon />
						</Grid>

						<NavLink to="/admin/dashboard/products">
							Hidden <br /> Products
						</NavLink>
					</article>
					<article className="flex-card">
						<span
							className="center big-font "
							style={{
								fontFamily: 'Arial',
								fontWeight: 900,
							}}
						>
							{!users ? (
								<Loader border={'5px dotted #eee '} />
							) : (
								users.filter((user) => {
									return user.role === 'user';
								}).length
							)}
						</span>
						<span className="center">
							<Grid>
								<PersonIcon />
							</Grid>
						</span>
						<div className="center">
							<NavLink to="/admin/dashboard/users">
								Khizana <br /> Users
							</NavLink>
						</div>
					</article>
					<article className="flex-card">
						<div
							className="center"
							style={{
								fontSize: '4rem',
								fontFamily: 'Arial',
								fontWeight: 900,
							}}
						>
							{!users ? (
								<Loader border={'5px dotted #eee'} />
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
								<AdminPanelSettingsIcon />
							</Grid>
						</span>
						<p className="center">
							<NavLink to="/admin/dashboard/admins">
								Khizana <br /> Admins
							</NavLink>
						</p>
					</article>
				</div>

				<div className="edit-contact-section">
					<form
						className="links-form"
						style={{
							padding: '.5rem',
						}}
					>
						<div className="title-container">
							<h2 className="center">
								<LinkIcon
									style={{
										verticalAlign: 'middle',
										marginRight: '5px',
									}}
								/>
								Edit LINKS
							</h2>
						</div>
						<div className="labels-container">
							<label style={{ margin: '5px 0' }} htmlFor="">
								<WhatsAppIcon
									style={{
										fontSize: '1.1rem',
										margin: ' 0 5px 2px 0',
										verticalAlign: 'middle',
									}}
								/>
								Whatsapp
							</label>
							<input
								name="whatsapp"
								onChange={handleInputChange}
								type="text"
								className="input w-100"
								placeholder={
									socialLinks ? socialLinks.whatsapp : ''
								}
							/>
							<label style={{ margin: '5px 0' }} htmlFor="">
								<FacebookIcon
									style={{
										fontSize: '1.1rem',
										margin: ' 0 5px 2px 0',
										verticalAlign: 'middle',
									}}
								/>
								Facebook
							</label>
							<input
								name="facebook"
								onChange={handleInputChange}
								type="text"
								className="input w-100"
								placeholder={
									socialLinks ? socialLinks.facebook : ''
								}
							/>
							<label style={{ margin: '5px 0' }} htmlFor="">
								<InstagramIcon
									style={{
										fontSize: '1.1rem',
										margin: ' 0 5px 2px 0',
										verticalAlign: 'middle',
									}}
								/>
								Instagram
							</label>
							<input
								name="instagram"
								onChange={handleInputChange}
								type="text"
								className="input w-100"
								placeholder={
									socialLinks ? socialLinks.instagram : ''
								}
							/>
							<label style={{ margin: '5px 0' }} htmlFor="email">
								<MailOutlineIcon
									style={{
										fontSize: '1.1rem',
										margin: ' 0 5px 2px 0',
										verticalAlign: 'middle',
									}}
								/>
								email{' '}
							</label>
							<input
								name="email"
								onChange={handleInputChange}
								type="text"
								className="input w-100"
								placeholder={
									socialLinks ? socialLinks.email : ''
								}
							/>
							<label
								style={{ marginTop: '5px' }}
								htmlFor="number"
							>
								<TagIcon
									style={{
										fontSize: '1.1rem',
										margin: ' 0 5px 2px 0',
										verticalAlign: 'middle',
									}}
								/>
								number{' '}
							</label>
							<input
								name="number"
								onChange={handleInputChange}
								type="text"
								className="input w-100"
								placeholder={
									socialLinks ? socialLinks.number : ''
								}
							/>

							<button
								className="submit-btn w-100"
								onClick={(e) => {
									e.preventDefault();
									updateSocialMediaLink();
								}}
							>
								Save
							</button>
						</div>
					</form>
				</div>
				<div className="messages-grid-container">
					<div className="messages-title-container">
						<h2 className="center">
							MESSAGES FROM USERS ({messages && messages.length})
						</h2>
					</div>

					<div className="messages-display-contianer">
						{!messages || loading ? (
							<Loader />
						) : (
							messages.map(
								({
									user_Fname,
									user_Lname,
									user_email,
									message,
									_id,
								}) => {
									return (
										<Message
											key={_id}
											user_Fname={user_Fname}
											user_Lname={user_Lname}
											user_email={user_email}
											handleDeleteMessage={
												handleDeleteMessage
											}
											_id={_id}
											message={message}
										/>
									);
								},
							)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashHome;
