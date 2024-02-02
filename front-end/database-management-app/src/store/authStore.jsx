import {create} from "zustand";
import {getUser, loginUser, registerUser} from "./api/AuthApi";
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
            await useAuthStore.getState().getUser(email);
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
            let user= new User(data);
            set({ user: user });
        } catch (error) {
            console.error(`Error registering user:`, error);
            set({isError: true})
        }
    },
    logout: ()=>{
        set({access_token: ''})
    },
    getUser: async (email)=>{
        try {
            const data = await getUser(email);

            let user= new User(data);
            console.log(user);
            set({ user: user });
            set({isError: false})
        } catch (error) {
            console.error(`Error logging in user:`, error);
            set({access_token: ''})
            set({isError: true})
        }

    }

}));

export default useAuthStore;