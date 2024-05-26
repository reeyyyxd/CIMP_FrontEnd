import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Home";

export default function Dashboard({ user, setUser }) {
    const [data, setData] = useState([]);
    const address = getIpAddress();
    const [logData, setLogData] = useState([]);
    const columns = ["PROPERTY TAG", "ACCOUNTABLE PERSON", "UNIT COST", "QUANTITY", "TOTAL COST"];
    
    function getIpAddress() {
        const hostname = window.location.hostname;
        const indexOfColon = hostname.indexOf(':');
        if (indexOfColon !== -1) {
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
    }, [address]);

    useEffect(() => {
        const fetchLogsData = async () => {
            try {
                const response = await axios.get(
                    `http://${address}:8080/getAllLogs`
                );
                setLogData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchLogsData();
    }, [address]);

    const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
        return `${hours12}:${minutesStr} ${period}`;
    };

    const getRecentLogs = () => {
        // Sort logData by logid in descending order and get the most recent 10 logs
        return logData
            .slice()
            .sort((a, b) => b.logid - a.logid)
            .slice(0, 10);
    };

    return (
        <>
            <Home user={user} setUser={setUser} />       
            <div className="flex ml-64 mr-5 mt-32 sm:rounded-lg space-x-10">
                <div className="flex-1">
                    <table className="h-1 text-xs text-center rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-maroon dark:text-white hover:bg-red-900">
                            <tr>
                                {columns.map(column => (
                                    <th scope="col" className="px-7 py-3" key={column}> 
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map(item => (
                                    <tr key={item.iid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.iid}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.accPerson}
                                        </td>
                                        <td className="px-6 py-4">
                                        ₱{item.unitCost.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.quantity}
                                        </td>
                                        <td className="px-6 py-4">
                                            ₱{item.totalCost.toLocaleString()}
                                        </td>                            
                                    </tr>       
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-4">No data available</td>
                                </tr>
                            )}     
                        </tbody>
                    </table>
                </div>
                <div className="flex-1">
                <table className="h-1 text-xs text-center rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-maroon dark:text-white hover:bg-red-900">
                            <tr>
                                <th scope="col" className="px-10 py-3">Log<br></br> ID</th>
                                <th scope="col" className="px-10 py-3">User</th> 
                                <th scope="col" className="px-10 py-3">Type</th>
                                <th scope="col" className="px-10 py-3">Date</th>
                                <th scope="col" className="px-10 py-3">Time</th>
                            </tr>
                        </thead>
                        <tbody style={{ paddingBottom: "100px" }}>
                            {logData.length > 0 ? (
                                getRecentLogs().map(res => (
                                    <tr key={res.logid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            {res.logid}</td>
                                        <td>{res.user ? (<p>{res.user.lname}, {res.user.fname}</p>) : (<div>None</div>)}</td>
                                        <td>{res.type}</td>
                                        <td>{res.date}</td>
                                        <td>{convertTo12HourFormat(res.time)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-3">No logs available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>          
        </>
    );
}
