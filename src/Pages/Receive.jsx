import axios from "axios";
import Home from "./Home";
import { useState } from "react";

export default function Receive( {user, setUser, setSnackbarGreenOpen, setSnackbarRedOpen, setSnackbarMessage } ) {

    const [id, setId] = useState("");
    const [remarks, setRemarks] = useState("");
    const [other, setOther] = useState("");
    const [queryResults, setQueryResults] = useState([]);
    const [LqueryResults, LsetQueryResults] = useState([]);
    const address = getIpAddress();
	
	function getIpAddress() {
		const hostname = window.location.hostname;

		const indexOfColon = hostname.indexOf(':');

		if(indexOfColon !== -1) {
			return hostname.substring(0, indexOfColon);
		}

		return hostname;
	}
    
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
        axios.put(`http://${address}:8080/item/updateStatus`, null, {
            params: {
                iid: id,
                status: "AVAILABLE"
            }
        })
        .then(result => {
            // alert("Item Received");
            setSnackbarMessage(`"[${result.data.iid}] - ${result.data.description.name}" received from ` + remarks);
            setSnackbarGreenOpen(true);
            console.log(result.data);
            handleLog(result.data);
        })
        .catch(error => {
            console.log(error);
            // alert("No Data found!");
            setSnackbarMessage("No data found.");
            setSnackbarRedOpen(true);
        });
    }

    const handleLog = (item) => {
        axios.post(`http://${address}:8080/addLog`, {
            type: "RECEIVE",
            description: `Received "[${item.iid}] - ${item.description.name}" From: ` + remarks + " | Remarks: " + other
        }, {
            params: {
                uid: user.uid,
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
		<Home user={user} setUser={setUser} />
        <div className="flex justify-center">
            <div className="w-full mt-40 ml-52 max-w-md">
                <div className="bg-maroon py-2 px-4 rounded-t-md border border-maroon"></div>
                <div className="bg-white shadow-2xl px-8 pt-6 pb-8 mb-0">
                    <div className="p-6 mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                    <p className="m-auto sm:col-span-1 text-xl font-bold font-sans">Receive</p>  
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
                                    Property Tag
                                </label>
                            </div>
                        </div>

                        <div className="sm:col-span-1"> 
                            <div className="relative">
                                <input
                                    type="text"
                                    name="returnedBy"
                                    id="returnedBy"
                                    onChange={handleRemarks}
                                    placeholder=""
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
                            />
                            <label
                                htmlFor="returnedBy"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                            >
                                Returned By
                                </label>
                            </div>
                        </div>

                        <div className="sm:col-span-1"> 
                            <div className="relative">
                                <input
                                    type="text"
                                    name="otherRemarks"
                                    id="otherRemarks"
                                    onChange={handleOther}
                                    placeholder=""
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
                            />
                            <label
                                htmlFor="otherRemarks"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                            >
                                Other Remarks
                                </label>
                            </div>
                        </div>
        
                        <button className="bg-yellow-400 hover:bg-yellow-300 text-maroon font-bold py-2 px-4 border-b-4 border-yellow-600 hover:border-yellow-400 rounded"
                        onClick={handleReceive}>Receive</button> 
                    </div>
    
                </div>
                <div className=" bg-maroon py-2 px-7 rounded-b-md border border-maroon"></div>
            </div>
        </div>
        </>
    );
}
