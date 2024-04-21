import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Navbar from "../Extras/navbar";
import Sidebar from "../Extras/sidebar";
import ProfileDropdown from "../Extras/dropdown";
import Home from "./Home";

export default function addItems() {
  const navigate = useNavigate();
const [inputs, setInputs] = useState({
    itemDescription: "",
    propertyTag: "",
    accountablePerson: "",
    designation: "",
    quantity: "",
    unitCost: ""
});

// Function to handle input field changes
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
        ...inputs,
        [name]: value
    });
};

// Function to handle form submission
const handleSubmit = (e) => {   
    e.preventDefault();
    // Add your logic to handle form submission here
};
    return(
        <>
        <Navbar/>
        <Sidebar />
        <ProfileDropdown />
        <Home />
  <div class="container mx-auto ml-32 mt-8">
    <div class="container flex justify-center">
</div>
</div>
<form onSubmit={handleSubmit} className="container mx-auto mt-8 flex justify-center overflow-x-auto">
<div class="grid gap-6 mb-6 md:grid-cols-2"> 
                <input
                    type="text"
                    name="itemDescription"
                    value={inputs.itemDescription}
                    onChange={handleInputChange}
                    placeholder="Item Description"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />       
                <input
                    type="text"
                    name="propertyTag"
                    value={inputs.propertyTag}
                    onChange={handleInputChange}
                    placeholder="Property Tag"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="accountablePerson"
                    value={inputs.accountablePerson}
                    onChange={handleInputChange}
                    placeholder="Accountable Person"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="designation"
                    value={inputs.designation}
                    onChange={handleInputChange}
                    placeholder="Designation"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="quantity"
                    value={inputs.quantity}
                    onChange={handleInputChange}
                    placeholder="Quantity"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="unitCost"
                    value={inputs.unitCost}
                    onChange={handleInputChange}
                    placeholder="Unit Cost"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <div class="flex justify-center md:col-span-2">
                <button type="submit" 
                    className="bg-red-900 hover:bg-red-400 text-white font-bold py-2 px-20 rounded-full">
                    Add
                </button>
                </div>
                </div>
            </form>                        
        </>
    );
};

