## Adding typescript and linters

I added typescript because programming with types is more safe and clear (and also because it was one of the tasks).
Also, I added stylelint and eslint to make the code style consistent.
All configs are standard because the project doesn't need to have some specific rules and standard configuration is enough.

## Page decompose

I separated `App` component's view to three components - Current, Hourly and Daily forecasts to make code mo readable.
Also I used css modules instead of common css to avoid styles collision.
Data fetching also was moved to separate files to make code more readable and separate logic and view
