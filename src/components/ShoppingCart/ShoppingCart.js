import React from 'react';
import './ShoppingCart.css';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';
function ShoppingCart({ products, onProductRemove }) {
	return (
		<div className="cart-modal">
			<div className="cart-shoppingCart">
				<div className="cart-header">
					<h2 className="cart-title">Shopping Cart</h2>
				</div>
				<div className="cart-products">
					{products.length === 0 && (
						<span className="cart-empty-text">
							Your basket is currently empty
						</span>
					)}
					{products.map((product) => (
						<div className="cart-product" key={product.id}>
							<div className="cart-image-container">
								<img
									src={product.imageURL}
									alt={product.name}
									className="cart-img"
								/>
							</div>
							<div className="cart-product-info">
								<h3 className="cart-h3title">{product.name}</h3>
								<span className="cart-product-price">
									{product.price}
									<i> $</i>
								</span>
							</div>
							<button
								className=" btn cart-btn cart-remove-btn"
								onClick={() => onProductRemove(product)}
							>
								<Grid>
									<DeleteIcon />
								</Grid>
							</button>

							<button className="btn cart-btn-order">
								<Link to="/orders">Order Now</Link>{' '}
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ShoppingCart;
