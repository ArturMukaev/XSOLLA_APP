import React from "react";
import {eventObj} from "../types";
import {useDispatch} from "react-redux";
import {favouriteChanged} from "../redux/eventsReducer";

export const Event = (event: eventObj): JSX.Element => {
    const dispatch = useDispatch();
    // Функция для выбора как избранное
    const favouriteHandler = (ev: eventObj) => {
        dispatch(favouriteChanged(ev));
        const isThere = localStorage.getItem(`'${ev.id}'`);
        if (isThere) {
            localStorage.removeItem(`'${ev.id}'`);
        } else {
            localStorage.setItem(`'${ev.id}'`, `'${ev.id}'`);
        }
    }
    return (
        <>
            <div className="event-group" style={{backgroundImage: `url("${event.image}")`}}>
                <div className="event-date-cont">
                    <div className="event-date">{event.date.split('.')[0]}</div>
                </div>
                <span className="event-title">
                    {event.name}
                </span>
                <div
                    className="event-favourite"
                    style={{backgroundColor: event.favourite ? 'yellow' : 'white'}}
                    onClick={() => {
                        favouriteHandler(event)
                    }}/>
            </div>
        </>
    )
}