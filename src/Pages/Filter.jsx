import { Button, TextField } from "@mui/material";
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { useNavigate,Link, useSearchParams, createSearchParams } from "react-router-dom";
import '../App.css';

import Navbar from "../Extras/navbar";
import Sidebar from "../Extras/sidebar";
import ProfileDropdown from "../Extras/dropdown";
import Home from "./Home";
export default function Filter( {user, setUser} ) 
{

  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);
  const [queryResults, setQueryResults] = useState([])


    const [O_accPer, setO_accPer] = useState([])
    const [O_dep, setO_dep] = useState([])
    const [O_des, setO_des] = useState([])
    const [O_uom, setO_uom] = useState([])
    const [O_status, setO_status] = useState([])
    const [O_supp, setO_supp] = useState([])
    const [O_building, setO_building] = useState([])
    const [O_room, setO_room] = useState([])
    const [O_name, setO_name] = useState([])
    const [O_model, setO_model] = useState([])
    const [O_type, setO_type] = useState([])
    const [O_invoicedate, setO_invoicedate] = useState([])
    const [O_lifespan, setO_lifespan] = useState([])
    const [O_sum, setO_sum] = useState([])


    const [acc_per, setacc_per] = useState("")
    const [department, setdepartment] = useState("")
    const [designation, setdesignation] = useState("")
    const [status, setstatus] = useState("")
    const [uom, setuom] = useState("")
    const [supplier, setsupplier] = useState("")
    const [building, setbuilding] = useState("")
    const [room, setroom] = useState("")
    const [name, setname] = useState("")
    const [model, setmodel] = useState("")
    const [type, settype] = useState("")
    const [invoicedate, setinvoicedate] = useState("")
    const [lifespan, setlifespan] = useState("")


    const handleaccPer = event => {
      setacc_per(event.target.value)
    }

    const handleDep = event => {
      setdepartment(event.target.value)
    }

    const handleDes = event => {
      setdesignation(event.target.value)
    }

    const handleStat = event => {
      setstatus(event.target.value)
    }

    const handleUom = event => {
      setuom(event.target.value)
    }

    const handleSupp = event => {
      setsupplier(event.target.value)
    }

    const handleBuilding = event => {
      setbuilding(event.target.value)
    }

    const handleRoom = event => {
      setroom(event.target.value)
    }

    const handleName = event => {
      setname(event.target.value)
    }

    const handleType = event => {
      settype(event.target.value)
    }

    const handleModel = event => {
      setmodel(event.target.value)
    }

    const handleInvoice = event => {
      setinvoicedate(event.target.value)
    }

    const handleLifespan = event => {
      setlifespan(event.target.value)
    }

    const handleSum = event => {
      setO_sum(event.target.value)
    }
    



