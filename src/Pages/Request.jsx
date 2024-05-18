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


export default function Request( {user, setUser} ) {
    const [type, setType] = useState("");
    const [number, setNumber] = useState("");
    const [id, setId] = useState("");
    const [remarks, setRemarks] = useState("");
    const [stat, setStat] = useState("");
    const [other, setOther] =useState("");

    const [LqueryResults, setLQueryResults] = useState([]);
   
    const [queryResults, setQueryResults] = useState([]);

       
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
                uid: user.uid,
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
            <Home user={user} setUser={setUser} />
            

            <div class="flex justify-center">
                <div class="w-full mt-32 ml-52 max-w-xs">
                <div className=" bg-maroon py-2 px-7 rounded-t-md border border-maroon"></div>
                    <div class="bg-white shadow-2xl px-8 pt-1 pb-8 mb-0"> 
                    <div className="p-6 mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1"> 

            <div className="sm:col-span-1">
            <select onChange={handleType}  
            className="border border-gray-700 rounded-md p-2 w-52 bg-gray-800 text-white text-sm hover:bg-gray-950">
                <option value="">Type of Request</option>
                <option value="REQUEST">Request</option>
                <option value="BORROW">Borrow items</option>
                <option value="REPAIR">Out for Repair</option>
                <option value="DISPOSAL">Out for disposal</option>
            </select>

            </div>
        
            <div className="sm:col-span-1"> 
          <div class="relative">
            <input
                type="text"
                name="propertyTag"
                id="propertyTag"
                onChange={handleId}
                placeholder=""
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
        />
        <label
			for="propertyTag"
		    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
		>
			Enter Property Tag
		    </label>
        </div>
        </div>
       

        <div className="sm:col-span-1"> 
          <div class="relative">
            <input
                type="text"
                name="request"
                id="request"
                onChange={handleRemark}
                placeholder=""
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
        />
        <label
			for="request"
		    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
		>
			Requested by:
		    </label>
        </div>
        </div>
            

        <div className="sm:col-span-1"> 
          <div class="relative">
            <input
                type="text"
                name="quantity"
                id="quantity"
                onChange={handleNumber}
                placeholder=""
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
        />
        <label
			for="quantity"
		    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
			Enter Quantity
		    </label>
        </div>
        </div>
                
    <button className="bg-yellow-400 hover:bg-yellow-300 text-maroon font-bold py-2 px-4 border-b-4 border-yellow-600 hover:border-yellow-400 rounded"
    onClick={handleRequest}>Request</button>
    </div>
    </div>
    <div className=" bg-maroon py-2 px-7 rounded-b-md border border-maroon"></div>
    </div>   
    
    </div>

        </>
    )
}
