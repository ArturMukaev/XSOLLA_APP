import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {filterObj} from "../types";
import {shownChanged} from "../redux/eventsReducer";

export const Filters = (): JSX.Element => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState<filterObj>({
        city: 'all',
        month: 'all',
        favourite: false
    });
    // Обработчик фильтров
    const handleChange = (event: any) => {
        setFilter(prevState => {
            return {...prevState, [event.target.name]: event.target.value || event.target.checked}
        });
    }

    useEffect(() => {
        dispatch(shownChanged(filter));
    }, [filter, dispatch]);

    return (
        <form style={{marginLeft: '70px'}}>
            <label className="text">
                City:
                <select defaultValue={filter.city} onChange={handleChange} name="city" className="select">
                    <option value="all">All</option>
                    <option value="Amsterdam">Amsterdam</option>
                    <option value="Berlin">Berlin</option>
                    <option value="Rim">Rim</option>
                    <option value="St.Petersburg">St.Petersburg</option>
                </select>
            </label>
            <label className="text">
                Month:
                <select defaultValue={filter.month} onChange={handleChange} name="month" className="select">
                    <option value="all">All</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </label>
            <label className="text">
                Favourite:
                <input type="checkbox" checked={filter.favourite} value={undefined} name="favourite"
                       onChange={handleChange}/>
            </label>
        </form>
    )
}