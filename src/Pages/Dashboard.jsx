import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Home";

export default function Dashboard( {user, setUser}) {
    const [data, setData] = useState([]);
	const address = getIpAddress();
	const columns = ["PROPERTY TAG", "ACCOUNTABLE PERSON", "UNIT COST", "QUANTITY", "TOTAL COST"];
	
	function getIpAddress() {
		const hostname = window.location.hostname;

		const indexOfColon = hostname.indexOf(':');

		if(indexOfColon !== -1) {
		return hostname.substring(0, indexOfColon);
		}

		return hostname;
	}

    useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://${address}:8080/item/itemDash`
				);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);
	

    return (
        <>
            <Home user={user} setUser={setUser} />       
			
			<div className="flex ml-64 mr-5 mt-32 sm:rounded-lg space-x-10">
            <div className="flex-1">
                <table className="h-1 text-xs text-center rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-maroon dark:text-white hover:bg-red-900">
					<tr>
						{columns.map(column => ( // generate table headers based on a predefined set of column names (almeda gwapo)
							<th scope="col" className="px-6 py-3" key={column}>
								{column}
							</th>
						))}
					</tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.iid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.iid}
                                </td>
                                <td className="px-6 py-4">
                                    {item.accPerson}
                                </td>
                                <td className="px-6 py-4">
                                    {item.unitCost}
                                </td>
                                <td className="px-6 py-4">
                                    {item.quantity}
                                </td>
                                <td className="px-6 py-4">
                                    {item.totalCost}
                                </td>                            
                            </tr>       
                        ))}     
                    </tbody>
                </table>
            </div>
            <div className="flex-1">
                <table className="h-1 text-xs text-center rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-maroon dark:text-white hover:bg-red-900">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                PROPERTY TAG
                            </th>
                            <th scope="col" className="px-6 py-3">
                                USER
                            </th>
                            <th scope="col" className="px-6 py-3">
                                TYPE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                DATE
                            </th> 
                            <th scope="col" className="px-6 py-3">
                                TIME
                            </th>   
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.iid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.iid}
                                </td>
                                <td className="px-6 py-4">
                                    {item.accPerson}
                                </td>
                                <td className="px-6 py-4">
                                    {item.unitCost}
                                </td>
                                <td className="px-6 py-4">
                                    {item.quantity}
                                </td>
                                <td className="px-6 py-4">
                                    {item.totalCost}
                                </td>                            
                            </tr>       
                        ))}     
                    </tbody>
                </table>
            </div>
        </div>          
    </>
);
};