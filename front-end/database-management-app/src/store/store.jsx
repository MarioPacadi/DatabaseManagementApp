import {create} from 'zustand';
import * as Models from '../models';
import fetchData from "./api/baseApi";

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
  setData: async (newData) => {
    const updatedData = { ...newData };

    // Iterate over the properties of newData
    for (const dataType of Object.keys(newData)) {
        if (newData[dataType]) {
        updatedData[dataType] = await fetchDataForDataType(Models[dataType], newData[dataType]);
        }
    }
    set(updatedData);
  },
  getData: async (dataType, array, params) => {
    try {
      const data = await fetchData({ dataType: dataType.name, ...params });
      const classData = await fetchDataForDataType(dataType, data);
      set({ [array]: classData });
    } catch (error) {
      console.error(`Error fetching and setting data for ${dataType}:`, error);
    }
  },


}));

export const fetchDataForDataType = async (DataType, data) => {
    return data.map(item => new DataType(item));
  };



export default useDataStore;
