const inquirer = require("inquirer");
const {
  getRoles,
  getDepartments,
  getEmployees,
  insertEmployeeData,
  insertRoleData,
  updateEmployeeRole,
} = require("./utils/queries");
