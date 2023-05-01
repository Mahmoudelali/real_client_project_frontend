import React, { useContext, useEffect, useState } from 'react';
import Loader from '../../components/Loader.jsx';

import Product from '../../components/Product.jsx';

import { NavLink, Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import Cookies from 'js-cookie';
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
	const handleInputChange = (e) => {
		setProductData({ ...productData, [e.target.name]: e.target.value });
	};

	const nodeEnv = process.env.REACT_APP_URL;
	const [products, setProducts] = useState(null);
	// const [editViewExpanded, setEditViewExpanded] = useContext(windowExpand);
	const [productData, setProductData] = useState({});

	const getAllProducts = () => {
		axios
			.get(`${nodeEnv}/products/`, {
				headers: { auth_token: Cookies.get('auth_token') },
			})
			.then((res) => {
				console.log(res.data.docs);
				setProducts(res.data.docs);
			});
	};
	useEffect(getAllProducts, []);

	return (
		// <windowExpand.Provider value={[editViewExpanded, setEditViewExpanded]}>
		<div className="products-container">
			{!products ? (
				<Loader />
			) : (
				<div>
					<h2 className="title center">PRODUCTS</h2>
					<table>
						<thead>
							<tr>
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
							<tr>
								{productTitles.map((title, index) => {
									return <th key={index}>{title}</th>;
								})}
							</tr>
						</thead>
						<tbody>
							{products ? (
								products.map(
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
							<tr>
								<td
									style={{
										backgroundColor: 'lightgray',
										border: 0,
									}}
									colSpan={9}
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
										</button>
									</NavLink>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default Products;
