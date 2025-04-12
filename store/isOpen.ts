import { create } from "zustand";

export const useOpen = create<{open:boolean, toggleOpen:()=>void, setOpen: (value:boolean)=>void}>((set)=>({
    open: false,
    toggleOpen: () => set((state:{open:boolean}) => ({ open: !state.open })),
    setOpen: (value:boolean) => set({ open: value }),
}))