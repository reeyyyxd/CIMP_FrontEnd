import { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { Link, createSearchParams } from "react-router-dom";

import Navbar from "../Extras/navbar";
import Sidebar from "../Extras/sidebar";
import ProfileDropdown from "../Extras/dropdown";
import Home from "./Home";

export default function Search( {user, setUser} ) {

    const [search, setSearch] = useState("");
    const [queryResults, setQueryResults] = useState([])

    const handleSearch = event =>{
        setSearch(event.target.value);
    }

    const handleFetchSearch = event =>{
        axios.get("http://localhost:8080/item/search",{
            params: {
                search: search
            }
        })
        .then(result => {
            setQueryResults(result.data)
         })
         .catch(error => {
            console.log(error)
            alert("service error")
         })
    }

    const handlePrintTable = () => {
        const printableContent = generatePrintableTable();
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printableContent);
        printWindow.document.close();
        printWindow.print();
    }

    const generatePrintableTable = () => {
        let printableContent = `
            <style>
                table {
                    border-collapse: collapse;
                    width: 100%;
                }
                th, td {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
            <table>
                <thead>
                    <tr>
                        <th>Property Tag</th>
                        <th>Invoice Number</th>
                        <th>Issue Order Number</th>
                        <th>Serial Number</th>
                    </tr>
                </thead>
                <tbody>
        `;
        queryResults.forEach(item => {
            printableContent += `
                <tr>
                    <td>${item.iid}</td>
                    <td>${item.invoiceNumber}</td>
                    <td>${item.issueOrder}</td>
                    <td>${item.description ? item.description.serialNumber : 'None'}</td>
                </tr>
            `;
        });
        printableContent += `
                </tbody>
            </table>
        `;
        return printableContent;
    }

    return(
        <>
         <Navbar/>
        <Sidebar />
        <ProfileDropdown />
        <Home user={user} setUser={setUser} />
            <div class="flex justify-start ml-60 mt-28 relative text-white">
            <input 
            type="search" 
            name="search" 
            placeholder="Search" 
            class="bg-gray-600 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
            onChange={handleSearch} 
            />
            <Button 
            type="submit" 
            class="absolute center-0 top-0 mt-3 ml-48"
            onClick={handleFetchSearch}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
                </svg>
                </Button>
            & 
            <Button 
            variant="outlined" 
            onClick={handlePrintTable}
            style={{ 
                color: 'black', 
                borderColor: 'black' 
                }}>
                Print<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
            </svg>
            </Button>
            </div>
            <div class="container flex justify-center mx-auto ml-32 mt-2"> 
                        <table class="w-full text-sm text-center rtl:text-right ml-28 mr-40 text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-maroon dark:text-white hover:bg-red-900">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Property Tag
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Invoice Number
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Issue Order Number
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Serial Number
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {queryResults.map(item => (
                                    <tr key={item.iid} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-950">
                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <Link onClick={() => {
                                                const url = `/viewAll?${createSearchParams({ id: item.iid }).toString()}`;
                                                window.open(url, '_blank');
                                            }}>{item.iid}</Link>
                                        </td>
                                        <td>{item.invoiceNumber}</td>
                                        <td>{item.issueOrder}</td>
                                        <td>
                                            {item.description ? (
                                                <div>
                                                    <p>{item.description.serialNumber}</p>
                                                </div>
                                            ) : (
                                                <div>None</div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
        </>
    );
}
