# Productive-Time Tracker
System to manage Productive-Time using the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique). You are able to add Projects to work on and track the time spent on each activity. 

## Technologies (Backend)
- Java 17: Main Backend Language

- Spring Boot: Responsible for creating the RESTful Web API

- Spring Security: Responsible for the Authentication and Authorization using JWT Tokens.

- Database (MySQL): Integrated with Spring Data JPA for data handling, ensuring data persistence, and efficient querying

- Maven: Dependencies Manager

## Technologies (Frontend)
- HTML/CSS: Responsible for the visual appearance and layout of the web pages, defining the structure and style of content

- JavaScript: Handles client-side logic, enabling interactions and managing connections with the backend.

- React.js: JavaScript library responsible for building the user interface with UI components, managing the state of the application, and rendering updates.

# Security
Has two levels of access: `Admin` and `User`.

- Admins: Can visualize all registered users, delete users and manage other admins. 
- Users: Only access their own account and projects.
  
Authentication and Authorization based on generated JWT tokens to securely transmit information.

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

![Captura de tela 2025-01-19 204445](https://github.com/user-attachments/assets/803025d0-1539-43ff-8571-6ca0c55c6cb8)

## Contact
Email: alvarocampioni@usp.br

