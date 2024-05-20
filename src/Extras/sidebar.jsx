import React from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
	background-color: #8c383e;
	width: 220px;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	`;

const Sidebar = ({ children }) => {
	return (
		<SidebarContainer>
			{children}
		</SidebarContainer>
	);
};

export default Sidebar;
