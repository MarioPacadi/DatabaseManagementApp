import axios from "axios";
import {baseUrl} from "./baseApi";


const auth_url=`${baseUrl}/auth`;

// Function for registering a user
export const registerUser = async ( name, email, password ) => {
    try {
        const response = await axios.post(`${auth_url}/register`, {
            name: name,
            email: email,
            password: password
        });

        return response.data; // Return User
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Function for logging in a user
export const loginUser = async ( email, password ) => {
    try {
        const response = await axios.post(`${auth_url}/login`, {
            email: email,
            password: password
        });

        return response.data; // Return the response data (e.g., JWT token)
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error; // Rethrow the error for handling in the caller
    }
};
