import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Extras/navbar";
import Sidebar from "../Extras/sidebar";
import ProfileDropdown from "../Extras/dropdown";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HistoryIcon from '@mui/icons-material/History';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';


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
	line-height: 1.5; /* Adjusted line height */
`;

const DropdownContainer = styled.div`
	position: relative;
	margin-left: 10px;
	cursor: pointer;
`;

export default function Home( {user, setUser} ) {
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
					<Image src="../src/assets/images/MasterBaiter.jpg" alt="Profile" />
					<ProfileText>
						<p style={{ marginTop: "10px" }}>{user.fname} {user.lname}</p>
						<p style={{ fontSize: "10px", marginTop: "12px",}}>{user.type}</p>
				  </ProfileText>
					<DropdownContainer onClick={toggleDropdown}>
						<FontAwesomeIcon
							icon={faCaretDown}
							style={{ marginLeft: "5px", color: "white", fontSize: "12px" }}
						/>
						<ProfileDropdown
							isOpen={dropdownOpen}
							handleTabClick={handleTabClick}
							user={user}
							setUser={setUser}
						/>		
					</DropdownContainer>
				</ProfileContainer>			

				{user.type === "admin" || user.type === "Admin" ? (
					<ul className="space-y-2 mt-10 text-sm">
						<li>
							<NavLink to="/dashboard" className="flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-gray-800 focus:bg-gray-800 focus:shadow-outline transform hover:-translate-y-1 transition-transform ease-in duration-200">
							<DashboardIcon /> 
								<span>Dashboard</span>
							</NavLink>
						</li>	
						<li>
							<NavLink to="/items" className="flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-gray-800 focus:bg-gray-800 focus:shadow-outline transform hover:-translate-y-1 transition-transform ease-in duration-200">
								<InventoryIcon />
								<span>Inventory</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/search" className="flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-gray-800 focus:bg-gray-800 focus:shadow-outline transform hover:-translate-y-1 transition-transform ease-in duration-200">
								<SearchIcon />
								<span>Search</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/filter" className="flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-gray-800 focus:bg-gray-800 focus:shadow-outline transform hover:-translate-y-1 transition-transform ease-in duration-200">
								<FilterAltIcon />
								<span>Filter</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/logs" className="flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-gray-800 focus:bg-gray-800 focus:shadow-outline transform hover:-translate-y-1 transition-transform ease-in duration-200">
								<HistoryIcon />
								<span>Logs History</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/request" className="flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-gray-800 focus:bg-gray-800 focus:shadow-outline transform hover:-translate-y-1 transition-transform ease-in duration-200">
								<RequestPageIcon />
								<span>Request</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/receive" className="flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-gray-800 focus:bg-gray-800 focus:shadow-outline transform hover:-translate-y-1 transition-transform ease-in duration-200">
								<MarkAsUnreadIcon />
								<span>Receive</span>
							</NavLink>
						</li>    
        			</ul>
				) : (
					<ul className="space-y-2 mt-10 text-sm">
						<li>
							<NavLink to="/dashboard" className="flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-gray-800 focus:bg-gray-800 focus:shadow-outline transform hover:-translate-y-1 transition-transform ease-in duration-200">
							<DashboardIcon /> 
								<span>Dashboard</span>
							</NavLink>
						</li>	
						<li>
							<NavLink to="/items" className="flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-gray-800 focus:bg-gray-800 focus:shadow-outline transform hover:-translate-y-1 transition-transform ease-in duration-200">
							<InventoryIcon />
								<span>Inventory</span>
							</NavLink>
						</li>
					</ul>
				)}
			</Sidebar>
		</div>
	);	
}
