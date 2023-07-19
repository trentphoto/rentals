# DC Camera Rentals Website

## Features & Functionality
- Authentication: users can create an account, log in, and log out. Each request to the backend is validated with a JSON Web Token, stored in the browser's LocalStorage.
- DatePicker: the DatePicker component uses React's Context API to persist the user's date selection across the application.
- Shopping cart: users can add and remove items from their cart.
- Favorites: users can favorite an item from its individual page, then view a list of their favorited items in their account dashboard.
- Checkout: users can complete a checkout process, which converts their active cart into a reservation that appears in their account dashboard.
- Dynamic Navbar: the Navbar will show different buttons based on whether you are signed in or not.

## Tech Stack
- React + Next.js for frontend
- Node.js + Express backend
- SQL + SQLite database
- JSONWebToken for authentication
- 

## Design Decisions
1. **Component Abstraction:** In order to increase modularity and reusability within the code, many components have been abstracted and reused multiple times. This design decision was made to promote a DRY (Don't Repeat Yourself) codebase, and it also facilitates easier debugging and updates.
2. **React.js Frontend:** I chose to use React.js for the frontend for several reasons. Firstly, I had previous experience in React, which allowed for efficient and familiar development. Additionally, React provides comprehensive state management and an efficient component-based architecture that aids in making our UI modular and scalable. The availability of hooks like useEffect, which enable API calls on component load, also contributed to this decision.
3. **Node.js Backend:** Node.js was chosen for the backend due to its compatibility with React. It allows the backend of the project to be written in JS like the frontend.
4. **Root Level Folders:** The project structure was designed with separate root level folders for frontend, backend, and database. This organization was chosen to help maintain a clean and intuitive project structure, making it easier for anyone else to understand and contribute to the project.
5. **Card-based UI:** I decided on a card-based user interface for its clean, intuitive, and mobile-friendly design. The card-based design not only makes the content more digestible for users but also adapts well to various screen sizes, improving the overall user experience.
6. **Persistent Date Selection via React Context:** I opted to use React's Context API to persist the user's date selection across the application. This design decision was made to prevent the loss of user's selection as they navigate through the site, ensuring a consistent and user-friendly experience.
7. **User Authentication via JWT:** I chose to use JSON Web Tokens (JWT) for user authentication due to its stateless nature and ease of implementation. JWT offers several advantages, such as compact size, which is beneficial for performance, and the ability to easily share secure information between parties. This ensures the security of user data while maintaining a high level of performance.

## Potential Improvements
1. **Pricing Calculation:** Currently, the rental rates are static, regardless of the rental period. To improve this, dynamic pricing calculations could be introducted, to adjust based on rental duration. This feature could offer discounted rates for longer rental periods, encouraging users to rent for extended durations. Additionally, we could also consider excluding weekends from the rental period calculation to offer additional flexibility and cost-saving opportunities to customers.
2. **Add More Tests:** More comprehensive testing would increase the robustness of the application, catch potential bugs earlier, and improve overall confidence in the code. This could involve adding unit tests for more complex functions, more extensive integration tests to ensure all parts of the system work together correctly, and additional end-to-end tests to guarantee that the application as a whole is functioning as expected.
3. **Better Authentication:** Although the existing authentication system based on JSON Web Tokens (JWT) is robust, it could be enhanced further. We could implement additional security measures such as multi-factor authentication (MFA) for heightened security, ensuring an even more secure environment for our users. Other improvements could include features like password strength validation and auto-logout after a period of inactivity to protect user accounts even when users may not be fully security-conscious. Additionally, we could include the option to login with other accounts such as Google or iCloud.

## Known Issues
- Currently the app does not process payments as part of the checkout process.

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
