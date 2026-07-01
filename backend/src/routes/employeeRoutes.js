import express from "express";

import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";
import { protect, protectAdmin } from "../middleware/auth.js";
const router = express.Router();

// Create Employee
router.post("/", createEmployee);

// Get All Employees
router.get("/", protect ,protectAdmin, getAllEmployees);

// Get Single Employee
router.get("/:id",protect,protectAdmin,getEmployeeById);

// Update Employee
router.put("/:id",protect,protectAdmin, updateEmployee);

// Soft Delete Employee
router.delete("/:id",protect,protectAdmin, deleteEmployee);

export default router;