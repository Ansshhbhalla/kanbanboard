Deployment

Interactive Kanban Board
This project is an interactive Kanban board built using React JS. It fetches data from the provided API and dynamically adjusts the board based on user preferences for grouping and sorting tickets.

Features
Grouping Options:
Group tickets by their Status, Assigned User, or Priority.

Sorting Options:
Sort tickets based on Priority (descending).
Sort tickets based on Title (ascending).

Priority Levels:
Tickets are grouped by the following priority levels:
Urgent (Priority level 4)
High (Priority level 3)
Medium (Priority level 2)
Low (Priority level 1)
No priority (Priority level 0)

Persistent State:
The app saves the user’s view state (grouping and sorting preferences) even after a page reload.
Responsive Design:

The Kanban board is designed to be responsive, adjusting to various screen sizes for optimal usability.

API Endpoint
The application fetches data from the following API:
https://api.quicksell.co/v1/internal/frontend-assignment

Scripts
npm start: Starts the development server.
npm run build: Builds the app for production.

Project Structure

Design
Pure CSS is used for styling the components.
No CSS frameworks (e.g., Bootstrap, Tailwind, Material UI) have been used, as per the project requirements.
The app replicates the provided design as closely as possible, ensuring visual consistency and a polished user interface.
