import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Modal,
} from "@mui/material";
import axios from "axios";
import AddItems from "./AddItems";
import Navbar from "../Extras/navbar";
import Sidebar from "../Extras/sidebar";
import Home from "./Home";
import ProfileDropdown from "../Extras/dropdown";
import { styled } from "@mui/material/styles";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Items() {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [selectedItem, setSelectedItem] = useState({}); // Initialize with an empty object
	const [showOverlay, setShowOverlay] = useState(false);
	const [showAddItemModal, setShowAddItemModal] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8080/item/getAllItems"
				);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const handleRowClick = (item) => {
		setSelectedItem(item);
		setShowOverlay(true); // Show overlay after clicking on a row
	};

	const handleUpdate = async () => {
		try {
			if (selectedItem) {
				const url = `http://localhost:8080/item/updateItem/${selectedItem.iid}`; // Use selectedItem.iid as propertyTag
				await axios.put(url, selectedItem);
				console.log("Item updated successfully");
				window.alert("Item updated!");
				setShowOverlay(false);
				const response = await axios.get(
					"http://localhost:8080/item/getAllItems"
				);
				setData(response.data);
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
			<Navbar />
			<Sidebar />
			<ProfileDropdown />
			<Home />
			<div  style={{ margin: "10% 20px 0 0", display:"flex", justifyContent:"flex-end" }}>
				<button
					type="button"
					className="bg-maroon hover:bg-red-900 text-white text-sm py-2 px-7"
					style={{
						borderRadius: "5px",
						fontFamily: "Poppins",
						fontWeight: 500,
					}}
					onClick={() => setShowAddItemModal(true)}
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
							{data.map((item) => (
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
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>

			{showOverlay && selectedItem && (
				<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
					<div className="bg-white bg-opacity-95 p-6 rounded-md shadow-md">
						<h2 className="text-lg text-center font-semibold mb-4">
							Edit Item
						</h2>
						<form onSubmit={handleUpdate}>
							<div className="mb-2">
								<label htmlFor="accPerson" className="mr-2">
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
									className="border border-gray-300 rounded-md px-3 py-2 mb-2"
									placeholder="Accountable Person"
									required
								/>

								<label htmlFor="accPerson" className="ml-4">
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
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-24"
									placeholder="Department"
									requiredz
								/>

								<label htmlFor="accPerson" className="ml-4">
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
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-10"
									placeholder="Designation"
									required
								/>
							</div>

							<div className="mb-2">
								<label htmlFor="accPerson" className="mr-2">
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
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-7"
									placeholder="Invoice Number"
									required
								/>

								<label htmlFor="accPerson" className="ml-4">
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
									className="border border-gray-300 rounded-md px-3 py-2 ml-24 mb-2"
									placeholder="Invoice Date"
									required
								/>

								<label htmlFor="accPerson" className="mr-2 ml-3">
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
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-9"
									placeholder="Issue Order"
									required
								/>
							</div>

							<div className="mb-2">
								<label htmlFor="accPerson" className="mr-2">
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
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-20"
									placeholder="Lifespan"
									required
								/>

								<label htmlFor="accPerson" className="ml-4">
									Quantity:
								</label>
								<input
									type="text"
									value={selectedItem.quantity || ""} // Provide a fallback value
									onChange={handleQuantityChange}
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-32"
									placeholder="Quantity"
									required
								/>

								<label htmlFor="accPerson" className="ml-3">
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
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-16"
									placeholder="Remarks"
									required
								/>
							</div>

							<div className="mb-2">
								<label htmlFor="accPerson" className="mr-2">
									Status:
								</label>
								<input
									type="text"
									value={selectedItem.status || ""} // Provide a fallback value
									onChange={(e) =>
										setSelectedItem({ ...selectedItem, status: e.target.value })
									}
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-24"
									placeholder="Status"
									required
								/>

								<label htmlFor="accPerson" className="ml-4">
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
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-32"
									placeholder="Supplier"
									required
								/>

								<label htmlFor="accPerson" className="ml-3">
									Total Cost:
								</label>
								<input
									type="text"
									value={selectedItem.totalCost || ""} // Provide a fallback value
									readOnly
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-14"
									placeholder="Total Cost"
									required
								/>
							</div>

							<div className="mb-2">
								<label htmlFor="accPerson" className="mr-2">
									Unit Cost:
								</label>
								<input
									type="text"
									value={selectedItem.unitCost || ""} // Provide a fallback value
									onChange={handleUnitCostChange}
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-16"
									placeholder="Unit Cost"
									required
								/>

								<label htmlFor="accPerson" className="ml-6">
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
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-10"
									placeholder="Unit of Measurement"
									required
								/>

								<label htmlFor="accPerson" className="ml-3">
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
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-2"
									placeholder="Description Name"
									required
								/>
							</div>

							<div className="mb-2">
								<label htmlFor="accPerson" className="mr-2">
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
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-2"
									placeholder="Description Model"
									required
								/>

								<label htmlFor="accPerson" className="ml-4">
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
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-1"
									placeholder="Description Serial Number"
									required
								/>

								<label htmlFor="accPerson" className="ml-3">
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
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-4"
									placeholder="Description Type"
									required
								/>
							</div>

							<div className="mb-2">
								<label htmlFor="accPerson" className="mr-2">
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
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-3"
									placeholder="Description Other"
									required
								/>

								<label htmlFor="accPerson" className="ml-4">
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
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-16"
									placeholder="Location Building"
									required
								/>

								<label htmlFor="accPerson" className="ml-4">
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
									className="border border-gray-300 rounded-md px-3 py-2 mb-2 ml-7"
									placeholder="Location Room"
									required
								/>
							</div>

							<button
								type="submit"
								className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
							>
								Update
							</button>
							<button
								onClick={handleCloseOverlay}
								className="bg-gray-400 text-white px-4 py-2 rounded-md"
							>
								Cancel
							</button>
						</form>
					</div>
				</div>
			)}
			<Modal
				open={showAddItemModal}
				onClose={() => setShowAddItemModal(false)}
				aria-labelledby="add-item-modal"
				aria-describedby="add-item-modal-description"
			>
				<AddItems setModalOpen={setShowAddItemModal} />
			</Modal>
		</>
	);
}
