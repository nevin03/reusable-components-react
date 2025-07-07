import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useFormStore = create(
  persist(
    (set) => ({
      formData: {},
      isEditMode: false,

      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      loadFormData: (data) => set({ formData: data }),

      resetForm: () =>
        set({
          formData: {},
          isEditMode: false,
        }),

      setEditMode: (isEdit) => set({ isEditMode: isEdit }),
    }),
    {
      name: "user-form-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useFormStore;
