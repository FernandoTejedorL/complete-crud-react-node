import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const User = () => {
	const [users, setUsers] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		fetchUserById(setUsers, id);
	}, [id]);

	//email unico por usuario error (409)

	return (
		<div>
			<h1>USER</h1>
			{users.error && <h2>USER NOT FOUND</h2>}
			{!users && <p>Loading</p>}
			{users && <h2>Name: {users.name}</h2>}
			{users && <h2>Email: {users.email}</h2>}

			<form onSubmit={event => updateUser(id, event, setUsers)} action=''>
				<div>
					<span>New Name</span>
					<input type='text' name='name' defaultValue={users.name} />
				</div>
				<div>
					<span>New email</span>
					<input type='email' name='email' defaultValue={users.email} />
				</div>
				<button type='submit'>Edit User</button>
			</form>
			<button onClick={() => deleteUser(id, navigate)}>Delete User</button>
			<Link to='/'>
				<button>Back to users</button>
			</Link>
		</div>
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

const updateUser = async (id, event, setUsers) => {
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
