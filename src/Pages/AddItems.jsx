import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "../Extras/navbar";
import Sidebar from "../Extras/sidebar";
import ProfileDropdown from "../Extras/dropdown";
import Home from "./Home";

export default function addItems() {
    const navigate = useNavigate();

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



const handleChange = event => {
    const { name, value } = event.target;

    if (name === 'quantity' || name === 'unitCost') {
        const quantity = name === 'quantity' ? value : formData.quantity;
        const unitCost = name === 'unitCost' ? value : formData.unitCost;
        const totalCost = parseFloat(quantity) * parseFloat(unitCost);

        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            totalCost: totalCost.toString()
        }));
    } else if (name.includes('.')) {
        const [parentKey, childKey] = name.split('.');
        setFormData(prevState => ({
            ...prevState,
            [parentKey]: {
                ...prevState[parentKey],
                [childKey]: value 
            }
        }));
    } else {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
};

  

  const handleSubmit = async event => {
    event.preventDefault();
    const totalCost = parseFloat(formData.quantity) * parseFloat(formData.unitCost);
    try {
    await axios.post('http://localhost:8080/item/insertItem', {
        accPerson: formData.accPerson,
        department: formData.department,
        designation: formData.designation,
        invoiceNumber: formData.invoiceNumber,
        invoiceDate: formData.invoiceDate,
        issueOrder: formData.issueOrder,
        lifespan: formData.lifespan,
        quantity: formData.quantity,
        remarks: formData.remarks,
        status: formData.status,
        supplier: formData.supplier,
        totalCost: totalCost,
        unitCost: formData.unitCost,
        unitOfMeasurement: formData.unitOfMeasurement,
        description : {
            name: formData.description.name,
            model: formData.description.model,
            serialNumber: formData.description.serialNumber,
            type: formData.description.type,
            other: formData.description.other
        },
        location : {
            building: formData.location.building,
            room: formData.location.room
        }
    });
    window.alert('Data inserted successfully');
    console.log('Data inserted successfully');
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

<form onSubmit={handleSubmit} 
className="container mx-auto mt-32 ml-96 flex justify-center overflow-x-auto border border-gray-300 rounded-3xl p-6 w-fit shadow-2xl">
<div class="grid gap-6 mb-6 md:grid-cols-3"> 

                <input
                    type="text"
                    name="accPerson"
                    value={formData.accPerson}
                    onChange={handleChange}
                    placeholder="Accountable Person"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />       
                <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Department"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Designation"
                    required       
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleChange}
                    placeholder="Invoice Number"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="invoiceDate"
                    value={formData.invoiceDate}
                    onChange={handleChange}
                    placeholder="Invoice Date"
                    pattern="[0-9]*"
                    title="Please input valid year, e.g., 2024"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="issueOrder"
                    value={formData.issueOrder}
                    onChange={handleChange}
                    placeholder="Issue Order"
                    required
                    pattern="[0-9]*"
                    title="Please enter a numerical character (1-9)"
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="lifespan"
                    value={formData.lifespan}
                    onChange={handleChange}
                    placeholder="Lifespan"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    pattern="[0-9]*"
                    title="Please enter a numerical character (1-9)"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Remarks"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    placeholder="Status"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    placeholder="Supplier"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="totalCost"
                    value={formData.totalCost}
                    onChange={handleChange}
                    placeholder="Total Cost"
                    pattern="[0-9]+([.][0-9]+)?"
                    title="Please enter a valid number, e.g., 12.34"
                    required
                    readOnly
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="unitCost"
                    value={formData.unitCost}
                    onChange={handleChange}
                    placeholder="Unit Cost"
                    pattern="[0-9]+([.][0-9]+)?"
                    title="Please enter a valid number, e.g., 12.34"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="unitOfMeasurement"
                    value={formData.unitOfMeasurement}
                    onChange={handleChange}
                    placeholder="Unit of Measurement"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="description.name"
                    value={formData.description.name}
                    onChange={handleChange}
                    placeholder="Description Name"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="description.model"
                    value={formData.description.model}
                    onChange={handleChange}
                    placeholder="Description Model"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="description.serialNumber"
                    value={formData.description.serialNumber}
                    onChange={handleChange}
                    placeholder="Description Serial Number"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="description.type"
                    value={formData.description.type}
                    onChange={handleChange}
                    placeholder="Description Type"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="description.other"
                    value={formData.description.other}
                    onChange={handleChange}
                    placeholder="Description Other"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="location.building"
                    value={formData.location.building}
                    onChange={handleChange}
                    placeholder="Location Building"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                    type="text"
                    name="location.room"
                    value={formData.location.room}
                    onChange={handleChange}
                    placeholder="Location Room"
                    required
                    className="mr-2 border border-gray-300 rounded-md px-3 py-2"
                />
                <div class="flex justify-center ml-56 md:col-span-3">
                <button type="submit" 
                    className="bg-red-900 hover:bg-red-400 text-white font-bold py-2 px-20 rounded-full">
                    Add
                </button>
                <div class="pl-12">
                <button type="button" 
                    className="bg-red-900 hover:bg-red-400 text-white font-bold py-2 px-20 rounded-full"
                    onClick={() => navigate("/items")}>
                    Back
                </button>
                </div>
                </div>
                </div>
            </form>                        
        </>
    );
};

