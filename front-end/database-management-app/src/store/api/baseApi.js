import axios from 'axios';

// export const baseUrl = process.env.API_BASE_URL;
export const baseUrl = 'http://localhost:3000';

// Function to fetch data with paging, filtering, sorting, and searching
const fetchData = async ({ dataType, page = 1, limit = 10, sort = 'id', order = 'asc', searchTerm = '' }) => {
    try {
      const response = await axios.get(`${baseUrl}/${dataType}`, {
        params: {
          _page: page,
          _limit: limit,
          _sort: sort,
          _order: order,
          name_like: searchTerm,
        },
        headers:{
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${dataType}:`, error);
      return [];
    }
  };

  export default fetchData

