import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import TimePicker from 'react-time-picker';

export default function ViewAll() {

    const [search, setSearch] = useState("");
    const [queryResults, setQueryResults] = useState([])

    const [month, setMonth] = useState("")
    const [O_year, O_setYear] = useState([])
    const [year, setYear] = useState("")
    const [day, setDay] = useState("")
    const [O_type, O_setType] = useState([])
    const [type, setType] = useState("")

    const [bef, setBef] = useState("")
    const [aft, setAft] = useState("")


        
    const handleMonth = event =>{
        setMonth(event.target.value);
    }
    const handleYear = event =>{
        setYear(event.target.value);
    }
    const handleDay = event =>{
        setDay(event.target.value);
    }
    const handleType = event =>{
        setType(event.target.value);
    }

    const handleBef = event =>{
        setBef(event.target.value);
    }
    const handleAft = event =>{
        setAft(event.target.value);
    }



    useEffect(() => {
        fetchType();
      }, []);
    
    const fetchType = async () => {
      try {
        const response = await axios.get("http://localhost:8080/item/logstype") 
        const uniqueOptions_type = [...new Set(response.data)] // Remove duplicates
        O_setType(uniqueOptions_type)
      } catch (error) {
        console.error("Error fetching options:", error)
      }
    }

    useEffect(() => {
        fetchYear();
      }, []);
    
    const fetchYear = async () => {
      try {
        const response = await axios.get("http://localhost:8080/item/logsyear") 
        const uniqueOptions_year = [...new Set(response.data)] // Remove duplicates
        O_setYear(uniqueOptions_year)
      } catch (error) {
        console.error("Error fetching options:", error)
      }
    }


    const handleFilter = () => {
    
          axios
          .get("http://localhost:8080/item/searchLogs", {
            params: {
              month:month,
              year:year,
              day:day,
              type:type,
              /*:bef,
              aft:aft*/
            }
          })
          .then(result => {
            //console.log(result.data)
      
            setQueryResults(result.data)
          })
          .catch(error => {
            console.log(error)
            alert("No Data found!")
          })
      }

      

    return (

        <><select id="Month" onChange={handleMonth}>
            <option value="" selected>Month</option>
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
            <option value="" selected>Day</option>
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

        <select onChange={handleYear}>
            <option value="" selected>Year</option>
            {O_year.map((years, index) => (
              <option key={index} value={years}>
                {years}
              </option>
            ))}
          </select>
        
        <select onChange={handleType}>
            <option value="" selected>Type</option>
            {O_type.map((types, index) => (
              <option key={index} value={types}>
                {types}
              </option>
            ))}
          </select>

          {/*<input type="time" onChange={handleBef} ></input>


        <input type="time" onChnage={handleAft}></input>*/}

          <p></p>
          <Button onClick={handleFilter}>Search</Button>


          <div class="container flex justify-center mx-auto ml-32 mt-2"> 
                        <table class="w-full text-sm text-center rtl:text-right ml-28 mr-40 text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-red-900 dark:text-white hover:bg-red-950">
                                <tr>
                                <th scope="col" class="px-6 py-3">
                                        Log Id
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Time
                                    </th><th scope="col" class="px-6 py-3">
                                        Property Tag
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Type
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {queryResults.map(res => (
                                    <tr key={res.item} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-950">
                                        <td>{res.logid}</td>
                                        <td>{res.date}</td>
                                        <td>{res.time}</td>
                                        <td>{res.item ? (
                                                <div>
                                                    <p>{res.item.iid}</p>
                                                </div>
                                            ) : (
                                                <div>None</div>
                                            )}</td>
                                        <td>{res.type}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    </>

    )
}