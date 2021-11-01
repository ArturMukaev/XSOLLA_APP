import {createSlice} from '@reduxjs/toolkit';
import {Dispatch} from "redux";
import {EventsState} from "../types";


const initialState = {loading: true, events: []} as EventsState

const eventsReducer = createSlice({
    name: "events",
    initialState,
    reducers: {
        eventsLoaded: (state, action) => {
            state.loading = false;
            state.events = action.payload;
        },
        favouriteChanged: (state, action) => {
            state.events = state.events.map(el => {
                if (el.id !== action.payload.id) {
                    return el;
                }
                return {...el, favourite: !action.payload.favourite}
            });
        },
        shownChanged: (state, action) => {
            state.events = state.events.map((el) => {
                if ((action.payload.city === el.city || action.payload.city === 'all')
                    && (action.payload.month === el.date.split('.')[1] || action.payload.month === 'all')
                    && (!action.payload.favourite || el.favourite === true)) {
                    return {...el, shown: true}
                }
                return {...el, shown: false};
            })
        }
    }
});
const {actions, reducer} = eventsReducer;
export const {eventsLoaded, favouriteChanged, shownChanged} = actions;
export {reducer};

export const fetchEvents = () => async (dispatch: Dispatch) => {
    const response = await fetch('https://raw.githubusercontent.com/xsolla/xsolla-frontend-school-2021/main/events.json');
    let json = await response.json();
    json = json.map((el: any) => {
        const isFavourite = localStorage.getItem(`'${el.id}'`);
        return {...el, favourite: !!isFavourite, shown: true}
    })
    dispatch(eventsLoaded(json));
}

export type RootState = ReturnType<typeof reducer>;