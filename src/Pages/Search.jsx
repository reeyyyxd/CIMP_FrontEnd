import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";

import Navbar from "../Extras/navbar";
import Sidebar from "../Extras/sidebar";
import ProfileDropdown from "../Extras/dropdown";
import Home from "./Home";

export default function Search() {

    const [search, setSearch] = useState("");
    const [queryResults, setQueryResults] = useState([])


    const handleSearch = event =>{
        setSearch(event.target.value);
    }

    const handleFetchSearch = event =>{
        console.log(search)

        axios.get("http://localhost:8080/item/search",{
            params: {
                search: search
            }
        })
        .then(result => {
            console.log(result.data)
  
            setQueryResults(result.data)
         })
         .catch(error => {
            console.log(error)
            alert("service error")
         })
    }



    return(

        

            <><><><><><><p>Search:</p>
            <TextField onChange={handleSearch} variant="filled"></TextField></>



            <p></p><Button onClick={handleFetchSearch}>Search</Button>

        </><p>{queryResults.iid}</p></>

            <p>{queryResults.accPerson}</p></>

            <p>{queryResults.department}</p></>
            
            <p>{queryResults.designation}</p>
            
            <p>{queryResults.invoiceDate}</p>
            
            <p>{queryResults.invoiceNumber}</p>
            
            <p>{queryResults.issueOrder}</p>
            
            <p>{queryResults.supplier}</p>
            
            <p>{queryResults.lifespan}</p>
            
            <p>{queryResults.unitOfMeasurement}</p>
            
            <p>{queryResults.quantity}</p>
            
            <p>{queryResults.unitCost}</p>
            
            <p>{queryResults.totalCost}</p>
            
            <p>{queryResults.status}</p>
            
            <p>{queryResults.remarks}</p></>

    );
}