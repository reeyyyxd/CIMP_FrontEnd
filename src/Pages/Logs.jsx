import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";

export default function ViewAll() {

    
    const [queryResults, setQueryResults] = useState([]);

    
    const [specific, setSpecific] = useState("")


    const [month, setMonth] = useState("");
    const [O_year, O_setYear] = useState([]);
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    const [O_type, O_setType] = useState([]);
    const [type, setType] = useState("");

    const [bef, setBef] = useState("");
    const [aft, setAft] = useState("");

    const handleMonth = event => {
        setMonth(event.target.value);
    };
    const handleYear = event => {
        setYear(event.target.value);
    };
    const handleDay = event => {
        setDay(event.target.value);
    };
    const handleType = event => {
        setType(event.target.value);
    };

    const handleBef = event => {
        setBef(event.target.value);
    };
    const handleAft = event => {
        setAft(event.target.value);
    };
    const handleSpeci = event => {
      setSpecific(event.target.value);
  };





    useEffect(() => {
        fetchType();
    }, []);

    const fetchType = async () => {
        try {
            const response = await axios.get("http://localhost:8080/item/logstype");
            const uniqueOptions_type = [...new Set(response.data)]; // Remove duplicates
            O_setType(uniqueOptions_type);
        } catch (error) {
            console.error("Error fetching options:", error);
        }
    };

    useEffect(() => {
        fetchYear();
    }, []);

    const fetchYear = async () => {
        try {
            const response = await axios.get("http://localhost:8080/item/logsyear");
            const uniqueOptions_year = [...new Set(response.data)]; // Remove duplicates
            O_setYear(uniqueOptions_year);
        } catch (error) {
            console.error("Error fetching options:", error);
        }
    };

    const convertTo12HourFormat = (time) => {
        // Splitting time into hours and minutes
        const [hours, minutes] = time.split(':').map(Number);

        // Checking for AM or PM
        const period = hours >= 12 ? 'PM' : 'AM';

        // Converting hours to 12-hour format
        const hours12 = hours % 12 || 12;

        // Adding leading zeros to minutes if necessary
        const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

        // Constructing the 12-hour formatted time
        return `${hours12}:${minutesStr} ${period}`;
    };

    const handleFilter = () => {
        axios
            .get("http://localhost:8080/item/searchLogs", {
                params: {
                    month: month,
                    year: year,
                    day: day,
                    type: type,
                    bef: bef,
                    aft: aft
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
    };

    const handleSearch = () => {

      if( specific == "" ){
        alert("Empty textfield")
      }else{
        axios
            .get("http://localhost:8080/item/logsSpeci", {
                params: {
                    num:specific
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
  };



    return (
        <>
        Search properety tag:
        <TextField onChange={handleSpeci}></TextField> <Button onClick={handleSearch}>Search</Button>

        <p></p><p></p>

        

        <p><p></p></p>
            <select id="Month" onChange={handleMonth}>
                <option value="">Month</option>
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

            <select id="day" onChange={handleDay}>
                <option value="">Day</option>
                {[...Array(31).keys()].map(i => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
            </select>

            <select onChange={handleYear}>
                <option value="">Year</option>
                {O_year.map((years, index) => (
                    <option key={index} value={years}>{years}</option>
                ))}
            </select>

            <select onChange={handleType}>
                <option value="">Type</option>
                {O_type.map((types, index) => (
                    <option key={index} value={types}>{types}</option>
                ))}
            </select>

            <p></p>
            <input type="time" onChange={handleBef} id="before"></input>

            <p></p>
            <input type="time" onChange={handleAft} id="after"></input>

            <p></p>
            <Button onClick={handleFilter}>Filter</Button>

            <div className="container flex justify-center mx-auto ml-32 mt-2">
                <table className="w-full text-sm text-center rtl:text-right ml-28 mr-40 text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-red-900 dark:text-white hover:bg-red-950">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Log Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Property Tag
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {queryResults.map(res => (
                            <tr key={res.item.iid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-950">
                                <td>{res.logid}</td>
                                <td>{res.date}</td>
                                <td>{convertTo12HourFormat(res.time)}</td>
                                <td>{res.item ? (
                                    <div>
                                        <p>{res.item.iid}</p>
                                    </div>
                                ) : (
                                    <div>None</div>
                                )}</td>
                                <td>{res.type}</td>
                                <td>{res.user ? (
                                    <div>
                                        <p>{res.user.user_id}</p>
                                    </div>
                                ) : (
                                    <div>None</div>
                                )}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
