import { Button, TextField } from "@mui/material";
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { useNavigate,Link, useSearchParams, createSearchParams } from "react-router-dom";
import '../App.css';

import Navbar from "../Extras/navbar";
import Sidebar from "../Extras/sidebar";
import ProfileDropdown from "../Extras/dropdown";
import Home from "./Home";

export default function Filter() {

  const navigate = useNavigate();

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
        alert("service error")
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
        alert("service error")
      })
};

const goHome = () => {
  navigate("/home")
}




    return (
        
        <><><><>
        {/* <h4 className="text-center">Welcome to the Filter Page!</h4> */}
        <>
        <Navbar/>
        <Sidebar />
        <ProfileDropdown />
        <Home />


        <p></p>
        <div class="ml-60 mt-28 md:col-span-2">
        <select onChange={handleaccPer}>
          <option value=""></option>
          {O_accPer.map((O_accPers, index) => (
            <option key={index} value={O_accPers}>
              {O_accPers}
            </option>
          ))}
        </select>
        
        <select onChange={handleDep}>
          <option value=""></option>
          {O_dep.map((O_deps, index) => (
            <option key={index} value={O_deps}>
              {O_deps}
            </option>
          ))}
        </select>

          <select onChange={handleDes}>
            <option value=""></option>
            {O_des.map((O_dess, index) => (
              <option key={index} value={O_dess}>
                {O_dess}
              </option>
            ))}
          </select>

          <select onChange={handleUom}>
            <option value=""></option>
            {O_uom.map((O_uoms, index) => (
              <option key={index} value={O_uoms}>
                {O_uoms}
              </option>
            ))}
          </select>

          <select onChange={handleStat}>
            <option value=""></option>
            {O_status.map((O_statuss, index) => (
              <option key={index} value={O_statuss}>
                {O_statuss}
              </option>
            ))}
          </select>

          <select onChange={handleSupp}>
            <option value=""></option>
            {O_supp.map((O_supps, index) => (
              <option key={index} value={O_supps}>
                {O_supps}
              </option>
            ))}
          </select>

          <select onChange={handleBuilding}>
            <option value=""></option>
            {O_building.map((O_buildings, index) => (
              <option key={index} value={O_buildings}>
                {O_buildings}
              </option>
            ))}
          </select>

          <select onChange={handleRoom}>
            <option value=""></option>
            {O_room.map((O_rooms, index) => (
              <option key={index} value={O_rooms}>
                {O_rooms}
              </option>
            ))}
          </select>

          <select onChange={handleName}>
            <option value=""></option>
            {O_name.map((O_names, index) => (
              <option key={index} value={O_names}>
                {O_names}
              </option>
            ))}
          </select>

          <select onChange={handleModel}>
            <option value=""></option>
            {O_model.map((O_models, index) => (
              <option key={index} value={O_models}>
                {O_models}
              </option>
            ))}
          </select>

          <select onChange={handleType}>
            <option value=""></option>
            {O_type.map((O_types, index) => (
              <option key={index} value={O_types}>
                {O_types}
              </option>
            ))}
          </select>

          <select onChange={handleInvoice}>
            <option value=""></option>
            {O_invoicedate.map((O_invoicedates, index) => (
              <option key={index} value={O_invoicedates}>
                {O_invoicedates}
              </option>
            ))}
          </select>

          <select onChange={handleLifespan}>
            <option value=""></option>
            {O_lifespan.map((O_lifespans, index) => (
              <option key={index} value={O_lifespans}>
                {O_lifespans}
              </option>
            ))}
          </select>
          </div>
          </>
          </>




          <h1><p></p> 
          <div class="flex justify-start ml-60 mt-5 md:col-span-2">
            <Button variant="outlined" onClick={function(){ handleFilter(); fetchO_sum()}}>filter</Button> &nbsp;
            <Button variant="outlined" onClick={goHome}>home</Button>&nbsp;&nbsp;&nbsp;&nbsp;

              <label id="sumLabel" onChange={handleSum}>Total Cost: {O_sum}</label>
          </div>
          </h1>
          
          <div class="mx-auto ml-32 mt-2">
    <div class="container flex justify-center">
    <div class="overflow-x-auto"> 
    <table class="w-full text-sm text-left rtl:text-right ml-28 mr-28 text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-red-900 dark:text-white">
              <tr>
                <th scope="col" class="px-6 py-3">
                  property tag</th>
                <th scope="col" class="px-6 py-3">
                  Accountable Person</th>
                <th scope="col" class="px-6 py-3">
                  Department</th>
                <th scope="col" class="px-6 py-3">
                  Designation</th>
                <th scope="col" class="px-6 py-3">
                  invoiceDate</th>
                <th scope="col" class="px-6 py-3">
                  invoiceNumber</th>
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
              {queryResults.map(item => (
                <tr key={item.propertyTag} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><Link onClick={() => {
                    const url = `/viewAll?${createSearchParams({ id: item.iid }).toString()}`;
                    window.open(url, '_blank');
                  } }>{item.iid}</Link></td>

                  <td>{item.accPerson}</td>
                  <td>{item.department}</td>
                  <td>{item.designation}</td>
                  <td>{item.invoiceDate}</td>
                  <td>{item.invoiceNumber}</td>
                  <td>{item.issueOrder}</td>
                  <td>{item.supplier}</td>
                  <td>{item.lifespan}</td>
                  <td>{item.unitOfMeasurement}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitCost}</td>
                  <td>{item.totalCost}</td>
                  <td>{item.status}</td>
                  <td>{item.remarks}</td>

                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </div>
          </div>    
          </></>
          </>
    )
}

