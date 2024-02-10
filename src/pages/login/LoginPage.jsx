import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './LoginPage.css';

// Custom styled TextField
const CustomTextField = styled(TextField)({
    '& .MuiInputLabel-root': { color: '#ddd' }, // Label color
    '& .MuiOutlinedInput-root': {
        color: '#fff', // Text color
        '& fieldset': {
            borderColor: '#555', // Border color
        },
        '&:hover fieldset': {
            borderColor: '#aaa', // Border color on hover
        },
        '&.Mui-focused fieldset': {
            borderColor: '#fff', // Border color when focused
        },
        '& .MuiOutlinedInput-input': {
            backgroundColor: '#222', // Background color of the input
            borderRadius: 1, // Border radius of the input field
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
            backgroundColor: '#333', // Background color of the input when focused
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '4px', // Adjusting border radius for the outline
        },
        marginBottom: '20px',
    }
});

// Custom styled Button
const CustomButton = styled(Button)({
    mt: 2, // Margin top
    backgroundColor: 'grey', // Button background color
    '&:hover': {
        backgroundColor: '#d3d3d3', // Hover background color
    }
});

const LoginPage = () => {
    const [token, setToken] = useState('');

    const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Token submitted:", token);

    fetch("/login", {
        method: "POST", // Specify the HTTP method
        headers: {
            "Content-Type": "application/json", // Specify content type
        },
        body: JSON.stringify({ token }), // Convert data to JSON string
    })
    .then(response => {
        if (response.ok) {
            // Response is OK
            console.log("Login successful");
        } else {
            // Handle error response
            console.error("Login failed");
        }
    })
    .catch(error => {
        // Handle network errors
        console.error("Network error:", error);
    });
};


    return (
        <div className="login-page">
            <h1 className="siteTitle">Quanta</h1>
            <div className="token-entry" onSubmit={handleSubmit}>
                <CustomTextField
                    label="Your Token"
                    variant="outlined"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    fullWidth
                />
                <CustomButton
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Submit
                </CustomButton>
            </div>
        </div>
    );
};

export default LoginPage;
