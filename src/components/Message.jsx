import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Grid } from '@mui/material';
import Swal from 'sweetalert2';

const Message = ({
	user_Fname,
	user_Lname,
	user_email,
	message,
	_id,
	handleDeleteMessage,
}) => {
	return (
		<article key={_id} className="user-message">
			<div className="message-header">
				<div>
					<p>
						<MailOutlineIcon
							style={{
								fontSize: '1rem',
								margin: ' 0 5px 5px 0',
								verticalAlign: 'middle',
							}}
						/>
						<span>
							<strong>{user_Fname}</strong>
						</span>{' '}
						{'  '}
						<span>
							<strong>{user_Lname}</strong>
						</span>
					</p>

					<p className="email">
						{' '}
						<strong>
							<a href={`mailto:${user_email}`}>
								<i> {user_email}</i>
							</a>
						</strong>
					</p>
				</div>
				<div
					onClick={() => {
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
								handleDeleteMessage(_id);
								Swal.fire(
									'Deleted!',
									'Your file has been deleted.',
									'success',
								);
							}
						});
					}}
					className="message-delete-icon "
					style={{
						color: 'orangered',
						cursor: 'pointer',
					}}
				>
					<Grid x={1}>
						<DeleteIcon />
					</Grid>
				</div>
			</div>
			<p className="message-content">{message}</p>
		</article>
	);
};

export default Message;
