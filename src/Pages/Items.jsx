import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal } from "@mui/material";
import axios from "axios";
import Home from "./Home";
import { styled } from "@mui/material/styles";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Items( {user, setUser} ) {
	const [id, setId] = useState("");
	const [queryResults, setQueryResults] = useState([]);
	const [LqueryResults, setLQueryResults] = useState([]);

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
		status: "AVAILABLE",
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

	const handleSubmit = () => {
		const totalCost = parseFloat(formData.quantity) * parseFloat(formData.unitCost);
	
		axios.post(`http://${address}:8080/item/insertItem`, {
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
		.then(response => {
			const newId = response.data.iid; 
			setQueryResults(response.data);
			setId(newId);
			window.alert("Data added!");
			console.log("Data added!");
			console.log("New item ID:", newId); 
			console.log(response.data);
			
			
			axios.post(`http://${address}:8080/addLog`, {
				description: "Added an Item",
				type: "ADD"
			}, {
				params: {
					uid: user.uid,
					iid: newId 
				}
			})
			.then(response => {
				setLQueryResults(response.data);
				setShowAddItemModal(false);
				setLoader(Math.random()*1000);
			})
			.catch(error => {
				console.error("Error adding log:", error);
			});

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

	const combinedSubmit = (event) => {
		event.preventDefault(); // Prevent default form submission
		handleSubmit();
	}

	const [data, setData] = useState([]);
	const [selectedItem, setSelectedItem] = useState({}); // Initialize with an empty object
	const [showOverlay, setShowOverlay] = useState(false);
	const [showAddItemModal, setShowAddItemModal] = useState(false);
	const [loader, setLoader] = useState(null);
	const address = getIpAddress();
	
	function getIpAddress() {
		const hostname = window.location.hostname;

		const indexOfColon = hostname.indexOf(':');

		if(indexOfColon !== -1) {
			return hostname.substring(0, indexOfColon);
		}

		return hostname;
	}

	const handleOpenModal = () => setShowAddItemModal(true);
	const handleCloseModal = () => setShowAddItemModal(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://${address}:8080/item/getAllItems`
				);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [loader]);

	const handleRowClick = (item) => {
		setSelectedItem(item);
		setShowOverlay(true); // Show overlay after clicking on a row
	};

    const handleDelete = (event) => {
		event.preventDefault();
		const itemId = selectedItem.iid;
	
		if (!itemId) {
		  console.error('No item ID found to delete');
		  return;
		}
	
		const confirmDelete = window.confirm('Are you sure you want to delete this item?');
	
		if (confirmDelete) {
		  axios.delete(`http://${address}:8080/item/deleteItem/${itemId}`)
			.then(response => {
			  if (response.status === 200) {

				axios.post(`http://${address}:8080/addLog`, {
					type: "DELETE",
					description: "Deleted an Item"
				}, {
					params: {
						uid: 1,
						iid: itemId
					}
				})
				.then(response => {
					console.log(response.data);
					
				})
				.catch(error => {
					console.error("Error adding log:", error);
				});
				
				console.log('Item deleted successfully');
				alert("Item Deleted");
				setLoader(Math.random()*1000);
				handleCloseOverlay();
				
			  } else {
				console.error('Failed to delete item');
			  }
			})
			.catch(error => {
			  console.error('Error occurred during deletion:', error);
			});
		}
	  };


	  const [updated, setUpdated] = useState(null); 

	  const handleUpdate = async (event) => {
		event.preventDefault();
	
		try {
			if (selectedItem) {
				const url = `http://${address}:8080/item/updateItem/${selectedItem.iid}`;
				await axios.put(url, selectedItem);
				alert("Data updated");
				console.log("Item updated successfully");
	
				// Get the original item from the data or wherever it is stored
				const originalItem = data.find(item => item.iid === selectedItem.iid);
	
				// Compare each property to find changes
				const changedProperties = [];
				for (const key in selectedItem) {
					if (selectedItem.hasOwnProperty(key) && selectedItem[key] !== originalItem[key]) {
						changedProperties.push(key);
					}
				}

				// Construct description based on changed properties
				let description;
				if (changedProperties.length > 0) {
					description = "Updated " + changedProperties.join(", ");
				} else {
					description = "Updated nothing";
				}
	
				await axios.post(`http://${address}:8080/addLog`, {
					type: "UPDATED",
					description: description
				}, {
					params: {
						uid: 1,
						iid: selectedItem.iid
					}
				})
				.then(response => {
					console.log("Log added successfully:", response.data);
				})
				.catch(error => {
					console.error("Error adding log:", error);
				});
	
				setShowOverlay(false);
				const response = await axios.get(
					`http://${address}:8080/item/getAllItems`
				);
				setData(response.data);
	
				setUpdated(selectedItem);
			}
		} catch (error) {
			console.error("Error updating item:", error);
		}
	};
	
	const handleCloseOverlay = () => {
		setShowOverlay(false);
		setSelectedItem({}); // Reset selectedItem to an empty object
	};

	const handleQuantityChange = (e) => {
		const quantity = e.target.value;
		const unitCost = selectedItem.unitCost || 0; // Handle cases where unitCost is not set
		const totalCost = quantity * unitCost;
		setSelectedItem({ ...selectedItem, quantity, totalCost });
	};

	const handleUnitCostChange = (e) => {
		const unitCost = e.target.value;
		const quantity = selectedItem.quantity || 0; // Handle cases where quantity is not set
		const totalCost = quantity * unitCost;
		setSelectedItem({ ...selectedItem, unitCost, totalCost });
	};

	const StyledTableCell = styled(TableCell)({
		fontSize: "13px",
		fontFamily: "Poppins",
		color: "white",
		textAlign: "center",
		paddingBottom: "10px",
	});

	return (
		<>
			<Home user={user} setUser={setUser} />
			<div  style={{ margin: "10% 20px 0 0", display:"flex", justifyContent:"flex-end" }}>
				<button
					type="button"
					className="bg-maroon hover:bg-red-900 text-white text-sm py-2 px-7"
					style={{
						borderRadius: "5px",
						fontFamily: "Poppins",
						fontWeight: 500,
					}}
					onClick={handleOpenModal}
				>
					<span
						style={{
							position: "relative",
							right: "5px",
							top: "0.5px",
						}}
					>
						<FontAwesomeIcon icon={faPlus} />
					</span>
					Add Item
				</button>
			</div>
			<div
				style={{
					overflowX: "auto",
					display: "flex",
					justifyContent: "center",
					maxWidth: "calc(100% - 225px)",
					marginLeft: "220px",
				}}
			>
				<TableContainer
					component={Paper}
					style={{
						backgroundColor: "#8c383e",
						borderRadius: "3px 3px",
						width: "98%",
						marginTop: "10px",
					}}
				>
					<Table sx={{ minWidth: 650 }} size="medium">
						<TableHead>
							<TableRow>
								<StyledTableCell>Property Tag</StyledTableCell>
								<StyledTableCell>Accountable Person</StyledTableCell>
								<StyledTableCell>Department</StyledTableCell>
								<StyledTableCell>Designation</StyledTableCell>
								<StyledTableCell>Invoice Number</StyledTableCell>
								<StyledTableCell>Invoice Date</StyledTableCell>
								<StyledTableCell>Issue Order #</StyledTableCell>
								<StyledTableCell>Lifespan</StyledTableCell>
								<StyledTableCell>Qty</StyledTableCell>
								<StyledTableCell>Remarks</StyledTableCell>
								<StyledTableCell>Status</StyledTableCell>
								<StyledTableCell>Supplier</StyledTableCell>
								<StyledTableCell>Total Cost</StyledTableCell>
								<StyledTableCell>Unit Cost</StyledTableCell>
								<StyledTableCell>Unit of Measure</StyledTableCell>
								<StyledTableCell>Description ID</StyledTableCell>
								<StyledTableCell>Location ID</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((item) => {
								if (item.deleted) {
								return null; // Skip rendering this row if item.deleted is true
								}

								return (
								<TableRow
									key={item.iid}
									onClick={() => handleRowClick(item)}
									hover
									style={{ cursor: "pointer" }}
								>
									<StyledTableCell>{item.iid}</StyledTableCell>
									<StyledTableCell>{item.accPerson}</StyledTableCell>
									<StyledTableCell>{item.department}</StyledTableCell>
									<StyledTableCell>{item.designation}</StyledTableCell>
									<StyledTableCell>{item.invoiceNumber}</StyledTableCell>
									<StyledTableCell>{item.invoiceDate}</StyledTableCell>
									<StyledTableCell>{item.issueOrder}</StyledTableCell>
									<StyledTableCell>{item.lifespan}</StyledTableCell>
									<StyledTableCell>{item.quantity}</StyledTableCell>
									<StyledTableCell>{item.remarks}</StyledTableCell>
									<StyledTableCell>{item.status}</StyledTableCell>
									<StyledTableCell>{item.supplier}</StyledTableCell>
									<StyledTableCell>{item.totalCost}</StyledTableCell>
									<StyledTableCell>{item.unitCost}</StyledTableCell>
									<StyledTableCell>{item.unitOfMeasurement}</StyledTableCell>
									<StyledTableCell>{item.description.did}</StyledTableCell>
									<StyledTableCell>{item.location.lid}</StyledTableCell>
								</TableRow>
								);
							})}
						</TableBody>

					</Table>
				</TableContainer>
			</div>

			{showOverlay && selectedItem && (
				<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
					<div className="bg-white bg-opacity-95 rounded-md shadow-md">
					<h2 className="font-mono text-lg text-center font-semibold text-maroon bg-yellow-400 mb-4 py-3 px-4 rounded-none border border-yellow-400 m-0">
							Edit Item
						</h2>
						<form onSubmit={handleUpdate} >

						<div className="p-6 mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
							<div className="sm:col-span-1">
								<label htmlFor="accPerson" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Accountable Person:
								</label>
								<input
									type="text"
									value={selectedItem.accPerson} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({
											...selectedItem,
											accPerson: e.target.value,
										})
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Accountable Person"
									required
								/>
								</div>

						<div className="sm:col-span-1">
								<label htmlFor="department" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Department:
								</label>
								<input
									type="text"
									value={selectedItem.department || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({
											...selectedItem,
											department: e.target.value,
										})
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Department"
									required
								/>
								</div>

						<div className="sm:col-span-1">
								<label htmlFor="designation" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Designation:
								</label>
								<input
									type="text"
									value={selectedItem.designation || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({
											...selectedItem,
											designation: e.target.value,
										})
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Designation"
									required
								/>
							</div>
								
					<div className="sm:col-span-1">
								<label htmlFor="invoiceNumber" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Invoice Number:
								</label>
								<input
									type="text"
									value={selectedItem.invoiceNumber || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({
											...selectedItem,
											invoiceNumber: e.target.value,
										})
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Invoice Number"
									required
								/>
								</div>

						<div className="sm:col-span-1">
								<label htmlFor="invoiceDate" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Invoice Date:
								</label>
								<input
									type="text"
									value={selectedItem.invoiceDate || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({
											...selectedItem,
											invoiceDate: e.target.value,
										})
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Invoice Date"
									required
								/>
								</div>

						<div className="sm:col-span-1">
								<label htmlFor="issueOrder" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Issue Order:
								</label>
								<input
									type="text"
									value={selectedItem.issueOrder || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({
											...selectedItem,
											issueOrder: e.target.value,
										})
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Issue Order"
									required
								/>
							</div>

							<div className="sm:col-span-1">
								<label htmlFor="lifespan" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Lifespan:
								</label>
								<input
									type="text"
									value={selectedItem.lifespan || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({
											...selectedItem,
											lifespan: e.target.value,
										})
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Lifespan"
									required
								/>
								</div>

						<div className="sm:col-span-1">
								<label htmlFor="Quantity" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Quantity:
								</label>
								<input
									type="text"
									value={selectedItem.quantity || ""} // Provide a fallback value
									onChange={handleQuantityChange}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Quantity"
									required
								/>
								</div>

							<div className="sm:col-span-1">
								<label htmlFor="remarks" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Remarks:
								</label>
								<input
									type="text"
									value={selectedItem.remarks || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({
											...selectedItem,
											remarks: e.target.value,
										})
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Remarks"
									required
								/>
							</div>

							<div className="sm:col-span-1">
								<label htmlFor="status" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Status:
								</label>
								<input
									type="text"
									value={selectedItem.status || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({ ...selectedItem, status: e.target.value })
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Status"
									required
								/>
								</div>

								<div className="sm:col-span-1">
								<label htmlFor="supplier" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Supplier:
								</label>
								<input
									type="text"
									value={selectedItem.supplier || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({
											...selectedItem,
											supplier: e.target.value,
										})
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Supplier"
									required
								/>
								</div>

						<div className="sm:col-span-1">
								<label htmlFor="totalCost" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Total Cost:
								</label>
								<input
									type="text"
									value={selectedItem.totalCost || ""} // Provide a fallback value
									readOnly
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Total Cost"
									required
								/>
							</div>

							<div className="sm:col-span-1">
								<label htmlFor="unitCost" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Unit Cost:
								</label>
								<input
									type="text"
									value={selectedItem.unitCost || ""} // Provide a fallback value
									onChange={handleUnitCostChange}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Unit Cost"
									required
								/>
								</div>

						<div className="sm:col-span-1">
								<label htmlFor="unitOfMeasurement" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Unit of Measurement:
								</label>
								<input
									type="text"
									value={selectedItem.unitOfMeasurement || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({
											...selectedItem,
											unitOfMeasurement: e.target.value,
										})
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Unit of Measurement"
									required
								/>
								</div>

						<div className="sm:col-span-1">
								<label htmlFor="description.name" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Description Name:
								</label>
								<input
									type="text"
									value={selectedItem.description.name || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({
											...selectedItem,
											description: {
												...selectedItem.description,
												name: e.target.value,
											},
										})
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Description Name"
									required
								/>
							</div>

							<div className="sm:col-span-1">
								<label htmlFor="description.model" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Description Model:
								</label>
								<input
									type="text"
									value={selectedItem.description.model || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({
											...selectedItem,
											description: {
												...selectedItem.description,
												model: e.target.value,
											},
										})
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Description Model"
									required
								/>
								</div>

								<div className="sm:col-span-1">
								<label htmlFor="description.serialNumber" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Description Serial Number:
								</label>
								<input
									type="text"
									value={selectedItem.description.serialNumber || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({
											...selectedItem,
											description: {
												...selectedItem.description,
												serialNumber: e.target.value,
											},
										})
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Description Serial Number"
									required
								/>
								</div>

								<div className="sm:col-span-1">
								<label htmlFor="description.type" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Description Type:
								</label>
								<input
									type="text"
									value={selectedItem.description.type || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({
											...selectedItem,
											description: {
												...selectedItem.description,
												type: e.target.value,
											},
										})
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Description Type"
									required
								/>
							</div>

							<div className="sm:col-span-1">
								<label htmlFor="description.other" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Description Other:
								</label>
								<input
									type="text"
									value={selectedItem.description.other || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({
											...selectedItem,
											description: {
												...selectedItem.description,
												other: e.target.value,
											},
										})
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Description Other"
									required
								/>
								</div>

								<div className="sm:col-span-1">
								<label htmlFor="accPerson" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Location Building:
								</label>
								<input
									type="text"
									value={selectedItem.location.building || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({
											...selectedItem,
											location: {
												...selectedItem.location,
												building: e.target.value,
											},
										})
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Location Building"
									required
								/>
								</div>

						<div className="sm:col-span-1">
								<label htmlFor="location.room" 
								className="block text-sm font-medium leading-6 text-gray-900">
									Location Room:
								</label>
								<input
									type="text"
									value={selectedItem.location.room || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({
											...selectedItem,
											location: {
												...selectedItem.location,
												room: e.target.value,
											},
										})
									}
									className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
									placeholder="Location Room"
									required
								/>
							</div>
							</div>
							
							<div className="flex justify-between p-6"> 
							<div> 
								<button
									type="submit"
									className="bg-blue-500 text-white px-4 py-2 rounded-md mt-1 mr-2"
								>
									Update
								</button>
								<button
									onClick={handleCloseOverlay}
									className="bg-gray-400 text-white px-4 py-2 mr-2 rounded-md"
								>
									Cancel
								</button>
							</div>
							<button
								onClick={handleDelete}
								className="bg-red-400 text-white px-4 py-2 rounded-md mt-1 mr-2"
							>
								Delete
							</button>
						</div>
	
						</form>
					</div>
				</div>
			)}
			<Modal
				open={showAddItemModal}
				onClose={handleCloseModal}
				aria-labelledby="add-item-modal"
				aria-describedby="add-item-modal-description"
			>
				<form
					onSubmit={combinedSubmit}
					className="fixed inset-0 flex items-center justify-center mt-10"
				>
					<div className="container bg-white border border-gray-200 rounded-3xl p-6 w-fit shadow-2xl">
						<div className="grid gap-6 mb-6 md:grid-cols-3" style={{fontFamily:"Poppins"}}>
							<div className="relative">
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
									htmlFor="accPerson"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Accountable Person
								</label>
							</div>

							<div className="relative">
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
									htmlFor="department"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Department
								</label>
							</div>

							<div className="relative">
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
									htmlFor="designation"
								
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Designation
								</label>
							</div>

							<div className="relative">
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
									htmlFor="invoiceNumber"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Invoice Number
								</label>
							</div>

							<div className="relative">
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
									htmlFor="invoiceDate"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Invoice Date
								</label>
							</div>

							<div className="relative">
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
									htmlFor="issueOrder"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Issue Order
								</label>
							</div>

							<div className="relative">
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
									htmlFor="lifespan"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Lifespan
								</label>
							</div>

							<div className="relative">
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
									htmlFor="quantity"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Quantity
								</label>
							</div>

							<div className="relative">
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
									htmlFor="remarks"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Remarks
								</label>
							</div>

							<div className="relative">
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
									htmlFor="supplier"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Supplier
								</label>
							</div>

							<div className="relative">
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
									htmlFor="totalCost"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Total Cost
								</label>
							</div>

							<div className="relative">
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
									htmlFor="unitCost"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Unit Cost
								</label>
							</div>

							<div className="relative">
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
									htmlFor="unitOfMeasurement"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Unit of Measurement
								</label>
							</div>

							<div className="relative">
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
									htmlFor="description.name"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Description Name
								</label>
							</div>

							<div className="relative">
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
									htmlFor="description.model"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Description Model
								</label>
							</div>

							<div className="relative">
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
									htmlFor="description.serialNumber"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Serial Number
								</label>
							</div>

							<div className="relative">
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
									htmlFor="description.type"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Description Type
								</label>
							</div>

							<div className="relative">
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
									htmlFor="description.other"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Description Other
								</label>
							</div>

							<div className="relative">
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
									htmlFor="location.building"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Location Building
								</label>
							</div>

							<div className="relative">
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
									htmlFor="location.room"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
								>
									Location Room
								</label>
							</div>
							<div className="flex justify-center ml-72 md:col-span-3 ">
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
										onClick={handleCloseModal}
									>
										Back
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</Modal>
		</>
	);
}
