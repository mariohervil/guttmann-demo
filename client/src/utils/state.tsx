import { create } from 'zustand'; 

const userState = create((set:any) => ({
    isLogged: false,

    handleLoggedInfo: () => set((state:any) => ({
        isLogged: state
    }))
}));

export default userState; 