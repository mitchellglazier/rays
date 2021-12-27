# Rays

## Angular Project

-Must have Node-
run `npm install -g @angular/cli` to get Angular CLI

## Generate Node Modules

run `npm install` to install dependencies and node modules

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`

### Explanation

I Started the project by implementing state management for Angular, NGRX. This helps our application have a single source of truth when it comes to state, and if this application where to grow, keep our state uniform and organized. When the application is started a call is made to the API and the results are stored in state, which can be accessed from anywhere.

After storing the results, I focused on presenting the data and doing so in a manner which renders quickly. This data set is not large but I decided to implement two small virtual scroll tables (one for pitchers and one for hitters) that render a portion of the data in the DOM, to demonstrate faster rendering techniques.

I decided to use a third party styling library to present the data. The components used within the library are common components that can be found in various libraries and I tried not to use components that do the heavy lifting (ex. material table).

I built my own basic table within virtual scroll CDK with the ability to search 2 columns within the table. Material table has built in functionality within the data source to search the complete table but I decided to build my own table to demonstrate the ability to build my own components with their own functionality and not rely on pre-built library components. I decided to only show a subset of the columns in the table as each player has various different statistics and I did not want a cluttered table.

As both the tables have common functionality, I decided to use 2 instances of the same component with different data. As the data is retrieved from a third party API, I decided to show any and all data that is received from the API, within the player card. If the API were to send different statistics that would automatically be presented giving our application flexibility.

### Possible Additional Features

Lazy loading each tab via routing

Adding selected player to routing for the ability to send a link to selected player

Adding selected player to state

Adding/removing columns to table

Sorting on table

Graphs
