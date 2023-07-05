# 0+X Test Assignment: Weather App

In this assignment, you will complete a weather app that was started by another developer. Your tasks are to **add new features** and **improve the source code**.

The app so far is written in plain JavaScript. Set up **TypeScript** and finish the app using TS.

Please, make sure to **document** your solutions and reasons behind taken technical decisions in a Markdown file and attach it to the project.

Prepare and send us your solution as a **GitHub repository**. Use the existing code as the initial project state and create a **PR with all the changes** you're going to make.

## New Features

Extend the functionality of the app with new features:

1. Replace the dummy app data with **real weather data** by using the [AccuWeather API](https://developer.accuweather.com/packages) or other weather API providers of your choice. You can use any library for network requests, caching data, and managing data flow or app life cycle.
2. Update the background of the app to **show different gradients** based on the user's **local time**. You will find all gradient variations in [this Figma file](https://www.figma.com/file/9ZAG6Hk7Csm58IeStWn5GZ/0%2BX-Test-Assignment%3A-Weather-App).
3. Create a **“Loading” screen** for the app with any loading indicator in it.

## Bug Fixes

Fix the bugs in the source code.

- The “Hourly Forecast” section should have a **scrollable list** of weather conditions for each hour until the next day.
- The “10-Day Forecast” section should have columns that **form a straight line** as [in the design](https://www.figma.com/file/9ZAG6Hk7Csm58IeStWn5GZ/0%2BX-Test-Assignment%3A-Weather-App).
- Each row of the “10-Day Forecast” should contain a temperature range with a gradient based on the lowest and highest temperature **for the whole 10-day period**. The temperatures of the current day (min, max, avg) should be placed on that range.

## Best Practices

Improve the quality of the existing source code by fixing poor solutions and implementing better practices. Pay attention to **any issues you find**, such as:

- Accessibility problems
- Brittle components
- Unoptimal styling
- Low performance
- High coupling
- Poor architecture
- Bad code metrics, etc

## Performance

Ensure that the app is performant by **measuring** web vitals or other relevant characteristics. Add those to the documentation file.

## Additional Features

The following features are **optional, so you can skip them** if you don't have enough time.

- Adapt the UI for **wider screens** (tablets and desktops), make sure there aren't any rendering issues.
- Improve the current location detection feature by showing the current **city name** instead of “Current Location” when the app gets access to the user's location.
- Handle any network errors **gracefully** to prevent “data flashing” on the screen.
- Make the app “installable” and **work offline**. You might need to save the latest data locally on the device to show it when offline.
