// create a employee
import {PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function createEmployee(req, res) {
  try {
   const {
  firstName,
  lastName,
  nationalId,
  telephone,
  email,
  department,
  position,
  laptopManufacturer,
  laptopModel,
  serialNumber
} = req.body   
  
     
    const employee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        nationalId,
        telephone,
        email,
        department,
        position,
        laptopManufacturer,
        laptopModel,
        serialNumber,
      },
    });

    return res.status(201).json(employee);
  } catch (error) {
    console.error("Error creating employee:", error);
    return res.status(500).send("Internal server error");
  }
}
// Get all employees
export async function getAllEmployees(req, res) {
  try {
    const query = req.query;
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 2;
    const last_page = req.query.last_page;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};
    const totalCount = await prisma.employee.count();
    const totalPage = Math.ceil(totalCount / limit);
    const currentPage = page || 0;
        if (page < 0) {
          return res.status(400).json("Page value should not be negative");
        } else if (page === 1 && !last_page) {
          result.totalCount = totalCount;
          result.totalPage = totalPage;
          result.currentPage = currentPage;
          result.next = {
            page: page + 1,
            limit: limit,
          };
          result.employeesData = await prisma.employee.findMany({
            take: limit,
            skip: startIndex,
            orderBy: {
              id: "desc",
            },
          });
          res.paginatedResult = result;
          result.currentCountPerPage = Object.keys(result.employeesData).length;
          result.range = currentPage * limit;
          return res.status(200).json(result);
        } else if (endIndex < totalCount && !last_page) {
          result.totalCount = totalCount;
          result.totalPage = totalPage;
          result.currentPage = currentPage;
          result.next = {
            page: page + 1,
            limit: limit,
          };
          result.employeesData = await prisma.employee.findMany({
            take: limit,
            skip: startIndex,
            orderBy: {
              id: "desc",
            },
          });
          res.paginatedResult = result;
          result.currentCountPerPage = Object.keys(result.employeesData).length;
          result.range = currentPage * limit;
          return res.status(200).json(result);
        } else if (startIndex > 0 && !last_page) {
          result.totalCount = totalCount;
          result.totalPage = totalPage;
          result.currentPage = currentPage;
          result.previous = {
            page: page - 1,
            limit: limit,
          };
          result.employeesData = await prisma.employee.findMany({
            take: limit,
            skip: startIndex,
            orderBy: {
              id: "desc",
            },
          });
          res.paginatedResult = result;
          result.currentCountPerPage = Object.keys(result.employeesData).length;
          result.range = currentPage * limit;
          return res.status(200).json(result);
        } else if (last_page === "true" && page === totalPage) {
          result.totalCount = totalCount;
          result.totalPage = totalPage;
          result.currentPage = totalPage;
          result.last = {
            page: totalPage,
            limit: limit,
          };
          result.employeesData = await prisma.employee.findMany({
            take: limit,
            skip: startIndex,
            orderBy: {
              id: "desc",
            },
          });
          res.paginatedResult = result;
          result.currentCountPerPage = Object.keys(result.employeesData).length;
          result.range = totalCount;
          return res.status(200).json(result);
        } else {
          return res.status(404).json({ error: "Resource not found" });
        }
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).send("Internal server error");
  }
}






