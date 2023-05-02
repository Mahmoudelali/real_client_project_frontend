import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Cookies from 'js-cookie';
import Switcher from '../components/Switcher.jsx';

const Product = ({
	setEditViewExpanded,
	editViewExpanded,
	image,
	_id,
	category,
	review,
	state,
	description,
	price,
	condition,

	title,
	getAllProducts,
	onPage,
}) => {
	const nodeEnv = process.env.REACT_APP_URL;
	const handleDeleteProduct = () => {
		axios
			.delete(`${nodeEnv}/products/delete/${_id}`, {
				headers: {
					auth_token: Cookies.get('auth_token'),
				},
			})
			.then((res) => {
				console.log(res);
				getAllProducts();
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	return (
		<tr style={{ paddingTop: '30px' }}>
			<td style={{ color: 'GrayText' }}>{title}</td>
			<td
				style={{
					width: '100px',
					height: '70px',
					padding: 0,
				}}
				className="dash-image-container"
			>
				<img
					style={{
						maxWidth: '100%',
						height: '100%',
						objectFit: 'contain',
					}}
					src={`http://localhost:5000/${image}`}
					alt="img"
				/>
			</td>
			<td>{price}</td>
			<td>{condition}</td>
			<td>
				<Switcher
					onPage={onPage}
					getAllProducts={getAllProducts}
					_id={_id}
				/>
			</td>
			<td>{onPage ? 'Visible' : 'Hidden'}</td>
			<td style={{ color: 'GrayText' }}>
				<strong>{!state ? 'not specified' : 'state'}</strong>
			</td>

			<td>
				<button className="btn edit-icon" style={{ background: 0 }}>
					<NavLink
						to={`http://localhost:5173/admin/dashboard/products/${_id}`}
					>
						<Grid item xs={1}>
							<EditIcon />
						</Grid>
					</NavLink>
				</button>
			</td>
			<td>
				<button
					className="btn delete-icon"
					onClick={handleDeleteProduct}
				>
					<Grid x={1}>
						<DeleteIcon />
					</Grid>
				</button>
			</td>
		</tr>
	);
};

export default Product;
