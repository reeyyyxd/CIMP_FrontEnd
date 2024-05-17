import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import Navbar from "../Extras/navbar";
import Sidebar from "../Extras/sidebar";
import ProfileDropdown from "../Extras/dropdown";
import Home from "./Home";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';



export default function ViewAll( {user, setUser} ) {
    const [queryResults, setQueryResults] = useState([]);
    const [specific, setSpecific] = useState("");
    const [month, setMonth] = useState("");
    const [O_year, O_setYear] = useState([]);
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    const [O_type, O_setType] = useState([]);
    const [type, setType] = useState("");
    const [bef, setBef] = useState("");
    const [aft, setAft] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleBef = event => {
        setBef(event.target.value);
    }

    const handleAft = event => {
        setAft(event.target.value);
    }
    
    const handleSpecific = event => {
        setSpecific(event.target.value);
    }


    useEffect(() => {
        fetchType();
        fetchYear();
    }, []);

    const fetchType = async () => {
        try {
            const response = await axios.get("http://localhost:8080/item/logstype");
            const uniqueOptions_type = [...new Set(response.data)]; 
            O_setType(uniqueOptions_type);
        } catch (error) {
            console.error("Error fetching options:", error);
        }
    };

    const fetchYear = async () => {
        try {
            const response = await axios.get("http://localhost:8080/item/logsyear");
            const uniqueOptions_year = [...new Set(response.data)]; 
            O_setYear(uniqueOptions_year);
        } catch (error) {
            console.error("Error fetching options:", error);
        }
    };

    const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
        return `${hours12}:${minutesStr} ${period}`;
    };

    const handleFilter = () => {
        axios
            .get("http://localhost:8080/item/searchLogs", {
                params: { month, year, day, type, bef, aft }
            })
            .then(result => {
                setQueryResults(result.data);
            })
            .catch(error => {
                console.log(error);
                alert("No Data found!");
            });
    };

    const handleSearch = () => {

        console.log(specific)

        /*if (specific === "") {  
            alert("Empty textfield");
        } else {*/
            axios
                .get("http://localhost:8080/item/logsSpeci", {
                    params: { num: specific }
                })
                .then(result => {
                    setQueryResults(result.data);
                })
                .catch(error => {
                        console.log(error);
                    alert("No Data found!");
                });
       /* }   */
    };
    const toggleFilter = () => {
        setIsFilterOpen(prevState => !prevState);
    };

    return (
        <>
            <Home user={user} setUser={setUser}/>

                    <div class="ml-60 mt-28">
                <div className="p-6 mt-4 grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-7">
                      <div className="sm:col-span-1">
                                <select id="data" onChange={(event) => setMonth(event.target.value)}
                                 className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
                                    <option value="" selected>Choose Month</option>
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="ten">October</option>
                                    <option value="eleven">November</option>
                                    <option value="twelve">December</option>
                                </select>
                                </div>
                          
                            <div className="sm:col-span-1">
                                <select id="days" onChange={(event) => setDay(event.target.value)}
                                className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
                                    <option value="">Choose Day</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="eleven">11</option>
                                    <option value="twelve">12</option>
                                    <option value="thirteen">13</option>
                                    <option value="fourteen">14</option>
                                    <option value="fifteen">15</option>
                                    <option value="sixteen">16</option>
                                    <option value="seventeen">17</option>
                                    <option value="eighteen">18</option>
                                    <option value="nineteen">19</option>
                                    <option value="twenties">20</option>
                                    <option value="twenty one">21</option>
                                    <option value="twenty two">22</option>
                                    <option value="twenty three">23</option>
                                    <option value="twenty four">24</option>
                                    <option value="twenty five">25</option>
                                    <option value="twenty six">26</option>
                                    <option value="twenty seven">27</option>
                                    <option value="twenty eight">28</option>
                                    <option value="twenty nine">29</option>
                                    <option value="thirties">30</option>
                                    <option value="thirty one">31</option>
                                </select>
                                </div>

                            <div className="sm:col-span-1">
                                <select id="years" onChange={(event) => setYear(event.target.value)}
                                className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
                                    <option value="">Choose Year</option>
                                    {O_year.map((year, index) => (
                                        <option key={index} value={year}>{year}</option>
                                    ))}
                                </select>
                                </div>
                          
                            <div className="sm:col-span-1">
                                <select id="types" onChange={(event) => setType(event.target.value)}
                                className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
                                    <option value="">Choose Type</option>
                                    {O_type.map((type, index) => (
                                        <option key={index} value={type}>{type}</option>
                                    ))}
                                </select>
                                </div>
                                </div>
                                </div>

                    <div class="flex justify-start ml-64 mt-11 relative text-white">
                        <input 
                        type="SearchPropertyTag" 
                        name="SearchPropertyTag" 
                        placeholder="Search Property Tag" 
                        class="bg-gray-600 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                        onChange={handleSpecific} 
                        />
                        <button 
                        type="submit" 
                        class="absolute center-0 top-0 mt-3 ml-48"
                        onClick={handleSearch}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
                            <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
                            </svg>
                            </button>
                    &
                    <button className="bg-yellow-400 hover:bg-yellow-300 text-maroon font-bold mb-7 py-2 px-4 border-b-4 border-yellow-600 hover:border-yellow-400 rounded"
                            onClick={handleFilter}>
                                Filter
                </button>
                           
                    <div class="ml-4 -mt-7">
                        <div class="max-w-[16rem] mx-auto grid grid-cols-2 gap-4">
                        <div>
                    <label for="start-time" 
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Start time:</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <input 
                        type="time" 
                        id="before" 
                        onChange={handleBef}
                        class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                </div>
                <div>
                    <label for="end-time" 
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">End time:</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <input 
                        type="time" 
                        id="after" 
                        onChange={handleAft}
                        class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                </div>
            </div>
        </div>
    </div>  
        <div class="mx-auto -mt-4 overflow-y-auto flex justify-center ml-52">    
                    <table className="w-full text-sm text-center rtl:text-right ml-12 mr-40 text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-maroon dark:text-white hover:bg-red-900">
                            <tr>
                                <th scope="col" className="px-6 py-3">Log Id</th>
                                <th scope="col" className="px-6 py-3">Date</th> 
                                <th scope="col" className="px-6 py-3">Time</th>
                                <th scope="col" className="px-6 py-3">Property Tag</th>
                                <th scope="col" className="px-6 py-3">Type</th>
                                <th scope="col" className="px-6 py-3">User</th>
                                <th scope="col" className="px-6 py-3">Description</th>
                            </tr>
                        </thead>
                        <tbody style={{ paddingBottom: "100px" }}>
                            {queryResults.map(res => (
                                <tr key={res.item.iid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-950">
                                    <td>{res.logid}</td>
                                    <td>{res.date}</td>
                                    <td>{convertTo12HourFormat(res.time)}</td>
                                    <td>{res.item ? (<p>{res.item.iid}</p>) : (<div>None</div>)}</td>
                                    <td>{res.type}</td>
                                    <td>{res.user ? (<p>{res.user.lname}, {res.user.fname}</p>) : (<div>None</div>)}</td>
                                    <td>{res.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
            
 
        </>
    );
}
