import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "../Extras/navbar";
import Sidebar from "../Extras/sidebar";
import ProfileDropdown from "../Extras/dropdown";
import Home from "./Home";

export default function addItems() {
  /*const navigate = useNavigate();
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
};*/
  const [formData, setFormData] = useState({
    accPerson: "",
    department: "",
    designation: "",
    invoiceNumber: "",
    invoiceDate: "",
    issueOrder: "",
    lifespan: "",
    quantity: "",
    remarks: "",
    status: "",
    supplier: "",
    totalCost: "",
    unitCost: "",
    unitOfMeasurement: "",
    description : {
        name: "",
        model: "",
        serialNumber: "",
        type: "",
        other: ""
    },
    location : {
        building: "",
        room: ""
    }

  });

//   const handleChange = event => {
//     const { name, value } = event.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };
const handleChange = event => {
    const { name, value } = event.target;
  
    // If the name contains dot notation (indicating a nested object property)
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.'); // Split the name into parent and child keys
      setFormData(prevState => ({
        ...prevState,
        [parentKey]: {
          ...prevState[parentKey],
          [childKey]: value // Update the nested object property value
        }
      }));
    } else {
      // If it's not a nested object property, update normally
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/item/insertItem', formData);
      // Optionally, you can handle success response or navigate to another page
      window.alert('Data inserted successfully');
      console.log('Data inserted successfully');
      setFormData({
        accPerson: "",
        department: "",
        designation: "",
        invoiceNumber: "",
        invoiceDate: "",
        issueOrder: "",
        lifespan: "",
        quantity: "",
        remarks: "",
        status: "",
        supplier: "",
        totalCost: "",
        unitCost: "",
        unitOfMeasurement: "",
        description : {
            name: "",
            model: "",
            serialNumber: "",
            type: "",
            other: ""
        },
        location : {
            building: "",
            room: ""
        }
      });
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

    return(
        <>
        <Navbar/>
        <Sidebar />
        <ProfileDropdown />
        <Home />
<form onSubmit={handleSubmit} className="container mx-auto mt-32 flex justify-center overflow-x-auto">
<div class="grid gap-6 mb-6 md:grid-cols-4"> 
                <input
                    type="text"
                    name="accPerson"
                    value={formData.accPerson}
                    onChange={handleChange}
                    placeholder="Accountable Person"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />       
                <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Department"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Designation"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleChange}
                    placeholder="Invoice Number"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="invoiceDate"
                    value={formData.invoiceDate}
                    onChange={handleChange}
                    placeholder="Invoice Date"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="issueOrder"
                    value={formData.issueOrder}
                    onChange={handleChange}
                    placeholder="Issue Order"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="lifespan"
                    value={formData.lifespan}
                    onChange={handleChange}
                    placeholder="Lifespan"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Remarks"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    placeholder="Status"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    placeholder="Supplier"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="totalCost"
                    value={formData.totalCost}
                    onChange={handleChange}
                    placeholder="Total Cost"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="unitCost"
                    value={formData.unitCost}
                    onChange={handleChange}
                    placeholder="Unit Cost"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="unitOfMeasurement"
                    value={formData.unitOfMeasurement}
                    onChange={handleChange}
                    placeholder="Unit of Measurement"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="description.name"
                    value={formData.description.name}
                    onChange={handleChange}
                    placeholder="Description Name"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="description.model"
                    value={formData.description.model}
                    onChange={handleChange}
                    placeholder="Description Model"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="description.serialNumber"
                    value={formData.description.serialNumber}
                    onChange={handleChange}
                    placeholder="Description Serial Number"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="description.type"
                    value={formData.description.type}
                    onChange={handleChange}
                    placeholder="Description Type"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="description.other"
                    value={formData.description.other}
                    onChange={handleChange}
                    placeholder="Description Other"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="location.building"
                    value={formData.location.building}
                    onChange={handleChange}
                    placeholder="Location Building"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="location.room"
                    value={formData.location.room}
                    onChange={handleChange}
                    placeholder="Location Room"
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
