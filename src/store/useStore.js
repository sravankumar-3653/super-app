import { create } from "zustand";

const getStoredUser = () => {
  const user = localStorage.getItem("super_app_user");
  return user
    ? JSON.parse(user)
    : {
        name: "",
        username: "",
        email: "",
        mobile: "",
      };
};

const getStoredCategories = () => {
  const categories = localStorage.getItem("super_app_categories");
  return categories ? JSON.parse(categories) : [];
};

const getStoredNotes = () => {
  return localStorage.getItem("super_app_notes") || "";
};

export const useStore = create((set) => ({
  user: getStoredUser(),
  categories: getStoredCategories(),
  notes: getStoredNotes(),

  setUser: (userData) => {
    localStorage.setItem("super_app_user", JSON.stringify(userData));
    set({ user: userData });
  },

  setCategories: (categories) => {
    localStorage.setItem("super_app_categories", JSON.stringify(categories));
    set({ categories });
  },

  setNotes: (notes) => {
    localStorage.setItem("super_app_notes", notes);
    set({ notes });
  },
}));