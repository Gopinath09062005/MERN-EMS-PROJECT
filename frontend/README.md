# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



Create a New Folder Name as EMS

Go to Terminal and type npm create vite@latest yourFolderName(frontend or Backend)

Next select React and Javascript

cd frontend

*npm install

npm run dev

npm install react-data-table-component styled-componenets axios react-icons react-router-dom tailwindcss postcss autoprefixed

npm install -D tailwindcss postcss autoprefixed

npx tailwindcss init -p

create new folder name as pages and components and utils in src folder


*




Backend

Create New folder as Server

Go to Terminal npm init -y

npm install bcrypt cors express jsonwebtoken 
mongoose multer nodemon path

create index.js file


add to package.json to type:"module"

Type "start": "nodemon --env-file.env index.js" in package.json

create .env file and type PORT = 5000

create models folder/ User.js

install mongodb compass

create folder name as models/User.js
create schema

create userSeed.js file
import User.js
import bcrypt
type email, password for admin

create folder name as db/db.js
import mongoose
connect Database

env file type MONGODB_URL="mongodb://localhost:27017/ems"

import db/db.js in seed.js

run to node --env-file=.env userSeed.js



next frontend App.js file creates BrowserRouter , routes, route

create pages/Login.jsx and AdminDashboard.jsx

set path in App.jsx file

Login file create a design
use useState() for email and password
use onChange{}
use onSubmit()={handleSubmit} in form


create routes folder in server
routes/auth.js
import express
set router.post method
import controller

create controller/authController.js
