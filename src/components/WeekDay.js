import React, {useEffect} from 'react';

import '../css/WeekDay.css';

export default function WeekDay({dayData, dayOfWeek, handleClick}) {
    const [days, setDays] = React.useState({
        'am': [],
        'pm': []
    });

    useEffect(() => {
        setDays(() => {
            const newDays = {
                'am': [],
                'pm': []
            }
    
            let timePeriod = 'am';
    
            for(let i = 0; i < dayData.length; i++) {
                if(i > 11) timePeriod = 'pm';
                newDays[timePeriod].push(
                    <div key={i} className={`hour ${dayData[i] ? 'available' : 'not-availabe'}`} onClick={(e) => handleClick(e, dayOfWeek, i)}>
                        {`${(i % 12) + 1} ${timePeriod}`} 
                    </div>
                )          
            }
    
            return newDays
        });
    }, [handleClick]);

    return (
        <div className="day">
            <h2>{dayOfWeek}</h2>
            <div className="times">
                <div className="time-am">
                    <h3>AM</h3>
                    {days['am']}
                </div>
                <div className="time-pm">
                    <h3>PM</h3>
                    {days['pm']}
                </div>
            </div>
        </div>
    )
}