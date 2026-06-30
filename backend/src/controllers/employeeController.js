const User = require("../models/User");
const Employeee=require("../models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


export const getEmployee = async (req, res) => {
    try {
        // Get department from query
        const { department } = req.query;

        // Create filter object
        const where = {};

        if (department) {
            where.department = department;
        }

        // Fetch employees
        const employees = await Employee.find(where).sort({
            createdAt: -1
        }).populate("userId","role" , "email" ,"password").lean();

        // Send success response
        res.status(200).json({
            success: true,
            count: employees.length,
            employees
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch employees",
            error: error.message
        });
    }
};


export const createEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      role,
      password,
      department,
      position,
      basicSalary,
      allowances = 0,
      deductions = 0,
      employmentStatus = "ACTIVE",
      joinDate,
      image = null,
      bio = "",
    } = req.body;

    // Required field validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !role ||
      !password ||
      !department ||
      !position ||
      basicSalary === undefined ||
      !joinDate
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory.",
      });
    }

    // Department validation
    if (!DEPARTMENT.includes(department)) {
      return res.status(400).json({
        success: false,
        message: "Invalid department.",
      });
    }

    // Employment Status validation
    if (!["ACTIVE", "INACTIVE"].includes(employmentStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employment status.",
      });
    }

    // Salary validation
    if (
      Number(basicSalary) < 0 ||
      Number(allowances) < 0 ||
      Number(deductions) < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Salary values cannot be negative.",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role,
    });

    // Create Employee
    const employee = await Employee.create({
      userId: user._id,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      department,
      position: position.trim(),
      basicSalary: Number(basicSalary),
      allowances: Number(allowances),
      deductions: Number(deductions),
      employmentStatus,
      joinDate:new Date(joinDate),
      image,
      bio: bio.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Employee created successfully.",
      employee,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      firstName,
      lastName,
      email,
      phone,
      role,
      department,
      position,
      basicSalary,
      allowances,
      deductions,
      employmentStatus,
      joinDate,
      image,
      bio,
    } = req.body;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    // Validate department
    if (department && !DEPARTMENT.includes(department)) {
      return res.status(400).json({
        success: false,
        message: "Invalid department.",
      });
    }

    // Validate employment status
    if (
      employmentStatus &&
      !["ACTIVE", "INACTIVE"].includes(employmentStatus)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid employment status.",
      });
    }

    // Validate salary values
    if (
      (basicSalary !== undefined && Number(basicSalary) < 0) ||
      (allowances !== undefined && Number(allowances) < 0) ||
      (deductions !== undefined && Number(deductions) < 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Salary values cannot be negative.",
      });
    }

    // Check duplicate email
    if (email && email !== employee.email) {
      const existingEmployee = await Employee.findOne({
        email: email.toLowerCase().trim(),
        _id: { $ne: id },
      });

      if (existingEmployee) {
        return res.status(409).json({
          success: false,
          message: "Email already exists.",
        });
      }
    }

    // Update Employee
    employee.firstName = firstName ?? employee.firstName;
    employee.lastName = lastName ?? employee.lastName;
    employee.email = email?.toLowerCase().trim() ?? employee.email;
    employee.phone = phone ?? employee.phone;
    employee.department = department ?? employee.department;
    employee.position = position ?? employee.position;
    employee.basicSalary =
      basicSalary !== undefined
        ? Number(basicSalary)
        : employee.basicSalary;
    employee.allowances =
      allowances !== undefined
        ? Number(allowances)
        : employee.allowances;
    employee.deductions =
      deductions !== undefined
        ? Number(deductions)
        : employee.deductions;
    employee.employmentStatus =
      employmentStatus ?? employee.employmentStatus;
    employee.joinDate = joinDate ?? employee.joinDate;
    employee.image = image ?? employee.image;
    employee.bio = bio ?? employee.bio;

    await employee.save();

    // Update linked User
    if (employee.userId) {
      const user = await User.findById(employee.userId);

      if (user) {
        if (email) user.email = email.toLowerCase().trim();
        if (role) user.role = role;

        await user.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully.",
      employee,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    employee.isDeleted = true;
    employee.employmentStatus = "INACTIVE";

    await employee.save();

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};