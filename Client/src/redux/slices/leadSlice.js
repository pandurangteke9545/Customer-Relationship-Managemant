import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all leads
export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/leads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch lead by ID
export const fetchLeadById = createAsyncThunk(
  "leads/fetchLeadById",
  async (leadId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`http://localhost:5000/leads/${leadId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Add new lead
export const addLead = createAsyncThunk(
  "leads/addLead",
  async (leadData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:5000/leads/create", leadData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update lead
export const updateLead = createAsyncThunk(
  "leads/updateLead",
  async ({ leadId, updatedData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/leads/${leadId}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data)
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    lead: null,     // ✅ FIX 1
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // ===== Fetch All Leads =====
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== Fetch Lead By Id =====
      .addCase(fetchLeadById.pending, (state) => {
        state.loading = true;
        state.lead = null;
      })
      .addCase(fetchLeadById.fulfilled, (state, action) => {
        state.loading = false;
        state.lead = action.payload;   // ✅ FIX 2
      })
      .addCase(fetchLeadById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== Add Lead =====
      .addCase(addLead.fulfilled, (state, action) => {
        state.leads.push(action.payload);
      })

      // ===== Update Lead =====
      .addCase(updateLead.fulfilled, (state, action) => {
        state.leads = state.leads.map((l) =>
          l.lead_id === action.payload.lead_id ? action.payload : l
        );
      });
  },
});

export default leadsSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Fetch all leads
// export const fetchLeads = createAsyncThunk(
//   "leads/fetchLeads",
//   async (_, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("token") 
//       console.log(token)
//       const res = await axios.get("http://localhost:5000/leads",
//         {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }

//       );
//       console.log(res.data)
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// const leadsSlice = createSlice({
//   name: "leads",
//   initialState: {
//     leads: [],
//     loading: false,
//     error: null,
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLeads.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchLeads.fulfilled, (state, action) => {
//         state.loading = false;
//         state.leads = action.payload;
//       })
//       .addCase(fetchLeads.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const addLead = createAsyncThunk(
//   "leads/addLead",
//   async (leadData, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.post("http://localhost:5000/leads", leadData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       return res.data.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );



// export const fetchLeadById = createAsyncThunk(
//   "leads/fetchLeadById",
//   async (leadId, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get(`http://localhost:5000/leads/${leadId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(res.data)
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );


// export const updateLead = createAsyncThunk(
//   "leads/updateLead",
//   async ({ leadId, updatedData }, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.put(
//         `http://localhost:5000/leads/${leadId}`,
//         updatedData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       return res.data.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );



// export default leadsSlice.reducer;
