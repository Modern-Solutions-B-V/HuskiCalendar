import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
    name: "event",
    initialState: {
        events: [],
    },
    reducers: {
        addEvent: (state, action) => {
            state.events = state.events.concat(action.payload);
        },
    },
});

export const { addEvent } = eventSlice.actions;
export const selectEvents = (state) => state.event.events;

export default eventSlice.reducer;
