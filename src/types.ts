export interface EventsState {
    loading: boolean,
    events: eventObj[]
}

export interface eventObj {
    id: number,
    name: string,
    date: string,
    city: string,
    genre: string,
    image: string,
    favourite: boolean,
    shown: boolean,
}

export interface filterObj {
    city: string,
    month: string,
    favourite: boolean,
}