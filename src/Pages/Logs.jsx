import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import Navbar from "../Extras/navbar";
import Sidebar from "../Extras/sidebar";
import ProfileDropdown from "../Extras/dropdown";
import Home from "./Home";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';



export default function ViewAll() {
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
            <Navbar/>
            <Sidebar />
            <ProfileDropdown />
            <Home />

            <Container>
                <Box mt={10} textAlign="center">
                <form className="max-w-md mx-auto">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search Property Tag:</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                   <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                   </svg>
                </div>
                        {/*<input type="text"  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Property ID" onChange={handleSpecific} />*/}
                        <TextField onChange={handleSpecific}></TextField>
                        <Button onClick={handleSearch}>Search</Button>
                        {/*<button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-maroon hover:bg-maroon focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSearch}>Search</button>*/}
                        </div>
                </form>   
             </Box>
            </Container>


        
            <Container>
            <Box mt={5} textAlign="center">
                <div className="flex justify-center items-center space-x-4">
                    <Button onClick={toggleFilter} variant="contained" color="primary">
                        {isFilterOpen ? "Hide Filter" : "Show Filter"}
                    </Button>
                    {isFilterOpen && (
                        <div className="max-w-[4rem] flex space-x-2">
                            {/* Filter options */}
                            <div>
                                <select id="data" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(event) => setMonth(event.target.value)}>
                                    <option value="" selected>Choose Month</option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                            </div>
                            <div>
                                <select id="days" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(event) => setDay(event.target.value)}>
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
                            <div>
                                <select id="years" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(event) => setYear(event.target.value)}>
                                    <option value="">Choose Year</option>
                                    {O_year.map((year, index) => (
                                        <option key={index} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select id="types" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(event) => setType(event.target.value)}>
                                    <option value="">Choose Type</option>
                                    {O_type.map((type, index) => (
                                        <option key={index} value={type}>{type}</option>
                                    ))}
                                </select>


                                <input type="time" onChange={handleBef} id="before"></input>
                                <input type="time" onChange={handleAft} id="after"></input>
                            </div>
                            <Button onClick={handleFilter} variant="contained" color="primary">
                                Filter
                            </Button>
                        </div>
                    )}
                </div>
            </Box>
        </Container>
    



                <Container>
                <Box mt={5} textAlign="center">
            <div className="container mx-1 mt-4">
                <div className="flex justify-center">
                <div className="ml-1 mr-1   ">  
                    <table className="w-full text-sm text-left rtl:text-right ml-28 mr-40 text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-red-900 dark:text-white hover:bg-red-950">
                            <tr>
                                <th scope="col" className="px-6 py-3">Log Id</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Time</th>
                                <th scope="col" className="px-6 py-3">Property Tag</th>
                                <th scope="col" className="px-6 py-3">Type</th>
                                <th scope="col" className="px-6 py-3">User</th>
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
                                    <td>{res.user ? (<p>{res.user.user_id}</p>) : (<div>None</div>)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        
            </Box>
    </Container>



            
            
        
    
        </>
    );
}
