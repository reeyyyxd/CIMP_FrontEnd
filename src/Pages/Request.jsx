import axios from "axios";
import Home from "./Home";
import { useState } from "react";

export default function Request( { user, setUser, setSnackbarGreenOpen, setSnackbarRedOpen, setSnackbarMessage } ) {
    const [type, setType] = useState("");
    const [number, setNumber] = useState("");
    const [id, setId] = useState("");
    const [remarks, setRemarks] = useState("");
    const [stat, setStat] = useState("");
    const [other, setOther] =useState("");
    const [LqueryResults, setLQueryResults] = useState([]);
    const address = getIpAddress();
	
	function getIpAddress() {
		const hostname = window.location.hostname;

		const indexOfColon = hostname.indexOf(':');

		if(indexOfColon !== -1) {
			return hostname.substring(0, indexOfColon);
		}

		return hostname;
	}

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

    const handleLog = (item) =>{
        if(type === "REQUEST"){
            axios.post(`http://${address}:8080/addLog`, {
            type: type,
            description: "Requested " + number +`x of: "[${item.iid}] - ${item.description.name}" By: ` + remarks
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
        }else if(type === "BORROW"){
            axios.post(`http://${address}:8080/addLog`, {
            type: type,
            description: `Borrowed "[${item.iid}] - ${item.description.name}" By: ` + remarks
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
        }else if(type === "REPAIR") {
            axios.post(`http://${address}:8080/addLog`, {
            type: type,
            description: `"[${item.iid}] - ${item.description.name}" sent for repairs By: ` + remarks
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
        }else if(type === "DISPOSAL") {
            axios.post(`http://${address}:8080/addLog`, {
            type: type,
            description: `"[${item.iid}] - ${item.description.name}" sent for disposal By: ` + remarks
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
        }
        
    }

    const handleQuanti = () =>{
        axios.get(`http://${address}:8080/item/quantiLog`,{
            params: {
                num: id
            }
        })
        .then(result => {
            console.log(result.data);

                if(result.data >= parseInt(number)){
                    axios.put(`http://${address}:8080/item/requestItem`, null, {
                        params: {
                            number: parseInt(number),
                            itemId: id
                        }
                    })
                    .then(result => {
                        // alert("Request Successful!")
                        setSnackbarMessage(`Reqested ${number}x of: [${result.data.iid}] - ${result.data.description.name} successfully!`);
                        setSnackbarGreenOpen(true);
                        console.log(result.data);
                        handleLog(result.data);
                    })
                    .catch(error => {
                        console.log(error);
                        // alert("No Data found!");
                        setSnackbarMessage("No data found!");
                        setSnackbarRedOpen(true);
                    });
                }else{
                    // alert("Not available")
                    setSnackbarMessage("Not available!");
                    setSnackbarRedOpen(true);
                }
        })
    }

    const handleStatus = () =>{
        axios.get(`http://${address}:8080/item/statusLog`, {
            params: {
                type: id
            }
        })
        .then(result => {
            console.log(result.data);
            setStat(result.data);
            
            if(result.data === "AVAILABLE"){
                axios.put(`http://${address}:8080/item/updateStatus`, null, {
                    params: {
                        iid: id,
                        status: type
                    }
                })
                .then(result => {
                    // alert("Request Successful!")
                    console.log(result.data);
                    if(type === "BORROW") {
                        setSnackbarMessage(`Successfully borrowed [${result.data.iid}] - ${result.data.description.name}.`);
                    } else if(type === "REPAIR") {
                        setSnackbarMessage(`[${result.data.iid}] - ${result.data.description.name} sent for repairs successfully!`);
                    } else if(type === "DISPOSAL") {
                        setSnackbarMessage(`[${result.data.iid}] - ${result.data.description.name} sent for disposal successfully!`);
                    } else {
                        setSnackbarMessage(`Requested [${result.data.iid}] - ${result.data.description.name} sucessfully!`);
                    }
                    setSnackbarGreenOpen(true);
                    handleLog(result.data);
                })
                .catch(error => {
                    console.log(error);
                    // alert("No Data found!");
                    setSnackbarMessage("No data found!");
                    setSnackbarRedOpen(true);
                });
            } else {
                // alert("Item not available!");
                setSnackbarMessage("Item not available!");
                setSnackbarRedOpen(true);
            }
        })
        .catch(error => {
            console.log(error);
            // alert("No Data found!");
            setSnackbarMessage("No data found!");
            setSnackbarRedOpen(true);
        });
    }

    const handleRequest = () => {
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
            
            <div className="flex justify-center">
                <div className="w-full mt-32 ml-52 max-w-md">
                    <div className=" bg-maroon py-2 px-7 rounded-t-md border border-maroon"></div>
                    <div className="bg-white shadow-2xl px-8 pt-1 pb-8 mb-0"> 
                        <div className="p-6 mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1"> 
                            <p className="m-auto sm:col-span-1 text-xl font-bold font-sans">Request</p>  

                            <div className="sm:col-span-1">
                                <select onChange={handleType}  
                                    className="border border-gray-700 rounded-md ml-2 p-2 w-80 bg-gray-800 text-white text-sm hover:bg-gray-950">
                                    <option value="">Type of Request</option>
                                    <option value="REQUEST">Request</option>
                                    <option value="BORROW">Borrow items</option>
                                    <option value="REPAIR">Out for Repair</option>
                                    <option value="DISPOSAL">Out for disposal</option>
                                </select>
                            </div>
        
                            <div className="sm:col-span-1"> 
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="propertyTag"
                                        id="propertyTag"
                                        onChange={handleId}
                                        placeholder=""
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
                                    />
                                    <label
                                        htmlFor="propertyTag"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                    >
                                        Enter Property Tag
                                    </label>
                                </div>
                            </div>
       

                            <div className="sm:col-span-1"> 
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="request"
                                        id="request"
                                        onChange={handleRemark}
                                        placeholder=""
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
                                    />
                                    <label
                                        htmlFor="request"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                    >
                                        Requested by:
                                    </label>
                                </div>
                            </div>
            

                            <div className="sm:col-span-1"> 
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="quantity"
                                        id="quantity"
                                        onChange={handleNumber}
                                        placeholder=""
                                        disabled={type === "BORROW" || type === "REPAIR" || type === "DISPOSAL"}
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
                                    />
                                    <label
                                        htmlFor="quantity"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                    >
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
    );
}
