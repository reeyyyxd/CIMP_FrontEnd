import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";


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
  
      axios.get("http://localhost:8080/item/fullInfo", {
          params: {
              info: id
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

    const [showDiv, setShowDiv] = useState(false);

  const handleToggle = () => {
    setShowDiv(!showDiv); // Toggle the state
  };

  const handleClose = () => {
    setShowDiv(false); // Close the div
  };


return(

  <div className="flex justify-center text-center mt-28">
  <div className="border border-gray-300 p-4 max-w-lg shadow-2xl rounded-2xl">
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
    </div>

    <Button variant="contained" onClick={handleToggle}>
        {showDiv ? 'Hide Div' : 'Show Div'}
      </Button>
      {showDiv && (
        <Paper style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px' }}>
          <Typography variant="h6">Floating Div</Typography>
          <Typography variant="body1">Some information goes here...</Typography>
          <Button onClick={handleClose} variant="contained">Exit</Button>
        </Paper>
      )}

        </div>  
    
    
)

}