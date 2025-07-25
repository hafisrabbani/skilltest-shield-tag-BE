import express from 'express';

const r = express.Router();
import AuthController from "../../app/controller/AuthController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const authController = new AuthController();

r.post('/register', authController.register.bind(authController));
r.post('/login', authController.login.bind(authController));
r.post('/logout', authMiddleware, authController.logout.bind(authController));
r.get('/user', authMiddleware, authController.getUser.bind(authController));
r.get('/audit-logs', authMiddleware, authController.getAuditLogs.bind(authController));

export default r;