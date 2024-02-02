import axios from "axios";
import {baseUrl} from "./baseApi";
import {getToken} from "../../utils/utils";


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

export const getUser = async ( {id='', name='', email='', password=''} ) => {
    try {
        const params={
            ...(id && {id: id}),
            ...(name && {name: name}),
            ...(email && {email: email}),
            ...(password && {password: password}),
        };
        console.log(params);

        const headers = {
            Authorization: `Bearer ${getToken()}`,
        };

        const response = await axios.get(`${baseUrl}/User`,{
            params: params,
            headers: headers
        });

        return response.data;
    } catch (error) {
        console.error('Error getting user:', error);
        throw error; // Rethrow the error for handling in the caller
    }
};

export const updateUser = async ( id, name, email, password ) => {
    try {
        const data={
            name: name,
            email: email,
            password: password
        }
        console.log(data);

        const headers = {
            Authorization: `Bearer ${getToken()}`,
        };

        const response = await axios.put(`${baseUrl}/User/${id}`, {
            name: name,
            email: email,
            password: password
        },{headers: headers});

        return response.data; // Return User
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

