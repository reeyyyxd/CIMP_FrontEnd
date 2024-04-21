import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../Extras/navbar";
import Sidebar from "../Extras/sidebar";
import ProfileDropdown from "../Extras/dropdown";
import Home from "./Home";


export default function Items() {
//   const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/item/getAllItems');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);
    return(
        <>
        <Navbar/>
        <Sidebar />
        <ProfileDropdown />
        <Home />
        <div class="container mx-auto ml-32 mt-8">
            <div class="container flex justify-center">
            <div class="overflow-x-auto"> 
            <table class="w-full mt-12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-red-900 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            PROPERTY TAG
                        </th>
                        <th scope="col" class="px-6 py-3">
                            ACCOUNTABLE PERSON
                        </th>
                        <th scope="col" class="px-6 py-3">
                            DEPARTMENT
                        </th>
                        <th scope="col" class="px-6 py-3">
                            DESIGNATION
                        </th>
                        <th scope="col" class="px-6 py-3">
                            INVOICE NUMBER
                        </th>
                        <th scope="col" class="px-6 py-3">
                            INVOICE DATE
                        </th>
                        <th scope="col" class="px-6 py-3">
                            ISSUE ORDER NUMBER
                        </th>
                        <th scope="col" class="px-6 py-3">
                            LIFESPAN
                        </th>
                        <th scope="col" class="px-6 py-3">
                            QUANTITY
                        </th>
                        <th scope="col" class="px-6 py-3">
                            REMARKS
                        </th> 
                        <th scope="col" class="px-6 py-3">
                            STATUS
                        </th> 
                        <th scope="col" class="px-6 py-3">
                            SUPPLIER
                        </th> 
                        <th scope="col" class="px-6 py-3">
                            TOTAL COST
                        </th> 
                        <th scope="col" class="px-6 py-3">
                            UNIT COST
                        </th> 
                        <th scope="col" class="px-6 py-3">
                            UNIT OF MEASURE
                        </th>
                        <th scope="col" class="px-6 py-3">
                            DESCRIPTION ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            LOCATION ID
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                    <tr key={item.iid} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1
                        </th>
                        <td class="px-6 py-4">
                            {item.iid}
                        </td>
                        <td class="px-6 py-4">
                            {item.accPerson}
                        </td>
                        <td class="px-6 py-4">
                            {item.department}
                        </td>
                        <td class="px-6 py-4">
                            {item.designation}
                        </td>
                        <td class="px-6 py-4">
                            {item.invoiceNumber}
                        </td>
                        <td class="px-6 py-4">
                            {item.invoiceDate}
                        </td>
                        <td class="px-6 py-4">
                            {item.issueOrder}
                        </td>
                        <td class="px-6 py-4">
                            {item.lifespan}
                        </td>  
                        <td class="px-6 py-4">
                            {item.quantity}
                        </td>
                        <td class="px-6 py-4">
                            {item.remarks}
                        </td>
                        <td class="px-6 py-4">
                            {item.status}
                        </td>  
                        <td class="px-6 py-4">
                            {item.supplier}
                        </td>
                        <td class="px-6 py-4">
                            {item.totalCost}
                        </td>
                        <td class="px-6 py-4">
                            {item.unitCost}
                        </td> 
                        <td class="px-6 py-4">
                            {item.unitOfMeasurement}
                        </td> 
                        <td class="px-6 py-4">
                            {item.did}
                        </td> 
                        <td class="px-6 py-4">
                            {item.lid}
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
};

