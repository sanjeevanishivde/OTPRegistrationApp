# OTPRegistrationApp

A full-stack OTP-based registration application built with React (frontend) and Spring Boot (backend).  
This project implements secure mobile number verification via OTP, user registration, and validation flows.

---

## Features

- OTP generation and validation with timer and resend limit  
- User registration form with validation  
- Role-based flow control  
- Integration with MySQL database using Spring Boot  
- RESTful API backend with React frontend  
- Responsive UI and user-friendly interface  

---

## Technologies Used

- Frontend: React.js, Axios, CSS  
- Backend: Spring Boot, Java, Spring Data JPA  
- Database: MySQL (via XAMPP/phpMyAdmin)  
- Tools: Git, Maven, Node.js  

---

## Installation & Setup

### Backend

1. Clone the repository:
    ```bash
    git clone https://github.com/sanjeevanishivde/OTPRegistrationApp.git
    ```
2. Navigate to backend folder:
    ```bash
    cd OTPRegistrationApp/backend
    ```
3. Configure your MySQL database settings in `application.properties`  
4. Build and run Spring Boot app:
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```

### Frontend

1. Navigate to frontend folder:
    ```bash
    cd OTPRegistrationApp/frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the React app:
    ```bash
    npm start
    ```

---

## Usage

- Open your browser and navigate to `http://localhost:3000` (React app)  
- Enter your mobile number to receive OTP  
- Validate OTP within timer limit  
- Fill registration details and submit  
- Data will be saved in MySQL database  

---

## Author

Sanjeevani Shivde  
[GitHub Profile](https://github.com/sanjeevanishivde)

