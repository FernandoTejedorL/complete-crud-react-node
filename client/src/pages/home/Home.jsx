import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	const [users, setUsers] = useState([]);
	const [newUser, setNewUser] = useState({ name: '', email: '' });

	useEffect(() => {
		fetchUsers(setUsers);
	}, []);
	return (
		<>
			<h1>Home</h1>
			<form action=''>
				<div>
					<input defaultValue={''} type='text' />
					<span>Name & Surname</span>
				</div>
				<div>
					<input defaultValue={''} type='email' />
					<span>email</span>
				</div>
				<button type='submit'>Join us</button>
			</form>
			{users.length === 0 && <h2>No Users</h2>}
			{users.map(user => (
				<div key={user.userId}>
					<h2>{user.name}</h2>
					<Link to={`/user/${user.userId}`}>
						<button>View user Info</button>
					</Link>
				</div>
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

const createUser = async ({ name, email }) => {
	const newUser = { newUser };
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

const newUser = ({ setNewUser, newName, newEmail }) => {
	setNewUser({ name: newName, email: newEmail });
};

export default Home;
