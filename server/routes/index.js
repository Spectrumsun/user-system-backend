import express from "express";
import "dotenv/config";
import userController from "../Controller/userController";
import auth from '../middleware';

const router = express.Router();

router.get("/", userController.welcome);

router.post("/signup", 
  auth.checkUserExist, 
  userController.signUp
);

router.post("/signin", userController.login);

router.get("/user-profile", 
  auth.verifyToken, 
  userController.getUserProfile
);

router.post("/update-profile", 
  auth.verifyToken, 
  userController.updateProfile
);

router.get("/users", 
  auth.verifyToken, 
  auth.validateAdmin, 
  userController.getAllUsers
);

router.put("/suspend-account/:id", 
  auth.verifyToken, 
  auth.validateAdmin, 
  userController.suspendAccount
);

router.put("/update-role/:id", 
  auth.verifyToken, 
  auth.validateAdmin, 
  userController.updateRole
);

router.use("*", (req, res) =>
  res.status(404).json({
    message: "That url does not exist on this server 🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫",
  })
);

export default router;