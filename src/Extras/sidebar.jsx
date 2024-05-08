import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const SidebarContainer = styled.div`
	background-color: ${({ isOpen }) => (isOpen ? "#8c383e" : "transparent")};
	width: ${({ isOpen }) => (isOpen ? "220px" : "0px")};
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	overflow-x: hidden;
	transition: width 0.3s ease, background-color 0.3s ease;
`;


const SidebarToggle = styled.div`
	position: absolute;
	top: 20px;
	left: ${({ isOpen }) => (isOpen ? "220px" : "20px")};
	color: white;
	font-size: 24px;
	cursor: pointer;
	transition: left 0.3s ease;
`;

const SidebarContent = styled.div`
	padding-top: 20px;
`;

const Sidebar = ({ children }) => {
	const [isOpen, setIsOpen] = useState(true);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<SidebarToggle isOpen={isOpen} onClick={toggleSidebar}>
				<FontAwesomeIcon icon={faBars} />
			</SidebarToggle>
			<SidebarContainer isOpen={isOpen}>
				<SidebarContent>
					{children}
				</SidebarContent>
			</SidebarContainer>
		</>
	);
};

export default Sidebar;
