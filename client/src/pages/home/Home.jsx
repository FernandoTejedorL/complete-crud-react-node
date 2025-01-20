import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	StyledButton,
	StyledErrorMessage,
	StyledForm,
	StyledIcon,
	StyledInputAndLabel,
	StyledMain,
	StyledRerroredInput,
	StyledTextInput,
	StyledUser,
	StyledUserCard
} from './home.styles';
import { getAllData } from '../../utils/api';

const Home = () => {
	const [users, setUsers] = useState([]);
	const [mailOk, setMailOk] = useState(true);
	useEffect(() => {
		fetchUsers(setUsers);
	}, []);
	return (
		<StyledMain>
			<h1>Home</h1>
			<StyledForm
				onSubmit={event => createUser(event, setUsers, setMailOk)}
				action=''
			>
				<StyledInputAndLabel>
					<StyledTextInput
						name='name'
						defaultValue={''}
						type='text'
						placeholder='Name & Surname'
						required
					/>
					<span>Name & Surname</span>
				</StyledInputAndLabel>
				<StyledRerroredInput>
					<StyledInputAndLabel>
						<StyledTextInput
							name='email'
							defaultValue={''}
							type='email'
							placeholder='mail@domain.com'
							required
						/>
						<span>email</span>
					</StyledInputAndLabel>
					{!mailOk && (
						<StyledErrorMessage>
							This mail has already been used
						</StyledErrorMessage>
					)}
				</StyledRerroredInput>
				<StyledButton type='submit'>Join us</StyledButton>
			</StyledForm>
			<div>
				{users.length === 0 && <h2>No Users</h2>}
				{users.map(user => (
					<StyledUserCard key={user.userId}>
						<StyledUser>
							<StyledIcon src='/assets/images/user-icon.png' alt='' />
							<h2>{user.name}</h2>
						</StyledUser>
						<Link to={`/user/${user.userId}`}>
							<StyledButton>View user Info</StyledButton>
						</Link>
					</StyledUserCard>
				))}
			</div>
		</StyledMain>
	);
};

const fetchUsers = async setUsers => {
	const data = await getAllData();
	setUsers(data);
};

const createUser = async (event, setUsers, setMailOk) => {
	event.preventDefault();
	const newUser = {
		name: event.target.name.value,
		email: event.target.email.value
	};
	try {
		const response = await fetch('http://localhost:3000/api/users', {
			method: 'POST',
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

export default Home;
