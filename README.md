# the-brand-wick

It is a simple and efficient authentication app built with ReactJS, Redux, NodeJS, ExpressJS, MongoDB, and ChakraUI.

<br/><br/>
# SERVER (API)
![nodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![mongoDB](https://img.shields.io/badge/MongoDB-000000?style=for-the-badge&logo=mongodb&logoColor=4EA94B)
![expressJS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![nodemon](https://img.shields.io/badge/Nodemon-000000?style=for-the-badge&logo=Nodemon&logoColor=76D04B)
![jwt](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![mongoose](https://img.shields.io/badge/Mongoose-000000?style=for-the-badge)
![bcrypt](https://img.shields.io/badge/Bcrypt-000000?style=for-the-badge)

## Backend Deployed Link:

https://expensive-worm-sari.cyclic.app

## Routes:

- /user

## /user

### Routes:

1. `POST /register` : to register a new user
2. `POST /login` : user login

### Features:

#### `POST /register`

- Attempting to register with the same email returns `{ message: "Email already exist. Please try with another email" }`

- Successfull registration returns `{ message: "Registered successfully." }`

#### `POST /login`

- Sending an unregistered email returns `{ message: "Email is not registered." }`

- Sending the wrong password returns `{ message: "Wrong Password" }`

* Successfull login returns `{ msg: "Login Successfull", token }` where token is a randomly genererated string that can be used for authentication.

### User Schema:

```
{
  _id: ObjectId,
  name: {type: String,required:true},
  username: {type: String,required:true},
  email: {type: String,required:true},
  phone: {type: Number,required:true},
  password: {type: String,required:true}
}
```

## Middlewares

1. **userAuth**: Verifies the token in header to check whether user is logged in. Applied on cart routes.


<br/><hr/><br/>


# CLIENT 

## Features: 

1. Facilitates the creation of a new user account through a dedicated signup form.   (/)
2. Enables users to securely log in using a designated login form.   (/login)
3. Empowers users to verify their authentication status.   (/verify)
4. Responsive and user-friendly design for seamless navigation.

## Frontend Deployed Link:

https://client-anubhav0391.vercel.app/

## Used Tech Stack :

`ReactJS`, `Redux`, `React Router`, `ChakraUI`, `Framer Motion`, `NodeJS`, `ExpressJS`, and `MongoDB`. 

## To Run Locally:

1. Clone the repository : `git clone https://github.com/Anubhav0391/the-brand-wick`
2. Open it in your code editor like VS Code Editer
3. Go to root folder `cd AuthApp/client`
4. Install the dependencies : `npm install`
5. Run Locally : `npm start`

## Pages:

### Sign UP 
<img src="https://i.ibb.co/mhN5d7L/login.png"/>

### Login
<img src="https://i.ibb.co/2Y9XpsJ/Login2.png"/>

### Authenticated Page
<img src="https://i.ibb.co/gySc3vm/token.png"/>
