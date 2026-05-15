import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { getCoinsList } from "../services/coinsServices";

export type Coin = {
  id: string,
  symbol: string,
  price: number,
  price_change_percentage_24h: number,
  image: string,
}
type StateType = {
  isLoading: boolean,
  coins: Coin[];
}

const initialState: StateType = {
  isLoading: false,
  coins: [],
}

export const fetchCoins = createAsyncThunk(
  'coins/fetchCoins',
  async (currency: string, { rejectWithValue }) => {
    try {
      const response = await getCoinsList(currency);
      return response;
    } catch {
      return rejectWithValue('Failed to fetch coins');
    }
  }
)

const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<Coin[]>) => {
      state.coins = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoins.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchCoins.fulfilled, (state, action) => {
      state.coins = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchCoins.rejected, (state) => {
      state.isLoading = false;
    })
  }
})

export const { setCoins } = coinSlice.actions
export default coinSlice.reducer