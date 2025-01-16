import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	StyledButton,
	StyledIcon,
	StyledUser,
	StyledUserCard
} from './home.styles';

const Home = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetchUsers(setUsers);
	}, []);
	return (
		<>
			<h1>Home</h1>
			<form onSubmit={event => createUser({ event })} action=''>
				<div>
					<input name='name' defaultValue={''} type='text' />
					<span>Name & Surname</span>
				</div>
				<div>
					<input name='email' defaultValue={''} type='email' />
					<span>email</span>
				</div>
				<button type='submit'>Join us</button>
			</form>
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
		</>
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

const createUser = async ({ event }) => {
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

		const data = await response.json;
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};

export default Home;
