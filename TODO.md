# TODO List for Fixing Chat App Bugs

## Backend Improvements
- [x] Add validation for Stream API keys in stream.js
- [ ] Improve error messages in chat.controller.js
- [x] Add better error handling for missing env vars

## Frontend Improvements
- [x] Update HomePage.jsx to display specific error messages from useStreamChat
- [x] Fix Router context issue in UsersList component

## Project Setup
- [x] Add dev script in root package.json to run backend and frontend concurrently
- [ ] Ensure environment variables are set in backend/.env

## Testing
- [x] Run the project with npm run dev
- [x] Test login functionality
- [ ] Test chat functionality
