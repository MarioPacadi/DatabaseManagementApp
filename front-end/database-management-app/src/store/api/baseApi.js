import axios from 'axios';
import {getToken} from "../../utils/utils";

// export const baseUrl = process.env.API_BASE_URL;
export const baseUrl = 'http://localhost:3000';

// Function to fetch data with paging, filtering, sorting, and searching
const fetchData = async ({ dataType, page = 1, limit = 10, sort = 'name', order = 'asc',
                                   searchName = `${sort}_like`, searchTerm = '',
                                   propertyName = '', propertyValue='' }) => {
  try {
    // Construct the params object
    const params = {
      _page: page,
      _limit: limit,
      _sort: sort,
      _order: order,
      // Include name_like parameter only if searchTerm is provided and not empty
      ...(searchTerm.trim() && { [searchName]: searchTerm.trim() }),
      // Include propertyName parameter only if it is provided and searchTerm is provided
      ...(propertyValue.trim() && propertyName.trim() && { [propertyName]: propertyValue.trim() })
    };

    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };

    const response = await axios.get(`${baseUrl}/${dataType}`, {
      params: params,
      headers: headers
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching ${dataType}:`, error);
    return [];
  }
};

export const deleteData = async ({ dataType, id }) => {
  try {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };

    const response = await axios.delete(`${baseUrl}/${dataType}/${id}`, {
      headers: headers
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching ${dataType}:`, error);
    return [];
  }
};

export const insertData = async ({ dataType, body }) => {
  try {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };

    const response = await axios.post(`${baseUrl}/${dataType}`, body, {
      headers: headers
    });

    return response.data;
  } catch (error) {
    console.error(`Error inserting ${dataType}:`, error);
    throw error; // Re-throw the error to handle it elsewhere
  }
};



  export default fetchData

