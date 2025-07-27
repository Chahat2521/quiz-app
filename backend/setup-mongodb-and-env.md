# Setup MongoDB Locally and Configure Backend Environment

## Step 1: Install MongoDB on Windows

1. Go to the official MongoDB download page: https://www.mongodb.com/try/download/community
2. Download the Windows MSI installer.
3. Run the installer and follow the setup wizard.
   - Choose "Complete" setup type.
   - Optionally, install MongoDB as a Windows service.
4. After installation, MongoDB server (mongod) will be installed.

## Step 2: Start MongoDB Server

- If installed as a service, it should start automatically.
- Otherwise, open a new Command Prompt and run:
  ```
  "C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe"
  ```
  Replace `<version>` with your installed MongoDB version.

## Step 3: Verify MongoDB is Running

- Open a new Command Prompt and run:
  ```
  "C:\Program Files\MongoDB\Server\<version>\bin\mongo.exe"
  ```
- You should see the MongoDB shell prompt.

## Step 4: Create `.env` File in `backend` Directory

- In your project `backend` directory, create a file named `.env`.
- Add the following line to specify the MongoDB connection URI:
  ```
  MONGO_URI=mongodb://localhost:27017/register
  PORT=5000
  ```
- Save the file.

## Step 5: Run Backend Server

- Open PowerShell in your project root directory (`c:/Users/Lenovo/Desktop/tailwindcss4--`).
- Run the following command to start the backend server:
  ```
  cd backend; node server.js
  ```
- The server should connect to MongoDB and start listening on port 5000.

---

If you want, I can also help you automate some of these steps or verify the backend server is running correctly after setup.
