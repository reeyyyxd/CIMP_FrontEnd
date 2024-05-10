import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Extras/navbar";
import Sidebar from "../Extras/sidebar";
import ProfileDropdown from "../Extras/dropdown";
import Home from "./Home";

export default function AddItems({ setModalOpen }) {
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
		description: {
			name: "",
			model: "",
			serialNumber: "",
			type: "",
			other: "",
		},
		location: {
			building: "",
			room: "",
		},
	});

	const handleBack = () => {
		setModalOpen(false);
		navigate("/items");
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		if (name === "quantity" || name === "unitCost") {
			const quantity = name === "quantity" ? value : formData.quantity;
			const unitCost = name === "unitCost" ? value : formData.unitCost;
			const totalCost = parseFloat(quantity) * parseFloat(unitCost);

			setFormData((prevState) => ({
				...prevState,
				[name]: value,
				totalCost: totalCost.toString(),
			}));
		} else if (name.includes(".")) {
			const [parentKey, childKey] = name.split(".");
			setFormData((prevState) => ({
				...prevState,
				[parentKey]: {
					...prevState[parentKey],
					[childKey]: value,
				},
			}));
		} else {
			setFormData((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};


	// const handleSubmit = async (event) => {
	// 	event.preventDefault();
	// 	const totalCost =
	// 		parseFloat(formData.quantity) * parseFloat(formData.unitCost);
	// 	try {
	// 		await axios.post("http://localhost:8080/item/insertItem", {
	// 			accPerson: formData.accPerson,
	// 			department: formData.department,
	// 			designation: formData.designation,
	// 			invoiceNumber: formData.invoiceNumber,
	// 			invoiceDate: formData.invoiceDate,
	// 			issueOrder: formData.issueOrder,
	// 			lifespan: formData.lifespan,
	// 			quantity: formData.quantity,
	// 			remarks: formData.remarks,
	// 			status: formData.status,
	// 			supplier: formData.supplier,
	// 			totalCost: totalCost,
	// 			unitCost: formData.unitCost,
	// 			unitOfMeasurement: formData.unitOfMeasurement,
	// 			description: {
	// 				name: formData.description.name,
	// 				model: formData.description.model,
	// 				serialNumber: formData.description.serialNumber,
	// 				type: formData.description.type,
	// 				other: formData.description.other,
	// 			},
	// 			location: {
	// 				building: formData.location.building,
	// 				room: formData.location.room,
	// 			},
	// 		});
	// 		window.alert("Data added!");
	// 		console.log("Data added!");
	// 		setFormData({
	// 			accPerson: "",
	// 			department: "",
	// 			designation: "",
	// 			invoiceNumber: "",
	// 			invoiceDate: "",
	// 			issueOrder: "",
	// 			lifespan: "",
	// 			quantity: "",
	// 			remarks: "",
	// 			status: "",
	// 			supplier: "",
	// 			totalCost: "",
	// 			unitCost: "",
	// 			unitOfMeasurement: "",
	// 			description: {
	// 				name: "",
	// 				model: "",
	// 				serialNumber: "",
	// 				type: "",
	// 				other: "",
	// 			},
	// 			location: {
	// 				building: "",
	// 				room: "",
	// 			},
	// 		});
	// 	} catch (error) {
	// 		console.error("Error inserting data:", error);
	// 	}
	// };

	const handleSubmit = (event) => {
		event.preventDefault();
		const totalCost =
			parseFloat(formData.quantity) * parseFloat(formData.unitCost);
	
		axios.post("http://localhost:8080/item/insertItem", {
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
			description: {
				name: formData.description.name,
				model: formData.description.model,
				serialNumber: formData.description.serialNumber,
				type: formData.description.type,
				other: formData.description.other,
			},
			location: {
				building: formData.location.building,
				room: formData.location.room,
			},
		})
		.then(results => {
			window.alert("Data added!");
			console.log("Data added!");
			console.log(results.data);
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
				description: {
					name: "",
					model: "",
					serialNumber: "",
					type: "",
					other: "",
				},
				location: {
					building: "",
					room: "",
				},
			});
		})
		.catch(error => {
			console.error("Error inserting data:", error);
		});
	};

	return (
		<>
			<Navbar />
			<Sidebar />
			<ProfileDropdown />
			<Home />

			<form
				onSubmit={handleSubmit}
				className="fixed inset-0 flex items-center justify-center mt-10"
			>
				<div className="container bg-white border border-gray-200 rounded-3xl p-6 w-fit shadow-2xl">
					<div class="grid gap-6 mb-6 md:grid-cols-3" style={{fontFamily:"Poppins"}}>
						<div class="relative">
							<input
								type="text"
								name="accPerson"
								id="accPerson"
								value={formData.accPerson}
								onChange={handleChange}
								placeholder="Required*"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="accPerson"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Accountable Person
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="department"
								id="department"
								value={formData.department}
								onChange={handleChange}
								placeholder="Required*"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="department"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Department
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="designation"
								id="designation"
								value={formData.designation}
								onChange={handleChange}
								placeholder="Required*"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
                         
							/>
							<label
								for="designation"
                               
                                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Designation
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="invoiceNumber"
								id="invoiceNumber"
								value={formData.invoiceNumber}
								onChange={handleChange}
								placeholder="Required*"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="invoiceNumber"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Invoice Number
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="invoiceDate"
								id="invoiceDate"
								value={formData.invoiceDate}
								onChange={handleChange}
								placeholder="Required*"
								pattern="[0-9]*"
								title="Please input valid year, e.g., 2024"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="invoiceDate"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Invoice Date
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="issueOrder"
								id="issueOrder"
								value={formData.issueOrder}
								onChange={handleChange}
								placeholder="Required*"
								pattern="[0-9]*"
								title="Please enter a numerical character (1-9)"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="issueOrder"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Issue Order
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="lifespan"
								id="lifespan"
								value={formData.lifespan}
								onChange={handleChange}
								placeholder="Required*"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="lifespan"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Lifespan
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="quantity"
								id="quantity"
								value={formData.quantity}
								onChange={handleChange}
								placeholder="Required*"
								pattern="[0-9]*"
								title="Please enter a numerical character (1-9)"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="quantity"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Quantity
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="remarks"
								id="remarks"
								value={formData.remarks}
								onChange={handleChange}
								placeholder="Required*"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="remarks"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Remarks
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="status"
								id="status"
								value={formData.status}
								onChange={handleChange}
								placeholder="Required*"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="status"
								class="absolute text-sm text-gray-500 text-left dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Status
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="supplier"
								id="supplier"
								value={formData.supplier}
								onChange={handleChange}
								placeholder="Required*"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="supplier"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Supplier
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="totalCost"
								id="totalCost"
								value={formData.totalCost}
								onChange={handleChange}
								placeholder="Required*"
								pattern="[0-9]+([.][0-9]+)?"
								title="Please enter a valid number, e.g., 12.34"
								required
								readOnly
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="totalCost"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Total Cost
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="unitCost"
								id="unitCost"
								value={formData.unitCost}
								onChange={handleChange}
								placeholder="Required*"
								pattern="[0-9]+([.][0-9]+)?"
								title="Please enter a valid number, e.g., 12.34"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="unitCost"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Unit Cost
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="unitOfMeasurement"
								id="unitOfMeasurement"
								value={formData.unitOfMeasurement}
								onChange={handleChange}
								placeholder="Required*"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="unitOfMeasurement"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Unit of Measurement
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="description.name"
								id="description.name"
								value={formData.description.name}
								onChange={handleChange}
								placeholder="Required*"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="description.name"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Description Name
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="description.model"
								id="description.model"
								value={formData.description.model}
								onChange={handleChange}
								placeholder="Required*"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="description.model"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Description Model
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="description.serialNumber"
								id="description.serialNumber"
								value={formData.description.serialNumber}
								onChange={handleChange}
								placeholder="Required*"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="description.serialNumber"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Serial Number
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="description.type"
								id="description.type"
								value={formData.description.type}
								onChange={handleChange}
								placeholder="Required*"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="description.type"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Description Type
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="description.other"
								id="description.other"
								value={formData.description.other}
								onChange={handleChange}
								placeholder="Required*"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="description.other"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Description Other
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="location.building"
								id="location.building"
								value={formData.location.building}
								onChange={handleChange}
								placeholder="Required*"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="location.building"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Location Building
							</label>
						</div>

						<div class="relative">
							<input
								type="text"
								name="location.room"
								id="location.room"
								value={formData.location.room}
								onChange={handleChange}
								placeholder="Required*"
								required
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
							/>
							<label
								for="location.room"
								class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Location Room
							</label>
						</div>
						<div class="flex justify-center ml-72 md:col-span-3 ">
							<button
								type="submit"
								className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-20 rounded-full border-none"
								
                                
							>
								Add
							</button>
							<div style={{marginLeft:"10px"}}>
								<button
									type="button"
									className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-20 rounded-full"
									onClick={handleBack}
								>
									Back
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}
