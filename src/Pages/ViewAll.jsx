import { useLocation,useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";


export default function ViewAll() {

    const [searchparams] = useSearchParams();
    const [queryResults, setQueryResults] = useState([])
    

    let id = searchparams.get("id");
    console.log(searchparams.get("id"));
    
    useEffect(() => {
      handleFetchSearch();
    }, []);
  
    const handleFetchSearch = () => {
      console.log(id);
  
      axios.get("http://localhost:8080/item/search", {
          params: {
              search: id
          }
      })
      .then(result => {
          console.log(result.data);
          setQueryResults(result.data);
      })
      .catch(error => {
          console.log(error);
          alert("service error");
      });
    };


return(

    <><><><p>FULL INFORMATION</p>
    
    
    
    <p>{queryResults.iid}</p>

    <p>{queryResults.accPerson}</p></><p>{queryResults.department}</p></><><p>{queryResults.designation}</p>

      <p>{queryResults.invoiceDate}</p>

      <p>{queryResults.invoiceNumber}</p>

      <p>{queryResults.issueOrder}</p>

      <p>{queryResults.supplier}</p>

      <p>{queryResults.lifespan}</p>

      <p>{queryResults.unitOfMeasurement}</p>

      <p>{queryResults.quantity}</p>

      <p>{queryResults.unitCost}</p>

      <p>{queryResults.totalCost}</p>

      <p>{queryResults.status}</p>

      <p>{queryResults.remarks}</p>

      {queryResults.location ? (
        <div>
          Building: {queryResults.location.building}, Room: {queryResults.location.room}
        </div>
        ) : (
        <div>No location data available</div>
        )
        }

      {queryResults.description ? (
        <div>
          Name: {queryResults.description.name}, Model: {queryResults.description.model}, Type : {queryResults.description.type}
          <p>Serial Number : {queryResults.description.serialNumber}</p>
          <p>Other : {queryResults.description.other}</p>
        </div>
        ) : (
        <div>No location data available</div>
        )
        }
            

    </></>
    
    
)

}