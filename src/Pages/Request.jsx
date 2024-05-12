import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Extras/navbar";
import Sidebar from "../Extras/sidebar";
import ProfileDropdown from "../Extras/dropdown";
import Home from "./Home";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


export default function Request() {
    const [type, setType] = useState("");
    const [number, setNumber] = useState("");
    const [id, setId] = useState("");
    const [remarks, setRemarks] = useState("");
    const [stat, setStat] = useState("");
    const [other, setOther] =useState("");

    const [LqueryResults, setLQueryResults] = useState([]);
   
    const [queryResults, setQueryResults] = useState([]);

    const DemoPaper = styled(Paper)(({ theme }) => ({
        width: 450,
        height: 550,
        padding: theme.spacing(2),
        ...theme.typography.body2,
        textAlign: 'center',
        position: 'absolute',
        top: '55%',
        left: '50%',
        bottom: '10%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }));

    
    const handleOther = (event) => {
        setOther(event.target.value)
    }
     
    const handleRemark = (event) => {
        setRemarks(event.target.value);
    }

    const handleType = (event) => {
        setType(event.target.value);
    }

    const handleId = (event) =>{
        setId(event.target.value);
    }

    const handleNumber = (event) =>{
        setNumber(event.target.value);
    }

    const handleLog = () =>{
        if(type === "REQUEST"){
            axios.post("http://localhost:8080/addLog", {
            type: type,
            description: remarks + " | Quantity: " + number
        }, {
            params: {
                uid: 1,
                iid: id 
            }
			})
			.then(response => {
				setLQueryResults(response.data);
				console.log(response.data);

			})
			.catch(error => {
				console.error("Error adding log:", error);
			});
        }else{
            axios.post("http://localhost:8080/addLog", {
            type: type,
            description: remarks 
        }, {
            params: {
                uid: 1,
                iid: id 
            }
			})
			.then(response => {
				setLQueryResults(response.data);
				console.log(response.data);

			})
			.catch(error => {
				console.error("Error adding log:", error);
			});
        }
        
    }

    const handleQuanti = () =>{
        axios.get("http://localhost:8080/item/quantiLog",{
            params: {
                num: id
            }
        })
        .then(result => {
            console.log(result.data);

                if(result.data >= parseInt(number)){
                    axios.put("http://localhost:8080/item/requestItem", null, {
                        params: {
                            number: parseInt(number),
                            itemId: id
                        }
                    })
                    .then(result => {
                        alert("Request Successful!")
                        console.log(result.data);
                        setQueryResults(result.data); 
                        handleLog()
                    })
                    .catch(error => {
                        console.log(error);
                        alert("No Data found!");
                    });
                }else{
                    alert("Not available")
                }
                
            
        })
    }

    const handleStatus = () =>{
        axios.get("http://localhost:8080/item/statusLog", {
            params: {
                type: id
            }
        })
        .then(result => {
            console.log(result.data);
            setStat(result.data);
    
            
            if(result.data === "AVAILABLE"){
                axios.put("http://localhost:8080/item/updateStatus", null, {
                    params: {
                        iid: id,
                        status: type
                    }
                })
                .then(result => {
                    alert("Request Successful!")
                    console.log(result.data);
                    setQueryResults(result.data);
                    handleLog();
                })
                .catch(error => {
                    console.log(error);
                    alert("No Data found!");
                });
            } else {
                alert("Item not available!");
            }
        })
        .catch(error => {
            console.log(error);
            alert("No Data found!");
        });
    }
    

    const handleRequest = (event) => {

        if (type === "REQUEST") {
            handleQuanti();
        } else if (type === "BORROW") {
            handleStatus();
        }else if (type === "REPAIR") {
            handleStatus();
        }else if(type === "DISPOSAL"){
            handleStatus();
        }
        
    }
    

    return (
        <>

           <Navbar/>
            <Sidebar />
            <ProfileDropdown />
            <Home />
                
                {/*<DemoPaper variant="elevation"></DemoPaper>*/}
            
            <Container>
    <Box mt={5} textAlign="center">
        <div className="max-w-sm mx-auto">
            <label htmlFor="requestType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Type of Request</label>
            <select onChange={handleType}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-auto" >
                <option value="">Type of Request</option>
                <option value="REQUEST">Request</option>
                <option value="BORROW">Borrow items</option>
                <option value="REPAIR">Out for Repair</option>
                <option value="DISPOSAL">Out for disposal</option>
            </select>
        </div>
    </Box>
</Container>


<Container>
    <Box mt={5} textAlign="center">
        <div className="max-w-sm mx-auto">
            <label htmlFor="propertyTag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Enter Property Tag:</label>
            <input type="text" id="propertyTag" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-auto" onChange={handleId} />
            
        </div>
    </Box>
</Container>

<Container>
    <Box mt={5} textAlign="center">
        <div className="max-w-sm mx-auto">
            <label htmlFor="requestedBy" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Requested by:</label>
            <input onChange={handleRemark}type="text" id="requestedBy" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-auto" />
            
        </div>
    </Box>
</Container>

<Container>
    <Box mt={5} textAlign="center">
        <div className="max-w-sm mx-auto">
            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Enter Quantity:</label>
        <input type="text" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-auto" onChange={handleNumber} />
            
        </div>
    </Box>
</Container>



<Container>
    <Box mt={5} textAlign="center">
    <Button onClick={handleRequest} variant="contained" sx={{ backgroundColor: 'maroon', color: 'white' }}>Request</Button>
    </Box>
</Container>


            {/*<select onChange={handleType}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-auto" >
                <option value="">Type of Request</option>
                <option value="Request">Request</option>
                <option value="Borrow">Borrow items</option>
                <option value="Repair">Out for Repair</option>
                <option value="Disposal">Out for disposal</option>
            </select>

            <TextField onChange={handleId}></TextField>
            <TextField onChange={handleNumber}></TextField>
<Button onClick={handleRequest} variant="contained" sx={{ backgroundColor: 'maroon', color: 'white' }}>Request</Button>*/}
        </>
    )
}
