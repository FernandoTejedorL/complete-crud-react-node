const URL = 'http://localhost:3000';
const API_URL = '/api/users/';

const getAllData = async () => {
	const response = await fetch(URL + API_URL);
	const data = await response.json();
	return data;
};

const getDataById = async id => {
	const response = await fetch(URL + API_URL + id);
	const users = await response.json();
	return users;
};

const createData = async (newUser, setMailOk) => {
	try {
		const response = await fetch(URL + API_URL, {
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
		return data;
	} catch (error) {
		console.log(error);
	}
};

const deleteDataById = async id => {
	try {
		const response = await fetch(URL + API_URL + id, {
			method: 'DELETE'
		});

		await response.json();
	} catch (error) {
		console.log(error);
	}
};

const updateDataById = async (id, newUser, setMailOk) => {
	try {
		const response = await fetch(URL + API_URL + id, {
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
		return data;
	} catch (error) {
		console.log(error);
	}
};

export { getAllData, getDataById, createData, deleteDataById, updateDataById };
