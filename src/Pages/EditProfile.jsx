import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function EditProfile ({ user, setUser, setSnackbarGreenOpen, setSnackbarRedOpen, setSnackbarMessage }) {
    const [formData, setFormData] = useState({
        username: user.username,
        fname: user.fname,
        lname: user.lname,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [openDialog, setOpenDialog] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleOpenDialog();
        }
    };

    const handleOpenDialog = () => {
        if (formData.oldPassword === '') {
            setSnackbarMessage('Please fill out the old password field.')
            setSnackbarRedOpen(true);
        } else {
            setOpenDialog(true);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const navigate = useNavigate();
    const address = getIpAddress();

    function getIpAddress() {
        const hostname = window.location.hostname;
        const indexOfColon = hostname.indexOf(':');
        if (indexOfColon !== -1) {
            return hostname.substring(0, indexOfColon);
        }
        return hostname;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const validateCredentials = async (username, password) => {
        try {
            const response = await axios.post(`http://${address}:8080/validateCredentials`, { username, password });
            return response.data;
        } catch (error) {
            console.error('Error validating credentials:', error);
            throw error;
        }
    };

    const handleConfirm = async (e) => {
        e.preventDefault();

        const validate = await validateCredentials(formData.username, formData.oldPassword);

        if (formData.newPassword !== formData.confirmNewPassword) {
            setSnackbarMessage('New Passwords do not match.')
            setSnackbarRedOpen(true);
            setOpenDialog(false);
            return;
        } else if (!validate) {
            setSnackbarMessage('Incorrect old password')
            setSnackbarRedOpen(true);
            setOpenDialog(false);
            return;
        }

        try {
            const updateData = formData.newPassword !== "" || formData.confirmNewPassword !== "" ? ({
                fname: formData.fname,
                lname: formData.lname,
                username: formData.username,
                password: formData.newPassword,}) : ({
                fname: formData.fname,
                lname: formData.lname,
                username: formData.username,
            });

            const response = await axios.put(`http://${address}:8080/updateUser/${user.uid}`, updateData);
            setUser(response.data);
            setSnackbarMessage('Profile updated successfully!')
            setSnackbarGreenOpen(true);
            navigate(-1);
        } catch (error) {
            setErrorMessage('Error updating profile.');
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Home user={user} setUser={setUser} />
            <div className="flex justify-center">
                <div className="w-full mt-32 ml-52 max-w-xl">
                    <form onSubmit={handleOpenDialog} style={{ display: "flex", flexDirection: "column" }}>
                    <div className="bg-maroon py-2 px-4 rounded-t-md border border-maroon"></div>
                    <div className="bg-white shadow-2xl px-8 pt-6 pb-8 mb-0">
                    <div className="p-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                            <p className="m-auto sm:col-span-2 text-xl font-bold font-sans">Update Profile</p>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="username" 
                                            id="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder=""
                                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
                                        />
                                        <label
                                            htmlFor="username"
                                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                        >
                                            Username
                                        </label>
                                    </div>
             
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="fname"
                                            id="fname"
                                            value={formData.fname}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder=""
                                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
                                        />
                                        <label
                                            htmlFor="fname"
                                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                        >
                                            First Name
                                        </label>
                                    </div>
             
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="lname"
                                            id="lname"
                                            value={formData.lname}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder=""
                                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
                                        />
                                        <label
                                            htmlFor="lname"
                                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                        >
                                            Last Name
                                        </label>
                                    </div>
           
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="oldPassword"
                                            id="oldPassword"
                                            value={formData.oldPassword}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder=""
                                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
                                            required
                                        />
                                        <label
                                            htmlFor="oldPassword"
                                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                        >
                                            Old Password
                                        </label>
                                    </div>
            
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="newPassword"
                                            id="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder=""
                                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
                                        />
                                        <label
                                            htmlFor="newPassword"
                                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                        >
                                            New Password
                                        </label>
                                    </div>
          
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="confirmNewPassword"
                                            id="confirmNewPassword"
                                            value={formData.confirmNewPassword}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder=""
                                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-md border-1 border border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-950 focus:outline-none focus:ring-0 focus:border-bl peer"
                                        />
                                        <label
                                            htmlFor="confirmNewPassword"
                                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                        >
                                            Confirm New Password
                                        </label>
                                    </div>
                                
        
                                <button className="bg-yellow-400 hover:bg-yellow-300 text-maroon font-bold py-2 px-4 border-b-4 border-yellow-600 hover:border-yellow-400 rounded"
                                type="button" onClick={handleOpenDialog}>CONFIRM</button>
                                <button className="bg-yellow-400 hover:bg-yellow-300 text-maroon font-bold py-2 px-4 border-b-4 border-yellow-600 hover:border-yellow-400 rounded"
                                type="button" onClick={handleBack}>BACK</button> 
                        </div>
                    </div>
                    </form>
                    <div className=" bg-maroon py-2 px-7 rounded-b-md border border-maroon"></div>
                </div>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle id="confirm-dialog">Confirm Changes</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to confirm?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button className="bg-yellow-400 hover:bg-yellow-300 text-maroon font-bold py-2 px-4 border-b-4 border-yellow-600 hover:border-yellow-400 rounded" onClick={handleConfirm}>
                        Confirm
                    </button>
                    <button className="bg-yellow-400 hover:bg-yellow-300 text-maroon font-bold py-2 px-4 border-b-4 border-yellow-600 hover:border-yellow-400 rounded" onClick={handleCloseDialog}>
                        Cancel
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
}
