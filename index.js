const inquirer = require("inquirer");
const {
  getRoles,
  getDepartments,
  getEmployees,
  insertEmployeeData,
  insertRoleData,
  updateEmployeeRole,
} = require("./utils/queries");

const startingQuestions = [
  {
    type: "list",
    name: "answer",
    message: "What would you like to do?",
    choices: [
      "View all employees",
      "Add an employee",
      "Update an employee role",
      "View all roles",
      "Add a role",
      "View all departments",
      "Add a department",
      "Quit",
    ],
  },
];

const employeeQuestions = [
  {
    type: "text",
    name: "name",
    message: "Add employee name:",
  },
];
