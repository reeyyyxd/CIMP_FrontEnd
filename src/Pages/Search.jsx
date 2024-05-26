import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';

import Home from "./Home";

export default function Search( {user, setUser} ) {

    const [search, setSearch] = useState("");
    const [queryResults, setQueryResults] = useState([])
    const [selectedItem, setSelectedItem] = useState({});
    const [showOverlay, setShowOverlay] = useState(false);
    const address = getIpAddress();
	
	function getIpAddress() {
		const hostname = window.location.hostname;

		const indexOfColon = hostname.indexOf(':');

		if(indexOfColon !== -1) {
			return hostname.substring(0, indexOfColon);
		}

		return hostname;
	}

    const handleSearch = event =>{
        setSearch(event.target.value);
    }

    const handleFetchSearch = () =>{
        axios.get(`http://${address}:8080/item/search`,{
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
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Description</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
        `;
        queryResults.forEach(item => {
            printableContent += `
                <tr>
                    <td>${item.quantity}</td>
                    <td>${item.unitOfMeasurement}</td>
                    <td>${item.description ? item.description.name : 'None'}</td>
                    <td>${item.remarks}</td>
                </tr>
            `;
        });
        printableContent += `
                </tbody>
            </table>
        `;
        return printableContent;
    }
    const handleRowClick = (item) => {
        setSelectedItem(item);
        setShowOverlay(true);
        //setQueryResults(item);
        //const url = `/viewAll?${createSearchParams({ id: item.iid }).toString()}`;
      
          // Programmatically navigate to the URL
          //window.open(url, '_blank');
      };

      const handleCloseOverlay = () => {
        setShowOverlay(false);
        setSelectedItem({}); // Reset selectedItem to an empty object
      };

    return(
        <> 
        <Home user={user} setUser={setUser} />
          <div className="flex justify-start ml-60 mt-36 relative text-white">
          <input 
            type="Search" 
            name="Search" 
            placeholder="Search" 
            className="bg-gray-600 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
            onChange={handleSearch}
            />
            <button 
            type="submit" 
            className="absolute center-0 top-0 mt-3 ml-48"
            onClick={handleFetchSearch}
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
            </svg>
                </button>
               
            &nbsp;&nbsp;&nbsp;
            <Button 
            variant="outlined" 
            onClick={handlePrintTable}
            style={{ 
                color: 'black', 
                borderColor: '#f8c702', 
                backgroundColor:'#f8c702' 
         
                }}>
                Print<PrintIcon />
            </Button>
            </div>
            <div className="container flex justify-center mx-auto ml-32 mt-2 overflow-y-auto max-h-[500px]"> 
                        <table className="w-full text-sm text-center rtl:text-right ml-28 mr-1 text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-maroon dark:text-white hover:bg-red-900 sticky top-0">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Property Tag
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Invoice Number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Issue Order Number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Serial Number
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {queryResults.map(item => 
                                !item.deleted && (
                                    <tr key={item.iid} onClick={() => handleRowClick(item)} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.iid}
                                        </th>
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

                        {showOverlay && selectedItem &&(
                        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                        <div className="bg-white bg-opacity-95 rounded-md shadow-md">
                          <h2 className="font-mono text-lg text-center font-semibold text-maroon bg-yellow-400 mb-4 py-3 px-4 rounded-none border border-yellow-400 m-0">
                            FULL INFORMATION
                          </h2>     
                          <div className="p-6 mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-7">
                          {[
                            { label: 'Property Tag ', value: selectedItem.iid },
                            { label: 'Account Person', value: selectedItem.accPerson },
                            { label: 'Department', value: selectedItem.department },
                            { label: 'Designation', value: selectedItem.designation },
                            { label: 'Invoice Date', value: selectedItem.invoiceDate },
                            { label: 'Invoice Number', value: selectedItem.invoiceNumber },
                            { label: 'Issue Order', value: selectedItem.issueOrder },
                            { label: 'Supplier', value: selectedItem.supplier },
                            { label: 'Lifespan', value: selectedItem.lifespan },
                            { label: 'Unit of Measurement', value: selectedItem.unitOfMeasurement },
                            { label: 'Quantity', value: selectedItem.quantity },
                            { label: 'Unit Cost', value: `₱ ${selectedItem.unitCost.toLocaleString()}`},
                            { label: 'Total Cost', value: `₱ ${selectedItem.totalCost.toLocaleString()}`},
                            { label: 'Status', value: selectedItem.status },
                            { label: 'Remarks', value: selectedItem.remarks },
                        ].map(({ label, value }) => (
                            <div key={label} className="sm:col-span-1">
                              <label className="block text-sm font-medium leading-6 text-gray-900">{label}:</label>
                              <div className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 pointer-events-none cursor-default">
                                {value}
                              </div>
                            </div>
                          ))}
                        <div className="sm:col-span-1">
                        {selectedItem.location ? (
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                        Building:
                    </label>
                    <div className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 pointer-events-none cursor-default">
                            {selectedItem.location.building} 
                            </div>
                        </div>
                        ) : (
                        <div>No location data available</div>
                        )}
                        </div>
                        
                        <div className="sm:col-span-1">
                        {selectedItem.location ? ( 
                        <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                        Room:
                    </label>
                    <div className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 pointer-events-none cursor-default">
                        {selectedItem.location.room}
                        </div>
                        </div>
                        ) : (
                        <div>No location data available</div>
                        )}
                        </div>
                        <div className="sm:col-span-1">
                                {selectedItem.description ? (
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                               Description Name:
                            </label>
                            <div className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 pointer-events-none cursor-default">
                                    {selectedItem.description.name} 
                                    </div>
                                    </div>
                                ) : (
                                <div>No description data available</div>
                                )}
                                </div>

                                <div className="sm:col-span-1">
                                {selectedItem.description ? (
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                Model:
                            </label>
                            <div className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 pointer-events-none cursor-default">
                            {selectedItem.description.model} 
                                    </div>
                                    </div>
                                ) : (
                                <div>No description data available</div>
                                )}
                                </div>
                                
                                <div className="sm:col-span-1">
                                {selectedItem.description ? (
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                Type:
                            </label>
                            <div className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 pointer-events-none cursor-default">
                                    {selectedItem.description.type} 
                                    </div>
                                    </div>
                                ) : (
                                <div>No description data available</div>
                                )}
                                </div>
                                
                                <div className="sm:col-span-1">
                                {selectedItem.description ? (
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                Serial Number::
                            </label>
                            <div className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 pointer-events-none cursor-default">
                                    {selectedItem.description.serialNumber}
                                    </div>
                                    </div>
                                ) : (
                                <div>No description data available</div>
                                )}
                                </div>
                                
                                <div className="sm:col-span-1">
                                {selectedItem.description ? (
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Other:
                            </label>
                            <div className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 pointer-events-none cursor-default">
                                    {selectedItem.description.other}
                                    </div>
                                    </div>
                                ) : (
                                <div>No description data available</div>
                                )}
                                </div>   
                            </div>
                            <button
                                onClick={handleCloseOverlay}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 ml-5 mt-7 mb-2 py-2 mr-2 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                        </div>
                        )}
                    </div>
        </>
    );
}