const handleFilter = () => {
    //console.log({ acc_per,department,designation,status,uom,supplier,building,room,name,model,type,invoicedate,lifespan })

      axios
      .get("http://localhost:8080/item/filter", {
        params: {
          acc_per: acc_per,
          department: department,
          designation: designation,
          status: status,
          uom: uom,
          supplier: supplier,
          building: building,
          room: room,
          name: name,
          model: model,
          type: type,
          invoice_date: invoicedate,
          lifespan: lifespan
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
  
  
useEffect(() => {
    fetchO_accPer();
  }, []);

const fetchO_accPer = async () => {
  try {
    const response = await axios.get("http://localhost:8080/item/accPer") 
    const uniqueOptions_accPer = [...new Set(response.data)] // Remove duplicates
    setO_accPer(uniqueOptions_accPer)
  } catch (error) {
    console.error("Error fetching options:", error)
  }
}

useEffect(() => {
  fetchO_dep();
}, []);

const fetchO_dep = async () => {
try {
  const response = await axios.get("http://localhost:8080/item/dep") 
  const uniqueOptions_dep = [...new Set(response.data)] // Remove duplicates
  setO_dep(uniqueOptions_dep)
} catch (error) {
  console.error("Error fetching options:", error)
}
}

useEffect(() => {
  fetchO_des();
}, []);

const fetchO_des = async () => {
try {
  const response = await axios.get("http://localhost:8080/item/des") 
  const uniqueOptions_des = [...new Set(response.data)] // Remove duplicates
  setO_des(uniqueOptions_des)
} catch (error) {
  console.error("Error fetching options:", error)
}
}

useEffect(() => {
  fetchO_uom();
}, []);

const fetchO_uom = async () => {
try {
  const response = await axios.get("http://localhost:8080/item/uom") 
  const uniqueOptions_uom = [...new Set(response.data)] // Remove duplicates
  setO_uom(uniqueOptions_uom)
} catch (error) {
  console.error("Error fetching options:", error)
}
}

useEffect(() => {
  fetchO_stat();
}, []);

const fetchO_stat = async () => {
try {
  const response = await axios.get("http://localhost:8080/item/status") 
  const uniqueOptions_stat = [...new Set(response.data)] // Remove duplicates
  setO_status(uniqueOptions_stat)
} catch (error) {
  console.error("Error fetching options:", error)
}
}

useEffect(() => {
  fetchO_supp();
}, []);

const fetchO_supp = async () => {
try {
  const response = await axios.get("http://localhost:8080/item/supplier") 
  const uniqueOptions_suppp = [...new Set(response.data)] // Remove duplicates
  setO_supp(uniqueOptions_suppp)
} catch (error) {
  console.error("Error fetching options:", error)
}
}

useEffect(() => {
  fetchO_building();
}, []);

const fetchO_building = async () => {
try {
  const response = await axios.get("http://localhost:8080/item/building") 
  const uniqueOptions_building = [...new Set(response.data)] // Remove duplicates
  setO_building(uniqueOptions_building)
} catch (error) {
  console.error("Error fetching options:", error)
}
}

useEffect(() => {
  fetchO_room();
}, []);

const fetchO_room = async () => {
try {
  const response = await axios.get("http://localhost:8080/item/room") 
  const uniqueOptions_room = [...new Set(response.data)] // Remove duplicates
  setO_room(uniqueOptions_room)
} catch (error) {
  console.error("Error fetching options:", error)
}
}

useEffect(() => {
  fetchO_name();
}, []);

const fetchO_name = async () => {
try {
  const response = await axios.get("http://localhost:8080/item/name") 
  const uniqueOptions_name = [...new Set(response.data)] // Remove duplicates
  setO_name(uniqueOptions_name)
} catch (error) {
  console.error("Error fetching options:", error)
}
}

useEffect(() => {
  fetchO_model();
}, []);

const fetchO_model = async () => {
try {
  const response = await axios.get("http://localhost:8080/item/model") 
  const uniqueOptions_model = [...new Set(response.data)] // Remove duplicates
  setO_model(uniqueOptions_model)
} catch (error) {
  console.error("Error fetching options:", error)
}
}

useEffect(() => {
  fetchO_type();
}, []);

const fetchO_type = async () => {
try {
  const response = await axios.get("http://localhost:8080/item/type") 
  const uniqueOptions_type = [...new Set(response.data)] // Remove duplicates
  setO_type(uniqueOptions_type)
} catch (error) {
  console.error("Error fetching options:", error)
}
}

useEffect(() => {
  fetchO_invoice();
}, []);

const fetchO_invoice = async () => {
try {
  const response = await axios.get("http://localhost:8080/item/invoice") 
  const uniqueOptions_invoice = [...new Set(response.data)] // Remove duplicates
  setO_invoicedate(uniqueOptions_invoice)
} catch (error) {
  console.error("Error fetching options:", error)
}
}

useEffect(() => {
  fetchO_lifespan();
}, []);

const fetchO_lifespan = async () => {
try {
  const response = await axios.get("http://localhost:8080/item/lifespan") 
  const uniqueOptions_lifespan = [...new Set(response.data)] // Remove duplicates
  setO_lifespan(uniqueOptions_lifespan)
} catch (error) {
  console.error("Error fetching options:", error)
}
}


const fetchO_sum = () => {
  
  

  
    axios
    .get("http://localhost:8080/item/sum", {
      params: {
        acc_per: acc_per,
        department: department,
        designation: designation,
        status: status,
        uom: uom,
        supplier: supplier,
        building: building,
        room: room,
        name: name,
        model: model,
        type: type,
        invoice_date: invoicedate,
        lifespan: lifespan
      }
    })
    .then(result => {
      //console.log(result.data)
      
      setO_sum(result.data)
      
    })
    .catch(error => {
      console.log(error)
      alert("No Data Found!")

      setO_sum("")
    })
  
      
    
};

const goHome = () => {
  navigate("/home")
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
                  <th>Accountable Person</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>invoiceDate</th>
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
              <td>${item.accPerson}</td>
              <td>${item.department}</td>
              <td>${item.designation}</td>
              <td>${item.invoiceDate}</td>
              <td>${item.description ? item.description.serialNumber : 'None'}</td>
          </tr>
      `;
  });
  printableContent += `
          </tbody>
      </table>
      <p>Total Cost: ${O_sum}</p>
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

    return (
        <>
        <Home user={user} setUser={setUser} />

        <div class="ml-60 mt-28">
        <div className="p-6 mt-4 grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-7">
      <div className="sm:col-span-1">
        <select onChange={handleaccPer}
        className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
          <option value="">Accountable Person</option>
          {O_accPer.map((O_accPers, index) => (
            <option key={index} value={O_accPers}>
              {O_accPers}
            </option>
          ))}
        </select>
        </div>

      <div className="sm:col-span-1">  
        <select onChange={handleDep}
        className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">  
          <option value="">Deparment</option>
          {O_dep.map((O_deps, index) => (
            <option key={index} value={O_deps}>
              {O_deps}
            </option>
          ))}
        </select>
        </div>

        <div className="sm:col-span-1">
          <select onChange={handleDes}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Designation</option>
            {O_des.map((O_dess, index) => (
              <option key={index} value={O_dess}>
                {O_dess}
              </option>
            ))}
          </select>
          </div>

        <div className="sm:col-span-1">
          <select onChange={handleUom}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Uom</option>
            {O_uom.map((O_uoms, index) => (
              <option key={index} value={O_uoms}>
                {O_uoms}
              </option>
            ))}
          </select>
          </div>

          <div className="sm:col-span-1">
          <select onChange={handleStat}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Status</option>
            {O_status.map((O_statuss, index) => (
              <option key={index} value={O_statuss}>
                {O_statuss}
              </option>
            ))}
          </select>
          </div>

          <div className="sm:col-span-1">
          <select onChange={handleSupp}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Supplier</option>
            {O_supp.map((O_supps, index) => (
              <option key={index} value={O_supps}>
                {O_supps}
              </option>
            ))}
          </select>
          </div>

          <div className="sm:col-span-1">
          <select onChange={handleBuilding}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Location Building</option>
            {O_building.map((O_buildings, index) => (
              <option key={index} value={O_buildings}>
                {O_buildings}
              </option>
            ))}
          </select>
          </div>

        <div className="sm:col-span-1">
          <select onChange={handleRoom}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Location Room</option>
            {O_room.map((O_rooms, index) => (
              <option key={index} value={O_rooms}>
                {O_rooms}
              </option>
            ))}
          </select>
          </div>

        <div className="sm:col-span-1">
          <select onChange={handleName}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Description Name</option>
            {O_name.map((O_names, index) => (
              <option key={index} value={O_names}>
                {O_names}
              </option>
            ))}
          </select>
          </div>

        <div className="sm:col-span-1">
          <select onChange={handleModel}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Description Model</option>
            {O_model.map((O_models, index) => (
              <option key={index} value={O_models}>
                {O_models}
              </option>
            ))}
          </select>
          </div>

        <div className="sm:col-span-1">
          <select onChange={handleType}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Description Type</option>
            {O_type.map((O_types, index) => (
              <option key={index} value={O_types}>
                {O_types}
              </option>
            ))}
          </select>
          </div>

          <div className="sm:col-span-1">
          <select onChange={handleInvoice}
              className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
              <option value="">Invoice Date</option>
              {O_invoicedate
                  .sort((a, b) => new Date(a) - new Date(b)) // Sort the dates in ascending order
                  .map((invoicedate, index) => (
                      <option key={index} value={invoicedate}>
                          {invoicedate}
                      </option>
                  ))}
          </select>
          </div>
          
          <div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div>
          </div>
          </div>
         
          <h1><p></p> 
          <div class="flex justify-start ml-64 mt-5 md:col-span-2">
            <Button 
              variant="outlined" 
              onClick={function(){ handleFilter(); fetchO_sum()}}
              style={{ 
                color: 'black', 
                borderColor: 'black' 
              }}>
                Filter<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
            </Button> &nbsp;
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
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;
              <label id="sumLabel" onChange={handleSum}>Total Cost: {O_sum}</label>
          </div>
          </h1>   

          <div class="ml-64 mr-5 mt-2 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="h-1 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-maroon dark:text-white hover:bg-red-900">
              <tr>
                <th scope="col" class="px-6 py-1">
                  property tag</th>
                <th scope="col" class="px-6 py-1">
                  Accountable Person</th>
                <th scope="col" class="px-6 py-1">
                  Department</th>
                <th scope="col" class="px-6 py-1">
                  Designation</th>
                <th scope="col" class="px-6 py-1">
                invoiceNumber</th>
                <th scope="col" class="px-6 py-3">
                  InvoiceDate</th>
                <th scope="col" class="px-6 py-3">
                  Issue Order Number</th>
                <th scope="col" class="px-6 py-3">
                  Supplier</th>
                <th scope="col" class="px-6 py-3">
                  lifespan</th>
                <th scope="col" class="px-6 py-3">
                  UOM</th>
                <th scope="col" class="px-6 py-3">
                  Quantity</th>
                <th scope="col" class="px-6 py-3">
                  Unit Cost</th>
                <th scope="col" class="px-6 py-3">
                  Total Cost</th>
                <th scope="col" class="px-6 py-3">
                  Status</th>
                <th scope="col" class="px-6 py-3">
                  Remarks</th>
              </tr>
            </thead>
            <tbody>
              {queryResults.map(item => 
              !item.deleted && (
                <tr key={item.iid} onClick={() => handleRowClick(item)} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.iid}
                        </th> 
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
                    </tr>
              ))}
            </tbody>
          </table>

          {showOverlay && selectedItem &&(
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
            
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">FULL INFORMATION</h2>
              <p>{selectedItem.iid}</p>
              <p>{selectedItem.accPerson}</p>
              <p>{selectedItem.department}</p>
              <p>{selectedItem.designation}</p>
              <p>{selectedItem.invoiceDate}</p>
              <p>{selectedItem.invoiceNumber}</p>
              <p>{selectedItem.issueOrder}</p>
              <p>{selectedItem.supplier}</p>
              <p>{selectedItem.lifespan}</p>
              <p>{selectedItem.unitOfMeasurement}</p>
              <p>{selectedItem.quantity}</p>
              <p>{selectedItem.unitCost}</p>
              <p>{selectedItem.totalCost}</p>
              <p>{selectedItem.status}</p>
              <p>{selectedItem.remarks}</p>
              {selectedItem.location ? (
                <div>
                  Building: {selectedItem.location.building}, Room: {selectedItem.location.room}
                </div>
              ) : (
                <div>No location data available</div>
              )}
              {selectedItem.description ? (
                <div>
                  Name: {selectedItem.description.name}, Model: {selectedItem.description.model}, Type: {selectedItem.description.type}
                  <p>Serial Number: {selectedItem.description.serialNumber}</p>
                  <p>Other: {selectedItem.description.other}</p>
                </div>
              ) : (
                <div>No description data available</div>
              )}
            </div>
            <button
									onClick={handleCloseOverlay}
									className="bg-gray-400 text-white px-4 py-2 mr-2 rounded-md"
								>
									Cancel
								</button>
          </div>
        </div>
      )}
          </div>
          </>
    )
}

