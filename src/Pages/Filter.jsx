import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import '../App.css';
import Home from "./Home";

export default function Filter( {user, setUser} ) {
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

  const address = getIpAddress();
	
  function getIpAddress() {
    const hostname = window.location.hostname;

    const indexOfColon = hostname.indexOf(':');

    if(indexOfColon !== -1) {
      return hostname.substring(0, indexOfColon);
    }

    return hostname;
  }

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
        .get(`http://${address}:8080/item/filter`, {
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
      const response = await axios.get(`http://${address}:8080/item/accPer`) 
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
    const response = await axios.get(`http://${address}:8080/item/dep`) 
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
    const response = await axios.get(`http://${address}:8080/item/des`) 
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
    const response = await axios.get(`http://${address}:8080/item/uom`) 
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
    const response = await axios.get(`http://${address}:8080/item/status`) 
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
    const response = await axios.get(`http://${address}:8080/item/supplier`) 
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
    const response = await axios.get(`http://${address}:8080/item/building`) 
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
    const response = await axios.get(`http://${address}:8080/item/room`) 
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
    const response = await axios.get(`http://${address}:8080/item/name`) 
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
    const response = await axios.get(`http://${address}:8080/item/model`) 
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
    const response = await axios.get(`http://${address}:8080/item/type`) 
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
    const response = await axios.get(`http://${address}:8080/item/invoice`) 
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
    const response = await axios.get(`http://${address}:8080/item/lifespan`) 
    const uniqueOptions_lifespan = [...new Set(response.data)] // Remove duplicates
    setO_lifespan(uniqueOptions_lifespan)
  } catch (error) {
    console.error("Error fetching options:", error)
  }
  }

  const fetchO_sum = () => {
      axios
      .get(`http://${address}:8080/item/sum`, {
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
        setO_sum(result.data)
      })
      .catch(error => {
        console.log(error)
        alert("No Data Found!")

        setO_sum("")
      })
  };

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
  };


  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setSelectedItem({}); // Reset selectedItem to an empty object
  };

    return (
        <>
        <Home user={user} setUser={setUser} />

        <div className="ml-60 mt-28">
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

      {/* start */}
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
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
          <select onChange={handleLifespan}
          className="border border-gray-700 rounded-md p-2 w-40 bg-gray-800 text-white text-sm hover:bg-gray-950">
            <option value="">Lifespan</option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div><div className="sm:col-span-1">
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


          {/* end */}
          </div>
          </div>
         
          <h1><p></p> 
          <div className="flex justify-start ml-64 mt-5 md:col-span-2">
            <Button 
              variant="outlined" 
              onClick={function(){ handleFilter(); fetchO_sum()}}
              style={{ 
                color: 'black', 
                borderColor: '#f8c702',
                backgroundColor:'#f8c702'
              }}>
                Filter<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
            </Button> &nbsp;
            <Button 
              variant="outlined" 
              onClick={handlePrintTable} 
              style={{ 
                color: 'black', 
                borderColor: '#f8c702', 
                backgroundColor:'#f8c702'
                }}>
                  Print<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
              </svg>  
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;
              <label id="sumLabel" onChange={handleSum}>Total Cost: {O_sum}</label>
          </div>
          </h1>   

          <div className="ml-64 mr-5 mt-2 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="h-1 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-maroon dark:text-white hover:bg-red-900">
              <tr>
                <th scope="col" className="px-6 py-1">
                  property tag</th>
                <th scope="col" className="px-6 py-1">
                  Accountable Person</th>
                <th scope="col" className="px-6 py-1">
                  Department</th>
                <th scope="col" className="px-6 py-1">
                  Designation</th>
                <th scope="col" className="px-6 py-1">
                invoiceNumber</th>
                <th scope="col" className="px-6 py-3">
                  InvoiceDate</th>
                <th scope="col" className="px-6 py-3">
                  Issue Order Number</th>
                <th scope="col" className="px-6 py-3">
                  Supplier</th>
                <th scope="col" className="px-6 py-3">
                  lifespan</th>
                <th scope="col" className="px-6 py-3">
                  UOM</th>
                <th scope="col" className="px-6 py-3">
                  Quantity</th>
                <th scope="col" className="px-6 py-3">
                  Unit Cost</th>
                <th scope="col" className="px-6 py-3">
                  Total Cost</th>
                <th scope="col" className="px-6 py-3">
                  Status</th>
                <th scope="col" className="px-6 py-3">
                  Remarks</th>
              </tr>
            </thead>
            <tbody>
              {queryResults.map(item => 
              !item.deleted && (
                <tr key={item.iid} onClick={() => handleRowClick(item)} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.iid}
                        </th> 
                        <td className="px-6 py-4">
                            {item.accPerson}
                        </td>
                        <td className="px-6 py-4">
                            {item.department}
                        </td>
                        <td className="px-6 py-4">
                            {item.designation}
                        </td>
                        <td className="px-6 py-4">
                            {item.invoiceNumber}
                        </td>
                        <td className="px-6 py-4">
                            {item.invoiceDate}
                        </td>
                        <td className="px-6 py-4">
                            {item.issueOrder}
                        </td>
                        <td className="px-6 py-4">
                            {item.supplier}
                        </td>  
                        <td className="px-6 py-4">
                            {item.lifespan}
                        </td>
                        <td className="px-6 py-4">
                            {item.unitOfMeasurement}
                        </td>
                        <td className="px-6 py-4">
                            {item.quantity}
                        </td>  
                        <td className="px-6 py-4">
                            {item.unitCost}
                        </td>
                        <td className="px-6 py-4">
                            {item.totalCost}
                        </td>
                        <td className="px-6 py-4">
                            {item.status}
                        </td> 
                        <td className="px-6 py-4">
                            {item.remarks}
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
                        { label: 'Unit Cost', value: selectedItem.unitCost },
                        { label: 'Total Cost', value: selectedItem.totalCost },
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
                  Name:
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
              <div className="flex justify-between p-6"> 
              <button
                    onClick={handleCloseOverlay}
                    className="bg-gray-400 text-white px-4 py-2 rounded-md mt-1 mr-2"
                  >
                    Cancel
                  </button>
                  </div>
            </div>
          </div>
        )}
            </div>
    </>
  ); 
}

