# DC Camera Rentals Website
#### Video Demo:  https://youtu.be/NJRtj43n2mo
#### Description:  A full-stack web application I built for my [Harvard CS50 final project](https://cs50.harvard.edu/x/2023/project/).

## Features & Functionality
- Browse photography equipment to rent, select dates, add to cart, and check out. Register, log in, favorite items, and view your reservations.
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
- TailwindCSS for styling

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
- Currently only runs locally. I plan to deploy it to a web server in the future.
- There are a few issues with the date picker I would like to tighten up. It works, but a few edge cases need to be accounted for.
- When adding to cart, the Nav doesn't update the Cart count until the next page load. I plan to build out a solution to use the Context API to keep track of the cart, which would solve this issue.
- Auth token expires after 1hr, but the app doesn't immediately log the user out. I would like to implement this but am still thinking on the most elegant way to do it.

## Lessons Learned
- Importance of troubleshooting well. I spent a lot of time debugging, and this taught me the importance of thinking abuot my process and having a specific algorithm and way of going about the troubleshooting process.
- Underestimating the amount of time it takes to build a feature. For example, when I set out to build the favorites feature, I estimated 1hr for it, but it took me almost 6. On the other hand, once I developed a strong mental model for how to implement a certain query, reusing that model or design pattern elsewhere in the app was much quicker (a good example was using the user's JWT token to get the user ID and corresponding data). 

## Concepts practiced
- JWT authentication. Creating a user account, logging user in and out with JWTs. Also, the API endpoints don't need the user's ID included in the req url. They look it up using the token to get the user's ID and pass that to whatever SQL query is needed for that particular endpoint. 
- React strict mode. Hadn't used this too much previously. The main thing to note here is that in Strict Mode, React renders each component twice instead of once. This threw me off at first (why am I seeing two identical console.logs?) but this was good experience for future work in React.
- Component-based architcture for modular, reusable, and scalable UI. Anytime I wrote the same code or copy/pasted anything, I thought about how I could abstract it. I'm particularly proud of how the Account page looks - it's just 22 lines including comments, almost fully abstracted into custom components.
- React hooks. I used useEffect and useState a lot, as usual for me. But I also got more familiar with Context, with its Provider component and useContext hook. In the future, one way this app can be improved is by integrating the app's Context state more tightly with the SQL backend - which can be done via the updateContext function in the main createContext file.
- NextJS router. Specifically, using the useRouter hook to get the url param for the single product page.
- Creating API routes using Node.js backend. This was very new for me but this project provided extensive practice with all 4 CRUD types.
- Sqlite database. Making SQL queries in API endpoint functions and manipulating the data was a lot of fun. The Cart query and the Reservations query both get a little crazy, accessing several tables with several inner joins. Although this was only implemented locally, a future step can be to deploy this to something like AWS, Google Cloud, or DigitalOcean. 
