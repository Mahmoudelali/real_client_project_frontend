import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Cookies from 'js-cookie';
import Switcher from '../components/Switcher.jsx';
import { isLoading } from '../App.js';
import Swal from 'sweetalert2';

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
	const [Loading, setLoading] = useContext(isLoading);
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
					isLoading={Loading}
					setIsLoading={setLoading}
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
				<button className="btn" style={{ background: 0 }}>
					<NavLink
						style={{ color: 'gray' }}
						to={`http://localhost:5173/admin/dashboard/products/${_id}`}
					>
						<Grid item xs={1}>
							<EditIcon />
						</Grid>
					</NavLink>
				</button>
			</td>
			<td style={{ color: '#dc3545' }}>
				<button
					className="btn delete-icon"
					onClick={() => {
						setLoading(true);
						Swal.fire({
							title: 'Are you sure?',
							text: "You won't be able to revert this!",
							icon: 'warning',
							showCancelButton: true,
							confirmButtonColor: '#3085d6',
							cancelButtonColor: '#d33',
							confirmButtonText: 'delete !',
						}).then((result) => {
							if (result.isConfirmed) {
								handleDeleteProduct();
								Swal.fire(
									'Deleted!',
									'Your file has been deleted.',
									'success',
								);
							}
						});
					}}
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
