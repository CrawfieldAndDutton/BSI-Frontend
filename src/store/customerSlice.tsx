import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customerData: {},
  },
  reducers: {
    setCustomerData: (state, action) => {
      state.customerData = action.payload;
      console.log("data set ", action.payload);
    },
  },
});

export const { setCustomerData } = customerSlice.actions;
export default customerSlice.reducer;
