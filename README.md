
# AI Image Generator
![Version](https://img.shields.io/badge/Version-%5E0.1.0-blue.svg?style=for-the-badge)
![Node.js](https://img.shields.io/badge/node.js-%3E%3D14.17.0-brightgreen.svg?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%5E18.3.1-blue.svg?style=for-the-badge&logo=react&logoColor=white)

## About
This project is an AI image generator that uses the Hugging Face API to generate images based on user input. The project is built using React, Express, and Node.js.

## Installation
#### 1. Clone the repository
Clone the repository using the following command:
```bash
git clone "https://github.com/sadiqhussain13/ai-image-generator.git"
cd ai-image-generator
```
#### 2. Install dependencies
Install the necessary dependencies using the following command:
```bash
npm install
```
#### 3. Set up environment variables
Create a `.env` file in the root of the project and add the following environment variable:
```bash
REACT_APP_HUGGINGFACE_API=YOUR_API_KEY
```
Replace `YOUR_API_KEY` with your actual Hugging Face API key.

## Running the Application
#### 1. Start the backend server
Start the backend server using the following command:
```bash
npm run start:backend
```
This will start the Express server on port 8000.

#### 2. Start the frontend server
Start the frontend server using the following command:
```bash
npm run start:frontend
```
This will start the React development server on port 3000.

#### 3. Open the application
Open the application in your web browser by navigating to http://localhost:3000.

## Technologies Used

| Technology | Description |
|------------|-------------|
| ![React](https://img.shields.io/badge/react-%5E18.3.1-blue.svg?style=for-the-badge&logo=react&logoColor=white) | Frontend framework |
| ![Express](https://img.shields.io/badge/Express-%5E4.19.2-green.svg?style=for-the-badge&logo=express&logoColor=white) | Backend framework |
| ![Node.js](https://img.shields.io/badge/node.js-%3E%3D14.17.0-brightgreen.svg?style=for-the-badge&logo=node.js&logoColor=white) | Runtime environment |
| ![Hugging Face API](https://img.shields.io/badge/Hugging%20Face%20API-%5E3.1.0-orange.svg?style=for-the-badge&logo=huggingface&logoColor=white) | AI image generation API |
| ![Axios](https://img.shields.io/badge/Axios-%5E1.7.3-purple.svg?style=for-the-badge&logo=axios&logoColor=white) | HTTP client library |
| ![CORS](https://img.shields.io/badge/CORS-%5E2.8.5-yellow.svg?style=for-the-badge&logo=cors&logoColor=white) | Cross-origin resource sharing library |
| ![dotenv](https://img.shields.io/badge/dotenv-%5E16.4.5-pink.svg?style=for-the-badge&logo=dotenv&logoColor=white) | Environment variable management library |
