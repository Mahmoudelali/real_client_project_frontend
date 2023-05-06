import React, { useEffect, useState } from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
import brandImage from '../../images/khizanaWhite.png';
import axios from 'axios';
import Loader from '../Loader';

//icons
import { Grid } from '@mui/material';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { hover } from '@testing-library/user-event/dist/hover';

function Footer() {
	const nodeEnv = process.env.REACT_APP_URL;
	const [links, setLinks] = useState(null);

	const getSocialLinks = () => {
		axios
			.get(`${nodeEnv}/socialmedia/`)
			.then((response) => {
				setLinks(response.data.docs[0]);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	useEffect(getSocialLinks, []);
	return (
		<footer className="footer-container">
			<div className="brand-image-container">
				<img src={brandImage} alt="brand" />
			</div>
			<div className="contact-links-container">
				<article>
					<Grid sx={{ display: 'inline', verticalAlign: 'middle'}}>
						<AlternateEmailIcon />
					</Grid>

					{!links ? (
						<Loader border={'5px dotted #fff'} />
					) : (
						<a href={`mailto:${links.email}`}>{links.email}</a>
					)}
				</article>

				<article>
					<Grid sx={{ display: 'inline', verticalAlign: 'middle' }}>
						<LocalPhoneIcon />
					</Grid>
					<a>
						{!links ? (
							<Loader border={'5px dotted #fff'} />
						) : (
							links.number
						)}
					</a>
				</article>
				<div className="social-media-links">
					<article>
						{!links ? (
							<Loader border={'5px dotted #fff'} />
						) : (
							<NavLink to={links.instagram}>
								<FaInstagram />
							</NavLink>
						)}
					</article>
					<article>
						{!links ? (
							<Loader border={'5px dotted #fff'} />
						) : (
							<NavLink to={links.facebook}>
								<FaFacebook />
							</NavLink>
						)}
					</article>
					<article>
						{!links ? (
							<Loader border={'5px dotted #fff'} />
						) : (
							<NavLink to={links.whatsapp}>
								<FaWhatsapp />
							</NavLink>
						)}
					</article>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
