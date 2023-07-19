# DC Camera Rentals Website

## Features & Functionality
- Authentication: users can create an account, log in, and log out. Each request to the backend is validated with a JSON Web Token, stored in the browser's LocalStorage.
- DatePicker: the DatePicker component uses React's Context API to persist the user's date selection across the application.
- Shopping cart: users can add and remove items from their cart.
- Favorites: users can favorite an item from its individual page, then view a list of their favorited items in their account dashboard.
- Checkout: users can complete a checkout process, which converts their active cart into a reservation that appears in their account dashboard.
- Dynamic Navbar: the Navbar will show different buttons based on whether you are signed in or not.

## Design Decisions
- component abstraction
- React.js frontend. Reasons: I had previous experience in react, and chose it for state management, and ability to make api calls on component load with hooks like useEffect.
- Node.js backend. allows for good integration with React.
- folders at root level: frontend, backend, database. 
- card-based UI
- persistent date selection via React Context
- user authentication via JWT. Chose this
- 


## Potential Improvements
- pricing calculation: different rates for different rental periods, exclude weekends, etc.
- add more tests
- better authentication

## Known Issues
- no known issues

## lessons learned
- troubleshooting well. favorites feature took me 6hr when i estimated 1hr. much of that was debugging. 

## Concepts practiced
- JWT authentication
- React strict mode
- component-based architcture for modular, reusable, and scalable UI
- React hooks
- React context API
- NextJS router 
- API routes using Node.js backend
- Sqlite database
- 