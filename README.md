# AI Phishing Checker

This project is a web tool that uses the Google Gemini AI to analyze emails for phishing attempts. You paste in the email content, and the app tells you if it looks suspicious.

## Live Demo : https://phishing-checker.vercel.app/

## 🛠 Tech Stack

* **Frontend:** React
* **Backend:** Spring Boot (Java)
* **AI Model:** Google Gemini
* **Deployment:** Frontend on Vercel, Backend on Render (using a `Dockerfile`)



## 🏃 How to Run Locally

You'll need to run the backend and frontend in two separate terminals.

### 1. Backend (Spring Boot)

1.  Navigate to the backend folder:
    ```bash
    cd backend/phishing-checker
    ```

2.  Add your API key:
    Open the file `src/main/resources/application.properties` and add the following line:
    ```properties
    gemini.api.key=your_gemini_api_key_here
    ```

3.  Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```
    The backend will now be running on `http://localhost:8080`.

### 2. Frontend (React)

1.  Navigate to the frontend folder:
    ```bash
    cd frontend
    ```

2.  Create an environment file:
    Create a new file named `.env` in the `frontend` folder. This tells your React app where to find the backend API:
    ```
    VITE_API_URL=http://localhost:8080
    ```
    *(If you used Create React App, use `REACT_APP_API_URL` instead of `VITE_API_URL`)*

3.  Install dependencies and run the app:
    ```bash
    npm install
    npm run dev
    ```
    The frontend will now be running on `http://localhost:5173` (or a similar port).

---

