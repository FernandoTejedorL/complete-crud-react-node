import styled from 'styled-components';
import { COLORS } from '../../styles/Colors';

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
	margin-top: 2rem;
	background-color: ${COLORS.darkGreen};
	color: ${COLORS.primary};
	border: 2px solid ${COLORS.lightGreen};
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
	gap: 2rem;
	border: 2px solid;
	margin: 4rem;
	padding: 2rem;
	border-radius: 1rem;
	background-color: ${COLORS.darkGreen};
	color: ${COLORS.primary};
	border: 2px solid ${COLORS.lightGreen};
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
	background-color: ${COLORS.lightGreen};
	color: ${COLORS.primary};
	border: none;

	@media (hover: hover) {
		&:hover {
			background-color: green;
			color: white;
		}
	}
`;

const StyledTextInput = styled.input`
	border-radius: 0.5rem;
	background-color: ${COLORS.lightGreen};
	border: none;
	padding: 0.5rem;
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
	StyledTextInput
};
