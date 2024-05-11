import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Receive(){

    const [id, setId] = useState("");
    const [remarks, setRemarks] = useState("");
    const [other, setOther] = useState("");
    const [queryResults, setQueryResults] = useState([]);
    const [LqueryResults, LsetQueryResults] = useState([]);

    const handleId = event => {
        setId(event.target.value)
    }
    const handleRemarks = event => {
        setRemarks(event.target.value)
    }
    const handleOther = event => {
        setOther(event.target.value)
    }


    const handleReceive = () => {
        axios.put("http://localhost:8080/item/updateStatus", null, {
            params: {
                iid: id,
                status: "AVAILABLE"
            }
        })
        .then(result => {
            alert("Item Received");
            console.log(result.data);
            setQueryResults(result.data);
        })
        .catch(error => {
            console.log(error);
            alert("No Data found!");
        });
    }

    const handleLog = () => {
        axios.post("http://localhost:8080/addLog", {
            type: "RECEIVE",
            description: remarks + ", " + other
        }, {
            params: {
                uid: 1,
                iid: id
            }
        })
        .then(result => {
            LsetQueryResults(result.data)
            console.log(LqueryResults);
        })
        .catch(error => {
            console.error("Error adding log:", error);
        });
    }


    return( 
        <>
        
        <p>Property Tag</p>
        <TextField onChange={handleId}></TextField>

        <p>Returned By</p>
        <TextField onChange={handleRemarks}></TextField>

        <p>Other Remarks</p>
        <TextField onChange={handleOther}></TextField>

        <p></p>
        <Button onClick={function(){handleReceive(); handleLog()}}>Receive</Button>
        
        </>

    
    )
}