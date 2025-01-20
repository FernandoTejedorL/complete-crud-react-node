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

export { getAllData, getDataById, deleteDataById };
