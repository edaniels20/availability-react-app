import React, { useEffect, useState } from 'react';

import WeekDay from './WeekDay';

import '../css/Main.css'

export default function Main() {
    const [dayData, setDayData] = useState({
        Monday: new Array(24).fill(false),
        Tuesday: new Array(24).fill(false),
        Wednesday: new Array(24).fill(false),
        Thursday: new Array(24).fill(false),
        Friday: new Array(24).fill(false),
        Saturday: new Array(24).fill(false),
        Sunday: new Array(24).fill(false)
    });

    // Form data state for day as well as start and end see handleSubmit for business logic.

    const [formData, setFormData] = useState({day: 'Monday', start: 0, end: 0});

    const [dayOutput, setDayOutput] = useState();

    /**
     * This use effect is to define a default value to state so i can set 9 - 5 default to.
     * I want to do it with iteration instead of hard coding it in the initial state to make it a bit more graceful.
     */
    useEffect(() => {
        // I am defining a new array so i am not looping inside the setState value this new array will be what i set the inital state to.
        const newDateData = {...dayData};
        for(const key in newDateData) {
            for(let j = 8; j < 17; j++) {
                newDateData[key][j] = true;
            }
        }

        setDayData(() => ({...newDateData}));
    }, [])

    /**
     *  This use effect is to re render the dates every time the dayData state is updated the state is passed down through props.
    */ 
    useEffect(() => {
        setDayOutput(() => {
            const newDayOutput = [];
            for(const key in dayData) {
                newDayOutput.push(
                    <WeekDay key={key} dayOfWeek={key} dayData={dayData[key]} handleClick={handleNodeClick} />
                )
            }
            return newDayOutput
        });
        
    }, [dayData]);

    function handleChange(e) {
        // Name matches the key for formData
        let key = e.target.name;
        /** 
         * This checks if the value being changed is start or end;
         * if it is start the minimum value is set to 0
         * if it is end the minimum value is set to the current start this is to prevent user from entering invalid start and finish
         * if it is neither it is assumed that the value that needs to be changed is the select
         */
        let value = e.target.name === 'start' ? Math.max(0, Math.min(24, Number(e.target.value))) : e.target.name === 'end' ? Math.max(formData.start, Math.min(24, Number(e.target.value))) : e.target.value;
        setFormData(prevState => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    function handleNodeClick(e, dayOfWeek, index) {
        e.preventDefault();
        setDayData((prevState) => {
            let newState = {...prevState};
            newState[dayOfWeek][index] = !newState[dayOfWeek][index];
            return newState;
        })
    }

    function handleGenerateOutput(e) {

        // This formats the dayData in the way that is asked. It is also in order from monday - sunday, time start - time end.

        e.preventDefault();

        // Creates new output to be console logged.
        const output = [];
        let start;
        let end;

        for(const key in dayData) {
            for(let i = 0; i < dayData[key].length; i++) {
                if(dayData[key][i] && !start ) start = i + 1;
                if(!dayData[key][i] && start) {
                    end = i - 1;
                    output.push({
                        day: key,
                        start,
                        end: end + 1
                    })
                    start = undefined;
                }
            }
        }

        console.log(output);

    }

    function handleSubmit(e) {
        e.preventDefault();

        // Just returns if the form has not been filled out or both values are still 0

        if(formData.start === 0 && formData.end === 0 ) return

        // Creating a new day data this will be used to set the state of the current day data

        const newDayData = {...dayData};

        for(let i = formData.start - 1; i < formData.end; i++) {
            newDayData[formData.day][i] = true;
        }

        setDayData(() => ({...newDayData}));

    }


    return (
        <main className="main">
            <form action="#link" className="form" onSubmit={handleSubmit}>
                <select name="day" id="day" className="day-select" value={formData.day} onChange={handleChange}>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>
                <label htmlFor="start">
                    Start Time
                    <input type="number" value={formData.start} name="start" className="day-start" onChange={handleChange} />
                </label>
                <label htmlFor="end">
                    End Time
                    <input type="number" value={formData.end} name="end" className="day-end" onChange={handleChange} />
                </label>
                <div className="form-footer">
                    <input type="submit" className="btn btn-primary" />
                </div>
            </form>
            <div className="day-wrapper">
                {dayOutput}
            </div>
            <div className="generate-output-wrapper">
                <button className="btn btn-primary" onClick={handleGenerateOutput}>Output Availability</button>
            </div>
        </main>
    )
}