import React, { useContext, useEffect, useState } from 'react';
import Loader from '../../components/Loader.jsx';

import Product from '../../components/Product.jsx';

import { NavLink, Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import Cookies from 'js-cookie';
import { isLoading } from '../../App.js';
const productTitles = [
	'Name',
	'Image',
	'Price',
	'condition',
	'Visible',
	'on_page',
	'Category',
	'Edit',
	'Delete',
];
const Products = () => {
	const [Loading, setLoading] = useContext(isLoading);

	const handleInputChange = (e) => {
		setProductData({ ...productData, [e.target.name]: e.target.value });
	};

	const nodeEnv = process.env.REACT_APP_URL;
	const [products, setProducts] = useState(null);
	// const [editViewExpanded, setEditViewExpanded] = useContext(windowExpand);
	const [productData, setProductData] = useState({});
	const [search, setSearch] = useState('');

	const getAllProducts = () => {
		axios
			.get(`${nodeEnv}/products/`, {
				headers: { auth_token: Cookies.get('auth_token') },
			})
			.then((res) => {
				console.log(res.data.docs);
				setProducts(res.data.docs);
				setLoading(false);
			});
	};
	useEffect(getAllProducts, []);

	return (
		// <windowExpand.Provider value={[editViewExpanded, setEditViewExpanded]}>
		<div className="products-container">
			{!products || Loading ? (
				<Loader isComponent={true} />
			) : (
				<div>
					<h2 className="title center">PRODUCTS</h2>
					<form style={{ marginBottom: '10px' }}>
						<input
							placeholder="Search"
							type="text"
							className="input"
							style={{
								width: '20%',
								display: 'block',
								margin: '0 auto',
							}}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
						/>
					</form>
					<table>
						<thead>
							<tr>
								{productTitles.map((title, index) => {
									return <th key={index}>{title}</th>;
								})}
							</tr>
						</thead>
						<tbody>
							{products ? (
								products
									.filter((user) => {
										return search.toLocaleLowerCase() === ''
											? user
											: user.title
													.toLowerCase()
													.includes(search) ||
													user.condition
														.toLowerCase()
														.includes(search) ||
													user.description
														.toLowerCase()
														.includes(search) ||
													user.state
														.toLowerCase()
														.includes(search);
									})
									.map(
										({
											title,
											price,
											image,
											_id,
											onPage,
											category,
											condition,
										}) => (
											<Product
												isLoading={Loading}
												setIsLoading={setLoading}
												// setEditViewExpanded={
												// 	setEditViewExpanded
												// }
												getAllProducts={getAllProducts}
												onPage={onPage ? onPage : null}
												key={_id}
												category={category}
												title={title}
												price={price}
												image={image}
												_id={_id}
												condition={condition}
											/>
										),
									)
							) : (
								<tr>
									<th colSpan={8}>
										No Products Found ,{' '}
										<NavLink to={'/admin/dashboard/add'}>
											Add some!
										</NavLink>
									</th>
								</tr>
							)}
						</tbody>
						<tfoot>
							<tr>
								<td
									style={{
										border: 0,
									}}
								>
									<NavLink to={'/admin/dashboard/add'}>
										<button
											className="btn"
											style={{
												all: 'unset',
												color: 'white',
											}}
										>
											<Grid item xs={1}>
												<AddIcon />
											</Grid>
											Add New Product
										</button>
									</NavLink>
								</td>

								<td colSpan={2} style={{ border: '0' }}>
									<span>
										<strong>Toatal</strong> :{' '}
										{products.length}
									</span>
								</td>
								<td colSpan={2} style={{ border: '0' }}>
									<strong>On Page</strong> :{' '}
									{
										products.filter((item) => {
											return item.onPage === true;
										}).length
									}
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
			)}
		</div>
	);
};

export default Products;
