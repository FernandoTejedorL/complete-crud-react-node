import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
	StyledButton,
	StyledButtonsContainer,
	StyledDeleteButton,
	StyledErrorMessage,
	StyledForm,
	StyledIcon,
	StyledInputAndLabel,
	StyledMain,
	StyledRerroredInput,
	StyledUserCard
} from './user.styles';

const User = () => {
	const [users, setUsers] = useState([]);
	const [mailOk, setMailOk] = useState(true);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		fetchUserById(setUsers, id);
	}, [id]);

	//email unico por usuario error (409)

	return (
		<StyledMain>
			<h1>USER</h1>
			<StyledUserCard>
				{users.error && <h2>USER NOT FOUND</h2>}
				{!users && <p>Loading</p>}
				{users && (
					<>
						<StyledIcon src='/assets/images/user-icon.png' alt='' />
						<h2>Name: {users.name}</h2>
						<h2>Email: {users.email}</h2>
					</>
				)}
			</StyledUserCard>

			<StyledForm
				onSubmit={event => updateUser(id, event, setUsers, setMailOk)}
				action=''
			>
				<StyledInputAndLabel>
					<span>New Name</span>
					<input type='text' name='name' defaultValue={users.name} />
				</StyledInputAndLabel>
				<StyledRerroredInput>
					<StyledInputAndLabel>
						<span>New email</span>
						<input type='email' name='email' defaultValue={users.email} />
					</StyledInputAndLabel>
					{!mailOk && (
						<StyledErrorMessage>
							This mail has already been used
						</StyledErrorMessage>
					)}
				</StyledRerroredInput>
				<StyledButton type='submit'>Edit User</StyledButton>
			</StyledForm>
			<StyledButtonsContainer>
				<StyledDeleteButton onClick={() => deleteUser(id, navigate)}>
					Delete User
				</StyledDeleteButton>
				<Link to='/'>
					<StyledButton>Back to users</StyledButton>
				</Link>
			</StyledButtonsContainer>
		</StyledMain>
	);
};

const fetchUserById = async (setUsers, id) => {
	try {
		const response = await fetch(`http://localhost:3000/api/users/${id}`);
		const users = await response.json();
		setUsers(users);
	} catch (error) {
		console.log(error);
	}
};

const updateUser = async (id, event, setUsers, setMailOk) => {
	event.preventDefault();
	const newUser = {
		name: event.target.name.value,
		email: event.target.email.value
	};
	try {
		const response = await fetch(`http://localhost:3000/api/users/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(newUser),
			headers: { 'Content-Type': 'application/json' }
		});
		if (!response.ok) {
			setMailOk(false);
		} else {
			setMailOk(true);
		}

		const data = await response.json();
		setUsers(data);
	} catch (error) {
		console.log(error);
	}
};

const deleteUser = async (id, navigate) => {
	try {
		const response = await fetch(`http://localhost:3000/api/users/${id}`, {
			method: 'DELETE'
		});

		await response.json();
		navigate('/');
	} catch (error) {
		console.log(error);
	}
};

export default User;
