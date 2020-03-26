import * as React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import "./results.css";

export interface IProps {
    results: any[]
}

const getTimeForTimezone = (timezone: any, timeUTC: number) => {
    if(!timezone.name) return timezone;

    const hours = moment.utc(timeUTC).add(timezone.hours, 'hours').hours().toString().padStart(2, '0');
    const mins = moment.utc(timeUTC).add(timezone.mins, 'minutes').minutes().toString().padStart(2, '0');
    const secs = moment.utc(timeUTC).add(timezone.secs, 'seconds').seconds().toString().padStart(2, '0');
    return `${timezone.name} Time: ${hours}:${mins}:${secs}`;
}

const Results = (props: IProps) => {
    const [timeUTC, setTimeUTC] = useState(moment.utc().valueOf());

    useEffect(() => {
        // hook to set interval to 1 second on component mount
        const interval = setInterval(() => { 
            setTimeUTC(moment.utc().valueOf());
        }, 1000);
        return () => {
            // stop interval when component lifecycle ends
            clearInterval(interval);
        };
    }, []);

    return(
        <span className="results">
            { props.results.map((r, i) => <div key={i}>{getTimeForTimezone(r, timeUTC)}</div>) }
        </span>
    );
}

export default Results;