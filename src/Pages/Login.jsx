import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Login() {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		//logic here mga pre
		console.log("Username:", username);
		console.log("Password:", password);
		// Reset the form after submission
		setUsername("");
		setPassword("");

		navigate("/home");
	};

	return (
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
					width: "25%",
					height: "60vh",
					borderRadius: "5px",
					padding: "20px",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
				}}
			>
				<div style={{ width: "85%", marginBottom: "60px" }}>
					<form
						onSubmit={handleSubmit}
						style={{ display: "flex", flexDirection: "column" }}
					>
						<div
							style={{
								backgroundColor: "#8c383e",
								width: "25%",
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
								width: "25%",
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
								src="../src/assets/images/cit.png"
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
							label="Username"
							variant="outlined"
							value={username}
							onChange={handleUsernameChange}
							style={{ marginBottom: "10px" }}
							required
							size="small"
						/>
						<TextField
							InputLabelProps={{
								style: { fontFamily: "Poppins", fontSize: "15px" },
							}}
							label="Password"
							variant="outlined"
							type="password"
							size="small"
							value={password}
							onChange={handlePasswordChange}
							style={{ marginBottom: "10px" }}
							required
						/>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							style={{
								backgroundColor: "#F8C702",
								fontFamily: "Poppins",
                                fontWeight: "bold",
								marginTop: "10px",
                                color:"#1a1a1a"
							}}
						>
							Login
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
