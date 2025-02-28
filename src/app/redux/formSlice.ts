import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  key: string;
  name: string;
  gender: string;
  mobile: string;
  nationality: string;
  passport: string;
  salary:string;
}

const initialState: FormState[] = [];

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<FormState>) => {
      state.push(action.payload);
      console.log("Added Form Entry:", action.payload); 
      console.log("📦 Updated State:", state); //
      localStorage.setItem("formData", JSON.stringify(state)); // บันทึกลง Local Storage
    },
    resetForm: () => {
      localStorage.removeItem("formData"); // ลบข้อมูลจาก Local Storage
      return [];
    },
  },
});

export const { addForm, resetForm } = formSlice.actions;
export default formSlice.reducer;