# Productive-Time Tracker
System to manage Productive-Time using the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique). You are able to add Projects to work on and track the time spent on each activity. 

## Technologies (Backend)
- Java 17: Main Backend Language

- Spring Boot: Responsible for creating the RESTful Web API

- Spring Security: Responsible for the Authentication and Authorization using JWT Tokens. Manages two levels of access: `Admin` and `User`. Admins can manage all Users and their Projects. Users only access their own Projects.

- Database (MySQL): Integrated with Spring Data JPA for data handling, ensuring data persistence, and efficient querying

- Maven: Dependencies Manager

## Technologies (Frontend)
- HTML/CSS: Responsible for the visual appearance and layout of the web pages, defining the structure and style of content

- JavaScript: Handles client-side logic, enabling interactions and managing connections with the backend.

- React.js: JavaScript library responsible for building the user interface with UI components, managing the state of the application, and rendering updates.

# Security
Manages two levels of access: `Admin` and `User`.
- Admins: Can manage all Users and their Projects. 
- Users: Only access their own Projects.
Authentication and Authorization based on generated JWT tokens.

# Run Locally

## Prerequisites
- JDK 17
- Maven 3.6+
- MySQL
- Node.js
- Git

## Configuring (Backend)

### 1. Clone the Repository
```
git clone https://github.com/your-username/projects_manager.git
cd projects_manager
```
### 2. Installing Dependencies
To install all the necessary dependencies, run the following command at the root of the project's backend : `backend/projectsmanager`
```
mvn clean install
```
This command will download all the dependencies specified in the `pom.xml` file and compile the project.

### 3. Configuring Database
Set up the connection to your Database in `application.properties`
```
spring.datasource.url=jdbc:mysql://localhost:3306/your-data-base
spring.datasource.username=your-username
spring.datasource.password=your-password
```

### Running
- Open the project in your IDE. 
- Locate the main class with the @SpringBootApplication annotation.
- Run this class as a Java application.
The backend server will be running on:
```
http://localhost:8080
```

## Configuring (Frontend)

### 1. Installing Dependencies
To install all the necessary dependencies, run the following command at the root of the project's frontend : `frontend/projectsmanager`
```
npm install
```
This command will download all the dependencies specified in the `package.json` file and compile the project.

### Running
After all dependencies have been installed, execute the command at the root of the project's frontend : `frontend/projectsmanager`
```
npm run dev
```
The frontend server will be running on:
```
http://localhost:3000
```

Make sure both of them are running when using the system to avoid errors.

## Demo

![App demo](https://github.com/user-attachments/assets/f9ee15a9-8247-46e5-a8e9-0131e4f72578)

## Contact
Email: alvarocampioni@usp.br
