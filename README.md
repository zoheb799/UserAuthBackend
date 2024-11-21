UserAuthBackend
This is the backend repository for the User Authentication System. It provides a secure and scalable setup for managing user authentication, leveraging Node.js, Express, and MongoDB.

🔧 Setup Instructions
1. Clone the Repository
Clone this repository to your local machine:

bash
Copy code
git clone https://github.com/zoheb799/UserAuthBackend
2. Create an .env File
Inside the project directory, create a file named .env and configure the following environment variables:

env
Copy code
PORT="Your desired port number (except 3000)"
MONGO_URI="Your MongoDB connection string"
JWT_SECRET="Your secret key for JWT (example: e238iiuyfeiugdw7ewl)"
3. Install Dependencies
Run the following command in your terminal to install the required packages:

bash
Copy code
npm install
4. Start the Development Server
Start the server in development mode:

bash
Copy code
npm run dev
🛠 Technologies Used
Node.js: JavaScript runtime environment.
Express.js: Web framework for Node.js.
MongoDB: NoSQL database for storing user data.
JWT (JSON Web Token): For secure user authentication.
📂 Project Structure
bash
Copy code
/src
  ├── models/       # Mongoose models
  ├── routes/       # API routes
  ├── controllers/  # Request handlers
  └── middlewares     # auth functions
.env                # Environment variables
📌 Key Features
Secure user authentication using JWT.
Scalable MongoDB integration.
Modular and easy-to-extend codebase.
🌟 Contributions
Feel free to fork the repository, raise issues, or submit pull requests to enhance the project.

