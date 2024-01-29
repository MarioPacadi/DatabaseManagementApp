import {create} from 'zustand';
import * as Models from '../models';
import fetchData, {deleteData, insertData} from "./api/baseApi";

const useDataStore = create((set) => ({
  customers: [],
  bills: [],
  categories: [],
  cities: [],
  creditCards: [],
  items: [],
  products: [],
  sellers: [],
  subCategories: [],
  users: [],

  getData: async (dataType, array, params) => {
    try {
      const data = await fetchData({ dataType: dataType.name, ...params });
      const classData = await fetchDataForDataType(dataType, data);
      set({ [array]: classData });
    } catch (error) {
      console.error(`Error fetching and setting data for ${dataType}:`, error);
    }
  },
  deleteData: async (dataType, id) => {
    try {
      await deleteData({ dataType: dataType.name, id });
    } catch (error) {
      console.error(`Error deleting data for ${dataType}:`, error);
    }
  },
  insertData: async (dataType, body) => {
    try {
      await insertData({ dataType: dataType.name, body });
    } catch (error) {
      console.error(`Error posting data for ${dataType}:`, error);
    }
  },


}));

export const fetchDataForDataType = async (DataType, data) => {
    return data.map(item => new DataType(item));
  };



export default useDataStore;
