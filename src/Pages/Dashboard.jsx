import React, { useState, useEffect } from "react";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Modal,} from "@mui/material";
import axios from "axios";
import Home from "./Home";
import { styled } from "@mui/material/styles";

export default function Dashboard( {user, setUser}) {
    const [data, setData] = useState([]);
	const address = getIpAddress();
	
	function getIpAddress() {
		const hostname = window.location.hostname;

		const indexOfColon = hostname.indexOf(':');

		if(indexOfColon !== -1) {
		return hostname.substring(0, indexOfColon);
		}

		return hostname;
	}

    useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://${address}:8080/item/itemDash`
				);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);
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
								return (
								<TableRow
									key={item.iid}
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
        </>
    )
}
