import {create} from "zustand";
import {getUser, loginUser, registerUser, updateUser} from "./api/AuthApi";
import {User} from "../models";
import {fetchDataForDataType} from "./store";
import {getUserId, nameOf} from "../utils/utils";

const useAuthStore= create((set) => ({
    user: new User({}),
    access_token: '',
    isError: false,

    login: async (email, password)=>{
        try {
            const jwtToken = await loginUser(email, password);
            set({access_token: jwtToken.access_token})
            await useAuthStore.getState().getUser({email: email});
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
            let user= new User(data[0]);
            set({ user: user });
        } catch (error) {
            console.error(`Error registering user:`, error);
            set({isError: true})
        }
    },
    logout: ()=>{
        set({access_token: ''})
    },
    getUser: async (params)=>{
        try {
            const data = await getUser({ ...params });
            console.log(data)
            let user= new User(data[0]);
            set({ user: user });
            if (!getUserId()){
                localStorage.setItem("userId",user.id);
            }
            set({isError: false})
        } catch (error) {
            console.error(`Error getting user:`, error);
            set({isError: true})
        }
    },
    updateUser: async (id,formData)=>{
        try {
            const updatedData = await updateUser(id,formData.name,formData.email,formData.password);
            console.log(updatedData)
            let user= new User(updatedData);
            set({ user: user });
            set({isError: false})
        } catch (error) {
            console.error(`Error updating user:`, error);
            set({isError: true})
        }
    },
    resetErrorState:()=>{
        set({isError: false})
    }

}));

export default useAuthStore;