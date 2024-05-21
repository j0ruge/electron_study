### Getting started

`npm install`

Start dev server:

`npm start`

In a new terminal window:

`npm run electron`

## TimerTray Subclass

![Timer Tray](./Assets/timer_tray_subclass.png)

* `constructor` => Make sure to call the parent constructor with the icon path - Tray still needs to do its own initial setup

* `onClick` => Make sure the on click event handler gets set up here too!

1. Create `/app/timer_tray.js` class

```js
const electron = require('electron');

const { Tray } = electron;

class TimerTray extends Tray
{
    constructor(iconPath)
    {
        super(iconPath);
    }
}
module.exports = TimerTray;

```

// 60. Finishing TimerTray Refactor