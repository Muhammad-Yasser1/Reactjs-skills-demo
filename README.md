### `How to use`
1. Download the files.
2. Execute npm install.
3. Create .env file.
4. Create a firebase project.
5. Copy your realtime db url and create a variable in .env file named `REACT_APP_FIREBASE_DB_API_URL=ADD_YOUR_DB_ROOT_URL_HERE`
6. Copy your web api key and create 2 variables named
`REACT_APP_FIREBASE_SIGNUP_USER_URL=https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]`
`REACT_APP_FIREBASE_SIGNIN_USER_URL=https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]`

### `Things I plan to add or improve when I have some free time`
- Improve accessibilty
- Write unit tests
- Make it a Progressive Web App, -- cahce the static contents -- make the CRUD operations work offline
