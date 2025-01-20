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
	StyledTextInput,
	StyledUserCard
} from './user.styles';
import { deleteDataById, getDataById, updateDataById } from '../../utils/api';

const User = () => {
	const [users, setUsers] = useState([]);
	const [mailOk, setMailOk] = useState(true);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		fetchUserById(setUsers, id);
	}, [id]);

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
					<StyledTextInput type='text' name='name' defaultValue={users.name} />
				</StyledInputAndLabel>
				<StyledRerroredInput>
					<StyledInputAndLabel>
						<span>New email</span>
						<StyledTextInput
							type='email'
							name='email'
							defaultValue={users.email}
						/>
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
	const data = await getDataById(id);
	setUsers(data);
};

const updateUser = async (id, event, setUsers, setMailOk) => {
	event.preventDefault();
	const newUser = {
		name: event.target.name.value,
		email: event.target.email.value
	};
	const data = await updateDataById(id, newUser, setMailOk);
	setUsers(data);
};

const deleteUser = async (id, navigate) => {
	try {
		await deleteDataById(id);
		navigate('/');
	} catch (error) {
		console.log(error);
	}
};

export default User;
