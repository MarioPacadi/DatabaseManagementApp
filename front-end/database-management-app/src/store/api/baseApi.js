import axios from 'axios';
import {getToken} from "../../utils/utils";

// export const baseUrl = process.env.API_BASE_URL;
export const baseUrl = 'http://localhost:3000';

// Function to fetch data with paging, filtering, sorting, and searching
// const fetchData = async ({ dataType, page = 1, limit = 10, sort = 'id', order = 'asc', searchTerm = '' }) => {
//   try {
//     // Construct the params object
//     const params = {
//       _page: page,
//       _limit: limit,
//       _sort: sort,
//       _order: order,
//       // Include name_like parameter only if searchTerm is provided and not empty
//       ...(searchTerm.trim() && { name_like: searchTerm.trim() })
//     };
//
//     // Make the axios request with the constructed params
//     const response = await axios.get(`${baseUrl}/${dataType}`, {
//       params: params,
//       headers: {}
//     });
//
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching ${dataType}:`, error);
//     return [];
//   }
// };

// Modified fetchData function
const fetchData = async ({ dataType, page = 1, limit = 10, sort = 'id', order = 'asc',
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
      ...(propertyValue.trim() && propertyName && { [propertyName]: propertyValue.trim() })
    };

    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };

    // Make the axios request with the constructed params
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


  export default fetchData

