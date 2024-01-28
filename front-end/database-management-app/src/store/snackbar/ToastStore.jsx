import { create } from 'zustand';

const useToastStore = create((set) => ({
    toastRef: null,

    setToastRef: (ref) => set({ toastRef: ref }),

    showToast: (severity, summary, detail) => {
        const { toastRef } = useToastStore.getState();
        if (toastRef) {
            toastRef.show({ severity, summary, detail });
        }
    },

    showInfoToast: (summary, detail) => useToastStore.getState().showToast('info', summary, detail),
    showSuccessToast: (summary, detail) => useToastStore.getState().showToast('success', summary, detail),
    showErrorToast: (summary, detail) =>  useToastStore.getState().showToast('error', summary, detail),
    showWarningToast: (summary, detail) =>  useToastStore.getState().showToast('warn', summary, detail),
    showBasicToast: (summary, detail) =>  useToastStore.getState().showToast('basic', summary, detail),
}));

export default useToastStore;
