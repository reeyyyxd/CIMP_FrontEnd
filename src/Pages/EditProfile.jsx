import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px;
    margin-top: 10px;
    border: none;
    background-color: #8C383E;
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #722d33;
    }
`;

const BackButton = styled(Button)`
    background-color: #ccc;
    color: #333;
    margin-right: 10px;

    &:hover {
        background-color: #999;
    }
`;

const EditProfile = ({ user, setUser }) => {
    const [formData, setFormData] = useState({
        username: user.username,
        fname: user.fname,
        lname: user.lname,
        newPassword: '',
        confirmPassword: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const address = getIpAddress();

    function getIpAddress() {
        const hostname = window.location.hostname;
        const indexOfColon = hostname.indexOf(':');
        if (indexOfColon !== -1) {
            return hostname.substring(0, indexOfColon);
        }
        return hostname;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        try {
            const confirmUpdate = window.confirm('Are you sure you want to save changes?');
            if (!confirmUpdate) return;

            const updateData = formData.newPassword !== "" || formData.confirmPassword !== "" ? ({
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
            setSuccessMessage('Profile updated successfully!');
            navigate('/Dashboard');
        } catch (error) {
            setErrorMessage('Error updating profile.');
        }
    };

    const handleBack = () => {
        navigate('/Dashboard');
    };

    return (
        <Container>
            <h2>Update Profile</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <Input
                    type="text"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                />
                <Input
                    type="text"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />
                <Input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="New Password"
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                />
                <Button type="submit">Save Changes</Button>
                <BackButton onClick={handleBack}>Back</BackButton>
            </Form>
        </Container>
    );
};

export default EditProfile;
