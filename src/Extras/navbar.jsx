import React from "react";
import styled from "styled-components";

const Nav = styled.div`
	background-color: #f8c702;
	height: 65px;
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
`;

const Logo = styled.img`
	width: 40px;
	margin-left: 240px;
	display: block;
`;

const Title = styled.span`
	color: #8c383e;
	font-size: 1.4rem;
	font-weight: 500;
	font-family: Poppins;
	margin-left: 5px;
`;

const Navbar = () => {
	return (
		<Nav>
			<Logo src="../src/assets/images/cit.png" alt="CIT Logo" />
			<Title>Inventory Management Portal</Title>
		</Nav>
	);
};

export default Navbar;
