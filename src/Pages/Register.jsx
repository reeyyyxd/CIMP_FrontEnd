import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import cit from "../assets/images/cit.png";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";

const StyledButton = styled(Button)({
    backgroundColor: "#F8C702",
    fontFamily: "Poppins",
    fontWeight: "bold",
    marginTop: "10px",
    textTransform: "none",
    color: "#8C383E",
    fontSize: "15px",
    "&:hover": {
        backgroundColor: "#F2C202",
    },
});

export default function Register( {user, setUser, setSnackbarGreenOpen, setSnackbarRedOpen, setSnackbarMessage} ) {
    const navigate = useNavigate();
    const address = getIpAddress();
    const [registerData, setRegisterData] = useState({
        fname: '',
        lname: '',
        username: '',
        password: '',
        confirmPassword: '',
        type: 'Encoder'
    })

    function getIpAddress() {
        const hostname = window.location.hostname;
        const indexOfColon = hostname.indexOf(';');

        if(indexOfColon !== -1) {
            return hostname.substring(0, indexOfColon);
        }

        return hostname;
    }

    const handleSubmit = (event) => {
		event.preventDefault();
    	const data = new FormData(event.currentTarget);

		setRegisterData({
			fname: data.get('fname'),
            lname: data.get('lname'),
            username: data.get('username'),
			password: data.get('password'),
            confirmPassword: data.get('confirmPassword'),
            type: 'Encoder'
		});
	};

    useEffect(() => {
        if (registerData.username !== '' || registerData.password  !== '') {
            if(registerData.password === registerData.confirmPassword) {
                register();
            } else {
                setSnackbarMessage("Passwords do not match.");
                setSnackbarRedOpen(true);
            }
        }
    }, [registerData]);

    async function register() {
        return axios.post(`http://${address}:8080/register`, {
            fname: registerData.fname,
            lname: registerData.lname,
            username: registerData.username,
            password: registerData.password,
            type: registerData.type
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (!(response.status === 200)) {
                throw new Error('There is a problem with the request.');
            }
            console.log(response.data);
            setSnackbarMessage("Registered Successfully.");
            setSnackbarGreenOpen(true);
            navigate('/');
        }).catch(error => {
            console.log('There was a problem with the fetch operation: ', error);
        })
    };

    return (
        <div 
            style={{ 
                height: '100vh', 
                background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${cit}) no-repeat center center fixed`,
                backgroundSize: "contain",
				width:"100vw",
				backgroundColor: "white",
            }}
        >
            <div
                style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
            >
                <div
                   style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "22%",
                        height: "60vh",
                        borderRadius: "5px",
                        padding: "20px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                        backgroundColor: "white",
                    }} 
                >
                    <div style={{ width: "90%", marginBottom: "60px" }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column'}}>
                            <div
								style={{
									backgroundColor: "#8c383e",
									width: "22%",
									height: "15px",
									position: "fixed",
									top: "20%",
									left: "50%",
									transform: "translateX(-50%)",
									borderRadius: "5px 5px 0 0",
								}}
							></div>
							<div
								style={{
									backgroundColor: "#8c383e",
									width: "22%",
									height: "15px",
									position: "fixed",
									bottom: "20%",
									left: "50%",
									transform: "translateX(-50%)",
									borderRadius: "0 0 5px 5px",
								}}
							></div>
                            <div
								style={{
									display: "flex",
									justifyContent: "center",
									margin: "0 0 10px 0",
									background: "linear-gradient(to bottom, maroon 40%, gold)",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
								}}
							>
								<h2
									style={{
										fontFamily: "Poppins",
										fontWeight: "bold",
										color: "#8C383E",
										fontSize: "1.5rem",
									}}
								>
									Welcome!
								</h2>
							</div>
                            <TextField
								InputLabelProps={{
									style: { fontFamily: "Poppins", fontSize: "15px" },
								}}
								id="fname"
								name="fname"
								label="First Name"
								variant="outlined"
								style={{ marginBottom: "10px" }}
								required
								size="small"
								sx={{mt: 4}}
							/>
                            <TextField
								InputLabelProps={{
									style: { fontFamily: "Poppins", fontSize: "15px" },
								}}
								id="lname"
								name="lname"
								label="Last Name"
								variant="outlined"
								style={{ marginBottom: "10px" }}
								required
								size="small"
								sx={{mt: 4}}
							/>
                            <TextField
								InputLabelProps={{
									style: { fontFamily: "Poppins", fontSize: "15px" },
								}}
								id="username"
								name="username"
								label="Username"
								variant="outlined"
								style={{ marginBottom: "10px" }}
								required
								size="small"
								sx={{mt: 4}}
							/>
							<TextField
								InputLabelProps={{
									style: { fontFamily: "Poppins", fontSize: "15px" },
								}}
								id="password"
								name="password"
								label="Password"
								variant="outlined"
								type="password"
								size="small"
								style={{ marginBottom: "10px" }}
								required
							/>
                            <TextField
								InputLabelProps={{
									style: { fontFamily: "Poppins", fontSize: "15px" },
								}}
								id="confirmPassword"
								name="confirmPassword"
								label="Confirm Password"
								variant="outlined"
								type="password"
								size="small"
								style={{ marginBottom: "10px" }}
								required
							/>
                            <StyledButton type="submit" variant="contained" color="primary">
								Register
							</StyledButton>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}