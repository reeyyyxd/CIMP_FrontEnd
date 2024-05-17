import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import backgroundImage from "../assets/images/cat.jpg";
import cit from "../assets/images/cit.png";
import axios from "axios";

export default function Login( {user, setUser} ) {
	const navigate = useNavigate();

	const [loginData, setLoginData] = useState({
		username: '',
		password: ''
	})

	const handleSubmit = (event) => {
		event.preventDefault();
		
		login();
	};

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

	async function login() {
		return axios.post('http://localhost:8080/login', {
			username: loginData.username,
			password: loginData.password
		  }, {
			headers: {
			  'Content-Type': 'application/json'
			}
		  }).then(response => {
			if (!(response.status === 200)) {
			  throw new Error('There is a problem with the request');
			}

			setUser({
				uid: response.data.uid,
				fname: response.data.fname,
				lname: response.data.lname,
				username: response.data.username,
				type: response.data.type
			});

			setLoginData({
				username: '',
				password: ''
			});

			navigate("/home");
		  }).catch(error => {
			console.log('There was a problem with the fetch operation:', error)
		  })
	  };

	const handleChange = (event) => {
		const { name, value } = event.target;
		setLoginData((prevData) => ({ ...prevData, [name]: value }));
	  };

	return (
		<div
			style={{
				height: "100vh",
				background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${cit}) no-repeat center center fixed`,
				backgroundSize: "contain",
				width:"100vw",
				height:"100vh",
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
						<form
							onSubmit={handleSubmit}
							style={{ display: "flex", flexDirection: "column" }}
						>
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
									marginBottom: "10px",
								}}
							>
								<img
									src={backgroundImage}
									alt="CIT Logo"
									style={{
										width: "100px",
									}}
								/>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									margin: "0 0 25px 0",
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
									Welcome Back!
								</h2>
							</div>
							<TextField
								InputLabelProps={{
									style: { fontFamily: "Poppins", fontSize: "15px" },
								}}
								name="username"
								label="Username"
								variant="outlined"
								// value={username}
								onChange={handleChange}
								style={{ marginBottom: "10px" }}
								required
								size="small"
							/>
							<TextField
								InputLabelProps={{
									style: { fontFamily: "Poppins", fontSize: "15px" },
								}}
								name="password"
								label="Password"
								variant="outlined"
								type="password"
								size="small"
								// value={password}
								onChange={handleChange}
								style={{ marginBottom: "10px" }}
								required
							/>
							<StyledButton type="submit" variant="contained" color="primary">
								Log In
							</StyledButton>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
