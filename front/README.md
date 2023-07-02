# Adlis

Adlis is an application that allows users to browse books, add reviews, and mark them as favorites. It has been developed by **Olivier Maria**, **Zitouni Fadili**, and **Faouzi Benidiri**.

## Main Features

- **Browse Books:** The application provides a user-friendly interface to explore a vast collection of books.
- **Create** an Account: Users can create a personal account to access additional features.
- **Add Reviews:** Registered users can share their reviews on the books they have read.
- Mark Books as Favorites: Users can bookmark their favorite books and easily find them in their favorites list.

## Technologies Used

- **Backend:** Rails API
- **Frontend:** React with Tailwind CSS

## Additional Features

Additional features will be added to the application over time.

## Style and Design

The application has been designed with a visually appealing and intuitive user interface. The combination of React and Tailwind CSS ensures a modern and responsive design.

## Repository Links

- Backend API Repository:[Link to the Backend repository](https://github.com/faouzi-benidiri/adlis_back)
- Frontend Repository: **This repository**

## Running the Application

To run the Adlis application, please follow the instructions below:

### Backend Setup

1. Clone the backend repository and navigate to the project directory.
2. Install the required dependencies mentioned in the Gemfile by runing `bundle install.`
3. Set up the PostgreSQL database and ensure that it is running by runing :

- `sudo service postgresql start`
- `rails db:create`
- `rails db:migrate`

4. Configure the necessary environment variables (**sendgrid api into .env**)
5. Start the backend server.

### Frontend Setup

1. Clone the frontend repository and navigate to the project directory.
2. Install Node.js if not already installed.
3. Install the required dependencies using the package manager of your choice.
4. Configure the necessary environment variables **google api**.
5. Start the frontend development server.

Please refer to the README files in the respective repositories for detailed instructions on setting up the backend and frontend environments.

Access the Adlis application by opening your browser and visiting [http://localhost:3000](http://localhost:3000).

Note: Make sure the backend server is running before starting the frontend server to ensure proper communication between the two.
