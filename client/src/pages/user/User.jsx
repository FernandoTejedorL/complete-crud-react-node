import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const User = () => {
	const [users, setUsers] = useState([]);
	const { id } = useParams();
	console.log(id);

	useEffect(() => {
		fetchUserById(setUsers, id);
	}, [id]);

	return (
		<div>
			<h1>USER</h1>
			{!users && <p>Loading</p>}
			{users && <h2>Name: {users.name}</h2>}
			{users && <h2>Email: {users.email}</h2>}

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

export default User;
