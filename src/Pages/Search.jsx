import { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { Link, createSearchParams } from "react-router-dom";

export default function Search() {

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
            <p>Search:</p>
            <TextField onChange={handleSearch} variant="filled"></TextField>
            <p></p>
            <Button onClick={handleFetchSearch}>Search</Button>
            <Button onClick={handlePrintTable}>Print</Button>
            <div class="mx-auto ml-32 mt-2">
                <div class="container flex justify-center">
                    <div class="overflow-x-auto">
                        <table class="text-left rtl:text-right ml-28 mr-28 text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-red-900 dark:text-white">
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
                                    <tr key={item.iid} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                </div>
            </div>
        </>
    );
}
