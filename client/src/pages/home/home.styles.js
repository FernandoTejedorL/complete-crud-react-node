import styled from 'styled-components';

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

export { StyledIcon, StyledUserCard, StyledUser, StyledButton };
