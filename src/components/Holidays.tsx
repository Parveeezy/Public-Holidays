import {useQuery} from "@tanstack/react-query";
import {getPublicCountries, getPublicHolidays} from "../api.ts";
import {type ChangeEvent, useState} from "react";
import s from './holidays.module.css'

const Holidays = () => {
    const [selectedCountry, setSelectedCountry] = useState("NL")

    const {data: countries, isLoading} = useQuery({
        queryKey: ['countries'],
        queryFn: getPublicCountries
    })

    const {data: holidays} = useQuery({
        queryKey: ['holidays', selectedCountry],
        queryFn: () => getPublicHolidays(selectedCountry)
    })

    const changeCountryHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(e.target.value)
    }

    return (
        <div>
            <h1>!!! Public Holidays !!!</h1>

            <div className={s.wrapper}>
                <select
                    value={selectedCountry}
                    onChange={changeCountryHandler}
                >
                    {countries?.map((c) => (
                        <option
                            value={c.isoCode}
                            key={c.isoCode}
                        >
                            {c.name[0].text}
                        </option>
                    ))}
                </select>
                {isLoading && <h2>Loading...</h2>}
            </div>
            <div>
                <ul>
                    {holidays?.map((holiday) => (
                        <li key={holiday.id}>
                            {new Date(holiday.startDate).toLocaleDateString(undefined, {
                                day: "numeric",
                                month: "long",
                            })}{" "}
                            - {holiday.name?.[0].text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Holidays;