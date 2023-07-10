## Adding typescript and linters

I added typescript because programming with types is more safe and clear (and also because it was one of the tasks).
Also, I added stylelint, eslint, and prettier to make the code style consistent.
All configs are standard because the project doesn't need to have some specific rules and standard configuration is enough.

## Additional dependencies

I added only two additional dependencies:
- axios - to make data fetching a little bit easier.
- classnames - to add several classes to one element a little bit easier.
- svgo - to optimize svg files.

I chose these libs because there are popular, have good support and typings, and have a small size.

I didn't add any state manager because there are not many different shared data and state managers on the one hand wouldn't make data management better and on the other hand, increased bundle size.

## Css modules

I wrote styles in css modules instead of plain css files to isolate component styles. Also, it helps to avoid unexpected selectors collisions.

## Project structure

I separated code for the several folder:
- api - this folder contains functions to invoke different APIs (now AccuWeather API only) and mapping data from API's format to project's models.
It helped to isolate data fetching logic from view logic which makes the code more clear.
Also, by this approach, this data fetching logic (or source) can be easily replaced by another without influencing to another app's parts.
- components - this folder contains all reusable components.
I made this because it helps to find necessary shared component when you need those.
Also, this components are simple and usually don't contains some side effect so those can be safely used in the different app's parts.
- constants - folder for different global constants (actually now there is media constant only).
- hooks - this folder contains sharable hooks.
I moved some logic to standalone hooks to decrease APP component's code and made those more esy to read and debugging.
- icons - this folder contains different svg icons.
- layouts - this folder contains different page layouts (now it contains only the main page layout).
I moved layouts (one layout actually) to create some reusable page templates.
It can help to create pages with the same layouts without duplicated code.
- models - this folder contains the app's data models and types.
I move data types to this directory because those are shared between many app parts.
Also, updating data types is easier when all data types contain in standalone place.
- pages - this folder contains components that render pages using layouts.
I moved these components to a standalone folder to highlight that these components render page content and cannot be reusable.
- services - this folder contains functions that call API and caches fetching data.
I moved all API calls and data caching to standalone files to add some level of abstraction.
it helps to hide details about how we invoke API and cache data from the view part.
Also, it can be replaced with another without any influence on other parts (that can be useful if we want to add high-level tests or replace caching logic).
- utils - this folder contains global utils.

Also there are two files in src directory:
- index - it calls root app's component.
- App - it fetches data and contains logic for different pages rendering

## Data fetching

I chose AccuWeather API because it is popular on the one hand and on another hand has a free license key.
Unfortunately, it doesn't provide 10 days or 24 hours forecast so I used 5 days and 12 hours data but I hope that it will be enough for the test app.

If current API key would be expired, please generate a new key and update it in src/api/constants file.

## Data caching

### Why local storage

I saved the data cache using `Local Storage` because we don't have big data and `Local Storage` limits should be enough.
Also `Local Storage` supports by many modern browsers.
Because local storage can contain only the `string` format, I parsed a saved `string` to JSON and transform the `datetime` value to JS `Date` (because this format is better for future usage).

In the future, if we would need more caching data, `Local Storage` can be replaced with `IndexDB`, for example.

### Caching logic

#### Disclaimer

Some caching policies are very strict because there are low request limits in AccuWeather free API.
For this reason, I fetch data as rarely as possible.
Alternatives for fetching 

#### Cache invalidation logic

For location I saved the location key to a cache because it is usually the same for the same `lat` and `lon`.
As a key, I used `lat` and `lon` pair.
Also, I have some cache lifetime (7 days).
I chose this lifetime because location keys change very rarely.
And if we had bigger limits, this lifetime can be changed to 1 day for example.

For the current forecast if compare the last fetching time and the current time.
If the time delta is more, than 10 minutes - I'm trying to fetch new data.

For hourly and daily forecasts I get data from the cache until the first element in the last caching data in a current period (period equals hour for the hourly forecast and day for the daily).

In the future would be great to fetch data more often and set the cache lower lifetime (1-2 minutes for current, 10 minutes for hourly, and 1 hour for daily forecasts for example).

#### Restore data from cache

If current conditions fetching failed I'm trying to get weather conditions from hourly data.
It can be less accurate, but it is still quite good.

If hourly or daily forecast fetching failed, I filtered the last fetched data to exclude data from the past.

## Layouts

I chose `grid` to create layouts because it is well-supported technology nowadays and it helps to compose elements in different ways very easily.

### Loading screen

I made the loading screen similar to the real one to decrease the layout shift when data will be loaded.
Also, I am showing the loading screen with a little delay, because in most cases data fetching is very fast, and fast-changing screens can be annoying.
But in the right way, this approach should be discussed with a designer.

### Desktop layout

I moved the current forecast to the left side on a desktop view because there is more space on a desktop screen.
Also, I increased the bar's width to make the picture a little bit bigger.

In an hourly forecast, I added some scroll buttons, because horizontal scroll with a mouse can be difficult.

## Fetching errors notifications

I show some messages on a top of a screen if there were some errors when I fetched forecast data.
Badges disappeared after 5 seconds because I thought that the user can see those for this time.
But it is also a good point to discuss with a designer, how to show it properly.

## To next iteration

- offline mode - I didn't finish, but I supported data caching, and static caching can be implemented using ServiceWorkers.
- current temperature pointer - I had no idea how to create an invisible border around it and I will be glad to discuss how it can be implemented.
- sticky heading - in figma files I found the layout with a sticky header state.
But this state wasn't described in the task description.
- tests - unit, screenshot, and e2e tests can increase app stability
- monitoring - adding some logs and monitoring (like Sentry) can help to find some errors
- deployment - it is necessary to add deployment.
Also, we can use CDNs to increase static files loading speed 