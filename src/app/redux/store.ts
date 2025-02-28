import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";

// โหลดข้อมูลจาก Local Storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("formData");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (error) {
    console.error("Load state error:", error);
    return [];
  }
};

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  preloadedState: {
    form: loadState(), // ใช้ข้อมูลจาก Local Storage
  },
});

// บันทึกข้อมูลลง Local Storage ทุกครั้งที่ Redux Store เปลี่ยนแปลง
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("formData", JSON.stringify(state.form));
  } catch (error) {
    console.error("Save state error:", error);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;