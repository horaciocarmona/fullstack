import { Router } from 'express'
import { getUsers,getUserById } from "../controllers/user.controller.js";
import { passportError, authorization } from "../utils/messageErrors.js";

const routerUsers = Router()
  
routerUsers.get('/', passportError('current'),authorization(['admin']),getUsers)
routerUsers.get("/:id",passportError('current'),authorization(['admin']),getUserById)

export default routerUsers

// import { Router } from "express";
// import { createUser, getUserById } from "../controllers/user.controller.js";
// import passport from "passport";

// const routerUser = Router()
// // routerUser.post("/", createUser)
// //routerUser.post("/register",passport.authenticate('register'),createUser)
// // routerUser.get("/registerJWT",passport.authenticate('jwt',{session:false},createUser))

// export default routerUser