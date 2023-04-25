import React from 'react';

const User = ({ phone, username, email, role, _id, country }) => {
	return (
		<tr style={{ paddingTop: '30px' }}>
			<td>{username}</td>
			<td>{country}</td>
			<td style={{ color: 'GrayText' }}>
				<a href={`mailto:${email}`}>{email}</a>
			</td>
			<td style={{ color: 'GrayText' }}>
				{role === 'admin'
					? 'admin'
					: role === 'user'
					? 'user'
					: 'Super Admin '}
			</td>
			<td style={{ color: 'GrayText' }}>{phone}</td>
			<td>{_id}</td>
		</tr>
	);
};

export default User;
