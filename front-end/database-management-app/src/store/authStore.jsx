import {create} from "zustand";
import {loginUser, registerUser} from "./api/AuthApi";
import {User} from "../models";
import {fetchDataForDataType} from "./store";

const useAuthStore= create((set) => ({
    user: undefined,
    access_token: '',
    isError: false,

    login: async (email, password)=>{
        try {
            const jwtToken = await loginUser(email, password);
            set({access_token: jwtToken.access_token})
            set({isError: false})
        } catch (error) {
            console.error(`Error logging in user:`, error);
            set({access_token: ''})
            set({isError: true})
        }
    },
    register: async (name,email, password)=>{
        try {
            let data = await registerUser(name, email, password);
            set({isError: false})
            const classData = await fetchDataForDataType(User, data);
            set({ user: classData });
        } catch (error) {
            console.error(`Error logging in user:`, error);
            set({isError: true})
        }
    },
    logout: ()=>{
        set({access_token: ''})
    }

}));

export default useAuthStore;