import React, {useEffect} from 'react';
import {fetchEvents, RootState} from "./redux/eventsReducer";
import {useDispatch, useSelector} from "react-redux";
import {Event} from "./components/Event";
import {Filters} from "./components/Filters";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);
    let events = useSelector((state: RootState) => state.events);
    events = events.filter(event => event.shown);
    return (
        <div className="container">
            <h1 className="heading">Event Listing</h1>
            <Filters/>
            <div className="container2">
                {!events.length ? <h1 className="heading">No such Events</h1> :
                    events.map((event) => {
                        return <Event key={event.id} id={event.id} name={event.name} date={event.date}
                                      city={event.city} genre={event.genre} image={event.image}
                                      favourite={event.favourite}
                                      shown={event.shown}/>
                    })}
            </div>

        </div>
    );
}

export default App;
