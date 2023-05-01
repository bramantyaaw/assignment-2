import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = "e9ef009731ef48d495b1121ab0277b2a";
const symbols = "CAD,IDR,JPY,CHF,EUR,GBP";
const currencyUrl = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&symbols=${symbols}`;

const initialState = {
  currency: [],
  errorMessage: "",
  isLoading: false,
};

export const currencyApi = createAsyncThunk(
  "currency/fetchCurrency",
  async () => {
    const response = await axios.get(currencyUrl);
    const data = response.data;
    const data_currency = [];

    for (var key in data?.rates) {
      if (data?.rates.hasOwnProperty(key)) {
        const power = parseFloat(data?.rates[key]) * 0.05;
        const lower = parseFloat(data?.rates[key]) - power;
        const upper = parseFloat(data?.rates[key]) + power;

        data_currency.push({
          currency: key,
          we_buy: String(lower),
          exchange_rate: data?.rates[key],
          we_sell: String(upper),
        });
      }
    }
    return data_currency;
  }
);

const currSlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(currencyApi.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
        state.currency = [];
      })
      .addCase(currencyApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";

        state.currency = action.payload;
      });
  },
});

export default currSlice.reducer;
