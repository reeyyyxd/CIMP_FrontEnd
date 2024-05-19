import { useEffect, useState } from "react";
import Home from "./Home"
import axios from "axios";

export default function Dashboard( {user, setUser}) {
    const [data, setData] = useState([]);
    
    useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8080/item/getAllItems"
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
        </>
    )
}
