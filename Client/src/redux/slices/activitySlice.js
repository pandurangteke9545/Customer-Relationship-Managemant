import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all activities
export const fetchActivities = createAsyncThunk(
  "activities/fetchActivities",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/activity/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data; // expect { data: [...] } or adjust as backend returns
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// fetch single activity
export const fetchActivityById = createAsyncThunk(
  "activities/fetchActivityById",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/activity/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// add activity
export const addActivity = createAsyncThunk(
  "activities/addActivity",
  async (payload, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/activity/create", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// update activity
export const updateActivity = createAsyncThunk(
  "activities/updateActivity",
  async ({ id, data }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`http://localhost:5000/activity/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// delete activity
export const deleteActivity = createAsyncThunk(
  "activities/deleteActivity",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:5000/activity/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { id, data: res.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const activitySlice = createSlice({
  name: "activities",
  initialState: {
    activities: [],
    activity: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearActivity(state) {
      state.activity = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        // backend may return { data: [...] } or array directly — adjust if needed
        state.activities = action.payload.data ?? action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch single
      .addCase(fetchActivityById.pending, (state) => {
        state.loading = true;
        state.activity = null;
      })
      .addCase(fetchActivityById.fulfilled, (state, action) => {
        state.loading = false;
        state.activity = action.payload.data ?? action.payload;
      })
      .addCase(fetchActivityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add
      .addCase(addActivity.fulfilled, (state, action) => {
        // push created activity if backend returns created object
        const created = action.payload.data ?? action.payload;
        state.activities.unshift(created);
      })
      .addCase(addActivity.rejected, (state, action) => {
        state.error = action.payload;
      })

      // update
      .addCase(updateActivity.fulfilled, (state, action) => {
        const updated = action.payload.data ?? action.payload;
        state.activities = state.activities.map((a) =>
          a.activity_id === updated.activity_id ? updated : a
        );
        if (state.activity && state.activity.activity_id === updated.activity_id) {
          state.activity = updated;
        }
      })
      .addCase(updateActivity.rejected, (state, action) => {
        state.error = action.payload;
      })

      // delete
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.activities = state.activities.filter((a) => a.activity_id !== action.payload.id);
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearActivity } = activitySlice.actions;
export default activitySlice.reducer;
