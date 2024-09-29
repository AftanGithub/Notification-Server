# Notification App with Real-Time Feature

This is a Node.js application that provides a simple notification system with user registration, login, and real-time notifications using Socket.IO and PostgreSQL.

## **Features**
- User Registration and Login
- JWT Authentication
- Sending Notifications
- Real-Time Notifications with Socket.IO
- Storing Notifications in PostgreSQL
- Pagination for notifications
- Mark all notifications as read at once
- Dockerized setup

## **Technologies Used**
- Node.js (Express)
- PostgreSQL
- Socket.IO
- Sequelize ORM
- Docker
- JWT (JSON Web Token)
- bcrypt for password hashing

## **Prerequisites**
- Docker & Docker Compose
- Node.js (if running locally without Docker)
- PostgreSQL (if running locally without Docker)

## **Getting Started**

### **1. Clone the Repository**
```bash
git clone https://github.com/AftanGithub/Notification-Server
cd Notification-Server
```

### 2. Set Up Environment Variables
Create a .env file in the root directory with the following content:
```bash
PORT=5000
DB_PASSWORD="Admin@Home563#"
DB_NAME="testdb"
DB_HOST="localhost"
ENV="PROD"
JWT_SECRET="JWT_secret@!23"
```
### 3. **Docker Setup**

This project is containerized using Docker, allowing you to run the Node.js application and PostgreSQL database in isolated containers.

### **Prerequisites**

- Ensure Docker and Docker Compose are installed on your machine:
  - [Install Docker](https://docs.docker.com/get-docker/)
  - [Install Docker Compose](https://docs.docker.com/compose/install/)

### Create the Docker Network (if not created already): 
```bash
docker network create my-network
```
### Start the App Using Docker Compose:
```bash
docker-compose up -d
```
### Access the application
The Node.js app will be running at http://localhost:5000
PostgreSQL will be accessible at localhost:5432

### Verify the Containers are Running:
```bash 
docker ps
```
### Stopping the App:
```bash 
docker-compose down
```

### 4. **Running Locally Without Docker**
a. Install Dependencies
```bash
npm install
```
b. Start PostgreSQL Database
Ensure PostgreSQL is running locally with the same credentials in the .env file.

c. Run the Application
```bash
npm start
```
The app should now be running on http://localhost:5000


## **API Documentation**

### **1. User Registration**
- **Endpoint:** `POST /users/register`
- **Request Body:**
    ```json
    {
      "username": "user123",
      "password": "password123"
    }
    ```
- **Response:** `201 Created` or `400 Bad Request` if the username is already taken.

### **2. User Login**
- **Endpoint:** `POST /users/login`
- **Request Body:**
    ```json
    {
      "username": "user123",
      "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
      "token": "jwt_token_here"
    }
    ```

### **3. Send Notification**
- **Endpoint:** `POST /notifications/send`
- **Headers:** `Authorization: <JWT>`
- **Request Body:**
    ```json
    {
      "senderId": 1,
      "receiverId": 2,
      "message": "Hello from user123"
    }
    ```
- **Response:** `201 Created`

### **4. Get Notifications**
- **Endpoint:** `GET /notifications?page=1&limit=10`
- **Headers:** `Authorization: <JWT>`
- **Response:**
    ```json
    {
      "notifications": [
        {
          "id": 1,
          "senderId": 1,
          "receiverId": 2,
          "message": "Hello",
          "isRead": false,
          "createdAt": "2024-09-29T12:34:56.000Z"
        }
      ],
      "pagination": {
        "totalItems": 100,
        "totalPages": 10,
        "currentPage": 1
      }
    }
    ```

### **5. Mark Notification as Read**
- **Endpoint:** `PUT /notifications/:id/read`
- **Headers:** `Authorization: <JWT>`
- **Response:** `200 OK`

### **6. Mark All Notifications as Read**
- **Endpoint:** `PUT /notifications/mark-all-read`
- **Headers:** `Authorization: <JWT>`
- **Response:** `200 OK`

## **Real-Time Notification**

- This application uses Socket.IO to notify users in real-time. When a notification is sent, the receiver gets notified immediately if they are online.

## **Testing**

You can test the endpoints using Postman or any other API testing tool. Ensure you include the JWT token in the `Authorization` header for protected routes.

## **Troubleshooting**

- Ensure Docker is running properly if using Docker.
- Ensure the `.env` file contains the correct database credentials.
- Check the logs with `docker-compose logs -f` if any issues occur.




