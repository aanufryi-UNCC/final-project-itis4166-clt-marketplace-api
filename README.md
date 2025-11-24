How to setup Enviroment
1. Clone the repository
  git clone "REPO_URL"
  cd final-project-itis4166

3. Install dependencies
   run npm install
   
4. Create a .env file in the root of the project
   Add the required enviroment variables to the file:
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/YOUR_DB_NAME" # PostgreSQL connection
   JWT_SECRET="jwt_secret_here" # JWT Secret key for authentication
   PORT=8080 # Server port
   
6. Prisma setup
   run the following commands:
   npx prisma generate
   npx prisma migrate dev
   
8. Run the seed command:
   npx prisma db seed
   
10. Start the server
   start the server by running this basic command:
   npm run dev
