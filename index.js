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

const init = async () => {
  let isRunning = true;

  while (isRunning) {
    const answers = await inquirer.prompt(startingQuestions);
    switch (answers.answer) {
      case "View all employees":
        let viewEmployeeData = await getEmployees();
        console.table(viewEmployeeData);
        console.log("Viewing all employees");
        break;
      case "Add an employee":
        let roleList = await getRoles();
        let roleNames = roleList.map((role) => role.job_title);
        let employeeData = await getEmployees();
        let managerNames = employeeData.map(
          (manager) => `${manager.first_name} ${manager.last_name}`
        );

        const employeeQuestions = [
          {
            type: "text",
            name: "first_name",
            message: "Add employee first name:",
          },
          {
            type: "text",
            name: "last_name",
            message: "Add employee last name:",
          },
          {
            type: "list",
            name: "role",
            message: "Choose employee role:",
            choices: roleNames,
          },
          {
            type: "list",
            name: "manager",
            message: "Choose employee manager:",
            choices: ["None", ...managerNames],
          },
        ];
        const employeeAnswers = await inquirer.prompt;

        const selectedRole = roleList.find(
          (role) => role.job_title === employeeAnswers.role
        );
    }
  }
};
