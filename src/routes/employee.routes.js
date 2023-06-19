import express from "express";
import { createEmployee, getAllEmployees } from "../controllers/employee.controller.js";
import { validateBody } from "../middleware/validator.middleware.js";
import { employeeSchema } from "../utils/schemas.js";
import checker from "../middleware/auth.middleware.js";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         make:
 *           type: string
 *         model:
 *           type: string
 *         year:
 *           type: number
 *         owner:
 *           type: string
 *           format: uuid
 */

/**
 * @openapi
 * /api/v1/employees:
 *   get:
 *     summary: Get all employees
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User does not have admin role
 *       500:
 *         description: Internal server error
 */

router.get("/", getAllEmployees);




// Create a new employee
/**
 * @swagger
 * /api/v1/employees:
 *   post:
 *     summary: Create a new employee
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *                 description: The make of the employee
 *                 example: Ford
 *               model:
 *                 type: string
 *                 description: The model of the employee
 *                 example: Mustang
 *               year:
 *                 type: number
 *                 description: The year of the employee
 *                 example: 2022
 *               owner:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the owner (User)
 *                 example: 603fcca6f4124c00151635b3
 *     responses:
 *       201:
 *         description: The created employee object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User does not have admin role
 *       500:
 *         description: Internal server error
 */

router.post("/", checker,validateBody(employeeSchema), createEmployee);




export default router;
