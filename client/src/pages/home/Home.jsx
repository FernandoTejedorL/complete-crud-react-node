import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	StyledButton,
	StyledForm,
	StyledIcon,
	StyledInputAndLabel,
	StyledMain,
	StyledUser,
	StyledUserCard
} from './home.styles';

const Home = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetchUsers(setUsers);
	}, []);
	return (
		<StyledMain>
			<h1>Home</h1>
			<StyledForm onSubmit={event => createUser(event, setUsers)} action=''>
				<StyledInputAndLabel>
					<input
						name='name'
						defaultValue={''}
						type='text'
						placeholder='Name & Surname'
					/>
					<span>Name & Surname</span>
				</StyledInputAndLabel>
				<StyledInputAndLabel>
					<input
						name='email'
						defaultValue={''}
						type='email'
						placeholder='mail@domain.com'
					/>
					<span>email</span>
				</StyledInputAndLabel>
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
	try {
		const response = await fetch('http://localhost:3000/api/users');
		const users = await response.json();
		setUsers(users);
	} catch (error) {
		console.log(error);
	}
};

const createUser = async (event, setUsers) => {
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

		const data = await response.json();
		setUsers(data);
	} catch (error) {
		console.log(error);
	}
};

export default Home;
