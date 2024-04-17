import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../navbar";
import Sidebar from "../sidebar";
import ProfileDropdown from "../dropdown";
import styled from "styled-components";

const ProfileContainer = styled.div`
	display: flex;
	align-items: center;
	margin-top: 10px;
	margin-left: 10px;
`;

const Image = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	border: none;
	object-fit: cover;
	margin-left: 15px;
`;

const ProfileText = styled.div`
	margin-left: 10px;
	color: white;
	font-family: Poppins;
	font-size: 12px;
	line-height: 3px;
`;

const DropdownContainer = styled.div`
	position: relative;
	margin-left: 10px;
	cursor: pointer;
`;

function Home() {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const handleTabClick = (tab) => {
		// Handle tab click
	};

	return (
		<div>
			<Navbar />
			<Sidebar>
				<ProfileContainer>
					<Image src="src/assets/xx.jpg" alt="Profile" />
					<ProfileText>
						<p>Jobeth Cala</p>
						<p style={{ fontSize: "10px", marginLeft: "1px" }}>PCO-Staff</p>
					</ProfileText>
					<DropdownContainer onClick={toggleDropdown}>
						<FontAwesomeIcon
							icon={faCaretDown}
							style={{ marginLeft: "5px", color: "white", fontSize: "12px" }}
						/>
						<ProfileDropdown
							isOpen={dropdownOpen}
							handleTabClick={handleTabClick}
						/>
					</DropdownContainer>
				</ProfileContainer>
			</Sidebar>
		</div>
	);
}

export default Home;