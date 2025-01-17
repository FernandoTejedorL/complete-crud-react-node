import styled from 'styled-components';

const StyledMain = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-block: 2rem;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 2rem;
	border: 2px solid;
	border-radius: 1rem;
`;

const StyledRerroredInput = styled.div`
	display: flex;
	flex-direction: column;
`;

const StyledInputAndLabel = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: space-between;
	gap: 1rem;
`;

const StyledErrorMessage = styled.span`
	font-size: 1rem;
	color: red;
`;

const StyledIcon = styled.img`
	height: 40px;
	width: 40px;
`;

const StyledUserCard = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	border: 2px solid;
	margin: 4rem;
	padding: 2rem;
	border-radius: 1rem;
`;

const StyledUser = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 2rem;
`;

const StyledButton = styled.button`
	width: 100%;
	display: flex;
	justify-content: center;
	border-radius: 1rem;
	padding-block: 1rem;
`;

const StyledButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 80%;
	margin-top: 2rem;
`;

const StyledDeleteButton = styled.button`
	width: 50%;
	display: flex;
	justify-content: center;
	border-radius: 1rem;
	padding-block: 1rem;
	color: white;
	background-color: red;
`;

export {
	StyledIcon,
	StyledUserCard,
	StyledUser,
	StyledButton,
	StyledMain,
	StyledForm,
	StyledInputAndLabel,
	StyledErrorMessage,
	StyledRerroredInput,
	StyledButtonsContainer,
	StyledDeleteButton
};
