const cron = require("node-cron");

// Get Currunt Time
const today = new Date();
const date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} - ${time}`;

module.exports = {
    callEveryMinute: () => {
        cron.schedule("* * * * *", () => {
            console.log(`Running a cron every minute: ${dateTime}`);
        });
    }
}

//  CRON Sedule

// ┌────────────── second (optional) 0-59
// │ ┌──────────── minute            0-59
// │ │ ┌────────── hour              0-23
// │ │ │ ┌──────── day of month      1-31
// │ │ │ │ ┌────── month             1-12 (or names)
// │ │ │ │ │ ┌──── day of week       0-7 (or names, 0 or 7 are sunday)
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *
