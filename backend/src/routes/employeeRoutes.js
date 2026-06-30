import express from "express";

import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";

const router = express.Router();

// Create Employee
router.post("/", createEmployee);

// Get All Employees
router.get("/", getAllEmployees);

// Get Single Employee
router.get("/:id", getEmployeeById);

// Update Employee
router.put("/:id", updateEmployee);

// Soft Delete Employee
router.delete("/:id", deleteEmployee);

export default router;