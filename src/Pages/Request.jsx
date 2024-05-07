import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Request() {
    const [type, setType] = useState("");
    const [number, setNumber] = useState("");
    const [id, setId] = useState("");
   
    const [queryResults, setQueryResults] = useState([]);


    const handleType = event => {
        setType(event.target.value);
    }

    const handleId = event =>{
        setId(event.target.value);
    }

    const handleNumber = event =>{
        setNumber(event.target.value);
    }

    const handleRequest = () => {

    
        if (type === "Request") {
            axios.put("http://localhost:8080/item/requestItem", null, {
                    params: {
                        number: parseInt(number),
                        itemId: id
                    }
                })
                .then(result => {
                    console.log(result.data);
                    setQueryResults(result.data);
                })
                .catch(error => {
                    console.log(error);
                    alert("No Data found!");
                });
        } else if (type === "Borrow") {
            axios.put("http://localhost:8080/item/updateStatus", null, {
                    params: {
                        iid: id,
                        status: "BORROW"
                    }
                })
                .then(result => {
                    console.log(result.data);
                    setQueryResults(result.data);
                })
                .catch(error => {
                    console.log(error);
                    alert("No Data found!");
                });
        }else if (type === "Repair") {
            axios.put("http://localhost:8080/item/updateStatus", null, {
                    params: {
                        iid: id,
                        status: "REPAIR"
                    }
                })
                .then(result => {
                    console.log(result.data);
                    setQueryResults(result.data);
                })
                .catch(error => {
                    console.log(error);
                    alert("No Data found!");
                });
        }else if (type === "Disposal") {
            axios.put("http://localhost:8080/item/updateStatus", null, {
                    params: {
                        iid: id,
                        status: "DISPOSAL"
                    }
                })
                .then(result => {
                    console.log(result.data);
                    setQueryResults(result.data);
                })
                .catch(error => {
                    console.log(error);
                    alert("No Data found!");
                });
        }
    }
    
    

    return (
        <>
            <select onChange={handleType}>
                <option value=""> Type of Request</option>
                <option value="Request">Request</option>
                <option value="Borrow">Borrow items</option>
                <option value="Repair">Out for Repair</option>
                <option value="Disposal">Out for disposal</option>
            </select>

            <p>Property Tag</p>
            <TextField onChange={handleId}/>

            <p>Requested by:</p>
            <TextField />
            

            <p>Quantity:</p>
            <TextField onChange={handleNumber}/>

            <p></p><Button onClick={handleRequest}>Request</Button>

            <p></p>
        </>
    )
}
