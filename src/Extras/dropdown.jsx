import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const DropdownContent = styled.div`
	position: absolute;
	top: 100%;
	left: 10px;
	background-color: #e1e1e1;
	border-radius: 3px;
	padding: 10px 60px 10px 0;
	opacity: 90%;
	width: max-content;
`;

const Tab = styled.div`
	width: 130%;
	font-family: Poppins;
	color: black;
	padding: 5px;
	cursor: pointer;
	display: flex;
	align-items: center;
	margin-left: 10px;

	&:hover {
		background-color: #ccc;
	}
`;

const ProfileDropdown = ({ isOpen, handleTabClick, user, setUser }) => {

	const logout = () => {
		setUser(null);
	}

	return (
		isOpen && (
			<DropdownContent>
				<Tab onClick={() => handleTabClick("profile")}>
					<FontAwesomeIcon icon={faUser} style={{ color: "#8C383E", fontSize: "15px" }} />
					<span style={{ marginLeft: "15px", fontSize: "13px", fontWeight: "500" }}>Profile</span>
				</Tab>
				<Tab onClick={ logout }>
					<FontAwesomeIcon icon={faSignOutAlt} style={{ color: "#8C383E", fontSize: "15px" }} />
					<span style={{ marginLeft: "15px", fontSize: "13px", fontWeight: "500" }}>Log Out</span>
				</Tab>
			</DropdownContent>
		)
	);
};

export default ProfileDropdown;
