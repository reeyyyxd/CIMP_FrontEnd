import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Extras/navbar";
import Sidebar from "../Extras/sidebar";
import ProfileDropdown from "../Extras/dropdown";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";


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
	const navigate = useNavigate();

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
				<ul class="space-y-2 mt-10 text-sm">
             <li>
                <NavLink to="/home">
					<a class="flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-gray-800 focus:bg-gray-800 focus:shadow-outline transform hover:-translate-y-1 transition-transform ease-in duration-150">
						<span class="text-white">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
						</svg>
						</span>
						<span>Recently Added</span>
					</a>
                </NavLink>
            </li>	
            <li>
                <NavLink to="/items">
					<a class="flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-gray-800 focus:bg-gray-800 focus:shadow-outline transform hover:-translate-y-1 transition-transform ease-in duration-200">
						<span class="text-white">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
						</svg>
						</span>
						<span>Inventory</span>
					</a>
                </NavLink>
            </li>
            <li>
				<NavLink to="/search">
					<a class="flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-gray-800 focus:bg-gray-800 focus:shadow-outline transform hover:-translate-y-1 transition-transform ease-in duration-200">
						<span class="text-white">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
						</svg>
						</span>
						<span>Search</span>
					</a>
				</NavLink>
            </li>
            <li>
				<NavLink to="/filter">
					<a class="flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-gray-800 focus:bg-gray-800 focus:shadow-outline transform hover:-translate-y-1 transition-transform ease-in duration-200">
						<span class="text-white">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
						</svg>
						</span>
						<span>Filter</span>
					</a>
				</NavLink>
            </li>
            <li>
				<NavLink to="/logs">
					<a class="flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-gray-800 focus:bg-gray-800 focus:shadow-outline transform hover:-translate-y-1 transition-transform ease-in duration-200">
						<span class="text-white">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
						</svg>
						</span>
						<span>Logs History</span>
					</a>
				</NavLink>
            </li>
            <li>
				<NavLink to="/request">
					<a class="flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-gray-800 focus:bg-gray-800 focus:shadow-outline transform hover:-translate-y-1 transition-transform ease-in duration-200">
						<span class=" text-white">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
						</svg>
						</span>
						<span>Request</span>
					</a>
				</NavLink>
            </li>
            <li>
				<NavLink to="/receive">
					<a class="flex items-center space-x-3 text-white p-2 rounded-md font-medium hover:bg-gray-800 focus:bg-gray-800 focus:shadow-outline transform hover:-translate-y-1 transition-transform ease-in duration-200">
						<span class="text-white">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z" />
						</svg>
						</span>
						<span>Receive</span>
					</a>
				</NavLink>
            </li>    
        </ul>
		</Sidebar>
		</div>
	);	
}
