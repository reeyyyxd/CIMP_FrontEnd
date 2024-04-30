import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { useNavigate,Link, useSearchParams, createSearchParams } from "react-router-dom";

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

        

            <><p>Search:</p><TextField onChange={handleSearch} variant="filled"></TextField><p>

            </p><Button onClick={handleFetchSearch}>Search</Button><div class="mx-auto ml-32 mt-2">
            


                <div class="container flex justify-center">

                

                    <div class="overflow-x-auto">
                        <table class=" text-left rtl:text-right ml-28 mr-28 text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-red-900 dark:text-white">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        property tag</th>
                                    <th scope="col" class="px-6 py-3">
                                        invoiceNumber</th>
                                    <th scope="col" class="px-6 py-3">
                                        Issue Order Number</th>
                                    <th scope="col" class="px-6 py-3">
                                        Serial Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {queryResults.map(item => (
                                    <tr key={item.iid} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><Link onClick={() => {
                                            const url = `/viewAll?${createSearchParams({ id: item.iid }).toString()}`;
                                            window.open(url, '_blank');
                                        } }>{item.iid}</Link></td>
                                        <td>{item.invoiceNumber}</td>
                                        <td>{item.issueOrder}</td>
                                        <td>{item.description ? (
                                             <div>
                                            <p>{item.description.serialNumber}</p>
                                            </div>
                                            ) : (
                                            <div>None</div>
                                            )
                                            }  
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div></>    

    );
}