# Ethan's Availability Calendar

## This is a simple Availability Calendar

I sent the file through email and i also uploaded it to github. If you are cloning it from github you need to run the command after cloning it.

`npm install`

After it is finished installing you run the following command

`npm start`

If this is to be deployed you run the following command

`npm run build`


## Basic rundown of the application

Below the header is a form that you can use to add availability. The default availability is 9am - 5pm.
The form is built in a way that if the start time is filled out the end time cannot be lower. I added a comment in the function that does this explaining more.
The time is based off of a 24 hour scale so start would be 12 end would be 24 this would be 12am - 12pm.

You can remove availability by clicking one of the nodes that are green. You can also individually add availability by clicking the times that are white.

At the bottom there is a button that console logs the data in the format requested
ie 
`[
    {
        day: 'Monday',
        start: 11,
        end: 17
    }
]`

## Closing

This has been a ton of fun to write. I really enjoyed the open endedness of this challenge. I am far from a designer but given a design i have enough front end knowledge to get any kind of styling done.

Thank you very much
Ethan Daniels