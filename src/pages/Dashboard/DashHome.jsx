import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loader from '../../components/Loader';
import { NavLink } from 'react-router-dom';
import { isLoading } from '../../App.js';
// icons
import { Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PendingIcon from '@mui/icons-material/Pending';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VerifiedIcon from '@mui/icons-material/Verified';
import FunctionsIcon from '@mui/icons-material/Functions';
import DeleteIcon from '@mui/icons-material/Delete';

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
	const updateSocialMediaLink = (e) => {
		e.preventDefault();
		axios
			.put(`${nodeEnv}/socialmedia`, socialInput)
			.then((res) => {
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
							<h2 className="center">Edit Contact-us section</h2>
						</div>
						<div className="labels-container">
							<label htmlFor="">Whatsapp</label>
							<input
								name="whatsapp"
								onChange={handleInputChange}
								type="text"
								className="input w-100"
								placeholder={
									socialLinks ? socialLinks.whatsapp : ''
								}
							/>
							<label htmlFor="">Facebook</label>
							<input
								name="facebook"
								onChange={handleInputChange}
								type="text"
								className="input w-100"
								placeholder={
									socialLinks ? socialLinks.facebook : ''
								}
							/>
							<label htmlFor="">Instagram</label>
							<input
								name="instagram"
								onChange={handleInputChange}
								type="text"
								className="input w-100"
								placeholder={
									socialLinks ? socialLinks.instagram : ''
								}
							/>
							<label htmlFor="email">email </label>
							<input
								name="email"
								onChange={handleInputChange}
								type="text"
								className="input w-100"
								placeholder={
									socialLinks ? socialLinks.instagram : ''
								}
							/>
							<label htmlFor="number">number </label>
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
								onClick={updateSocialMediaLink}
							>
								Save
							</button>
						</div>
					</form>
				</div>
				<div className="messages-grid-container">
					<div className="messages-title-container">
						<h2 className="center">from users</h2>
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
										<article
											key={_id}
											className="user-message"
										>
											<div className="message-header">
												<div>
													<p>
														<span>
															<strong>
																{user_Fname}
															</strong>
														</span>{' '}
														{'  '}
														<span>
															<strong>
																{user_Lname}
															</strong>
														</span>
													</p>

													<p className="email">
														{' '}
														<strong>
															<a
																href={`mailto:${user_email}`}
															>
																<i>
																	{' '}
																	{user_email}
																</i>
															</a>
														</strong>
													</p>
												</div>
												<div
													onClick={() => {
														handleDeleteMessage(
															_id,
														);
													}}
													className="message-delete-icon "
													style={{
														color: 'orangered',
													}}
												>
													<Grid x={1}>
														<DeleteIcon />
													</Grid>
												</div>
											</div>

											<p className="message-content">
												{message}
											</p>
										</article>
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
