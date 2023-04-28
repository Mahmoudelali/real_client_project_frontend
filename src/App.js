import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// components
import Home from './pages/home/Home.jsx';
import Categories from './pages/category/Categories.jsx';
import SubCategories from './pages/category/SubCategories.jsx';
import ContactUs from './pages/contact-us/Contact-us.jsx';
import Instruction from './pages/instruction/Instruction.jsx';
import Orders from './pages/order/Orders.jsx';
import Profile from './pages/Profile/Profile.jsx';

import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Users from './pages/Dashboard/Users.jsx';
import Admins from './pages/Dashboard/Admins.jsx';
import Products from './pages/Dashboard/Products.jsx';
import Settings from './pages/Dashboard/Settings.jsx';
import AboutUs from './pages/about-us/About-us.jsx';
import Cart from './pages/cart/Cart.jsx';
import DashHome from './pages/Dashboard/DashHome';
import Pending from './pages/Dashboard/Pending.jsx';
import Register from './components/register/Register';
import Login from './components/login/Login';
import axios from 'axios';
import cookie from 'react-cookies';
import Main from './pages/main/Main';

export const SidebarStatus = React.createContext();
export const isLoggedIn = React.createContext();

function App() {
	const [sidebarExpanded, setSidebarExpanded] = useState(
		window.screen.width > 468 ? true : false,
	);

	const [loggedIn, setLoggedIn] = useState(false);

	const userIsLoggedIn = () => {
		axios
			.get(`${process.env.REACT_APP_URL}/user/is-logged-in`, {
				headers: { auth_token: cookie.load('auth_token') },
			})
			.then((response) => {
				if (response.status === 200) {
					setLoggedIn(true);
				}
			})
			.catch((error) => {
				if (error.response === undefined) {
					setLoggedIn(false);
				} else {
					setLoggedIn(false);
				}
			});
	};

	useEffect(() => {
		userIsLoggedIn();
	}, []);

	return (
		<div className="App">
			<isLoggedIn.Provider value={[loggedIn, setLoggedIn]}>
				<SidebarStatus.Provider
					value={[sidebarExpanded, setSidebarExpanded]}
				>
					<BrowserRouter>
						<Routes>
							{/* home routes */}
							<Route path="/" element={<Home />}>
								<Route path="/" element={<Main />} />
								<Route
									path="/register"
									element={<Register />}
								/>
								<Route path="/login" element={<Login />} />
								<Route path="/about" element={<AboutUs />} />
								<Route
									path="/categories"
									element={<Categories />}
								>
									<Route
										path="/categories/category"
										element={<SubCategories />}
									/>
								</Route>
								<Route
									path="/contact"
									element={<ContactUs />}
								/>
								<Route
									path="/instructions"
									element={<Instruction />}
								/>
								<Route path="/orders" element={<Orders />} />
								<Route path="/profile" element={<Profile />} />
								<Route path="/cart" element={<Cart />} />
							</Route>

							{/* Dashboard routes */}
							<Route
								path="/admin/dashboard"
								element={<Dashboard />}
							>
								<Route
									exact
									path="/admin/dashboard/"
									element={<DashHome />}
								></Route>
								<Route
									path="/admin/dashboard/settings"
									element={<Settings />}
								></Route>
								<Route
									path="/admin/dashboard/products"
									element={<Products />}
								></Route>
								<Route
									path="/admin/dashboard/admins"
									element={<Admins />}
								></Route>
								<Route
									path="/admin/dashboard/users"
									element={<Users />}
								></Route>
								<Route
									path="/admin/dashboard/pending"
									element={<Pending />}
								></Route>
							</Route>
						</Routes>
					</BrowserRouter>
				</SidebarStatus.Provider>
			</isLoggedIn.Provider>
		</div>
	);
}

export default App;
