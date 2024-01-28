import {create} from "zustand";

const useSearchBarStore = create((set) => ({
    searchBarValue: '',
    setSearchBarValue: (value) =>{
        set({ searchBarValue: value });
    }
}));
export default useSearchBarStore;