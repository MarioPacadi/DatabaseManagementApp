import axios from "axios";
import {baseUrl} from "./baseApi";

const getBillsByCustomerId = async ({ customerId='',sort = 'id', order = 'asc', searchTerm = '' }) => {
    try {
        const response = await axios.get(`${baseUrl}/Bill`, {
            params: {
                _customerId: customerId,
                _sort: sort,
                _order: order,
                name_like: searchTerm, // Example for searching by name, last name, email, phone, city
            },
            headers:{

            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${customerId}:`, error);
        return [];
    }
}

export default getBillsByCustomerId