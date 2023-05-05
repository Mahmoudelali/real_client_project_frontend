import React from 'react';
import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import './contact-us.css';

//icon
import Loader from '../../components/Loader';
import Grid from 'antd/es/card/Grid';
import Link from 'antd/es/typography/Link';
import Cookies from 'js-cookie';

const ContactUs = () => {
	const nodeEnv = process.env.REACT_APP_URL;
	const [links, setLinks] = useState(null);
	const userData = JSON.parse(Cookies.get('user'));
	const [message, setMessage] = useState({});
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				'service_m99ggko',
				'template_2ieqq6c',
				form.current,
				'Ani8vvPy_gOoeacm_',
			)
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
				},
			);
		e.target.reset();
	};
	const handleSendMessage = (e) => {
		e.preventDefault();
		axios
			.post(`${nodeEnv}/message/`, message, {
				headers: {
					auth_token: Cookies.get('auth_token'),
				},
			})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	const handleInputChange = (e) => {
		setMessage({ ...message, [e.target.name]: e.target.value });
		console.log(message);
	};

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
		<div>
			<div className="contact-container">
				<h1 className="contact-title">Contact Us</h1>
				<p className="contact-paragraph">
					Any questions or remarks? Just write us a Message! <br></br>
				</p>
				<div className="contact-contact-box">
					<div className="contact-contact-left">
						<h3 className="contact-h3">Contact Information</h3>
						<table>
							<tr className="contact-tr">
								<td className="contact-td">
									<Grid
										sx={{
											display: 'inline',
											verticalAlign: 'middle',
										}}
									>
										<FaEnvelope />
									</Grid>
								</td>
								<td className="contact-td">
									{' '}
									{!links ? (
										<Loader border={'5px dotted #fff'} />
									) : (
										<a href={`mailto:${links.email}`}>
											{links.email}
										</a>
									)}
								</td>
							</tr>
							<tr className="contact-tr">
								<td className="contact-td">
									<Grid
										sx={{
											display: 'inline',
											verticalAlign: 'middle',
										}}
									>
										<FaPhone />
									</Grid>
								</td>
								<td className="contact-td">
									{' '}
									{!links ? (
										<Loader border={'5px dotted #fff'} />
									) : (
										<>{links.number}</>
									)}
								</td>
							</tr>
						</table>
					</div>
					<div className="contact-contact-right">
						<h3 className="contact-h3">Send Your Message</h3>
						<form ref={form} onSubmit={sendEmail}>
							<div className="contact-input-row">
								<div className="contact-input-group">
									<label className="contact-label">
										First Name
									</label>
									<input
										onChange={handleInputChange}
										type="text"
										placeholder="First Name"
										className="contact-input"
										name="user_Fname"
									/>
								</div>
								<div className="contact-input-group">
									<label className="contact-label">
										Last Name
									</label>
									<input
										onChange={handleInputChange}
										type="text"
										placeholder="Last Name "
										className="contact-input"
										name="user_Lname"
									/>
								</div>
							</div>
							<div className="contact-input-row">
								<div className="contact-input-group">
									<label className="contact-label">
										Phone
									</label>
									<input
										onChange={handleInputChange}
										className="contact-input"
										type="text"
										placeholder={userData.phone}
										name="phone"
									/>
								</div>
								<div className="contact-input-group">
									<label className="contact-label">
										Email
									</label>
									<input
										onChange={handleInputChange}
										className="contact-input"
										type="text"
										placeholder={userData.email}
										name="user_email"
									/>
								</div>
							</div>
							<label className="contact-label">Message</label>
							<textarea
								onChange={handleInputChange}
								className="contact-area"
								name="message"
								rows="5"
								placeholder="Your Message"
							></textarea>

							<button
								className="contact-button"
								onClick={handleSendMessage}
							>
								Send
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
