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

        const selectedManager = employeeData.find(
          (employee) =>
            `${employee.first_name} ${employee.last_name}` ===
            employeeAnswers.manager
        );

        const firstName = employeeAnswers.first_name;
        const lastName = employeeAnswers.last_name;
        const roleId = selectedRole.id;
        const managerId = selectedManager ? selectedManager.id : null;

        await insertEmployeeData(firstName, lastName, roleId, managerId);
        console.log("Employee added");
        break;

      case "Update an employee role":
        const employees = await getEmployees();
        let employeeNames = employees.map(
          (employee) => `${employee.first_name} ${employee.last_name}`
        );

        const roles = await getRoles();
        let roleTitles = roles.map((role) => role.job_title);

        const updateEmployeeQuestions = [
          {
            type: "list",
            name: "employee",
            message: "Choose employee to update:",
            choices: employeeNames,
          },
          {
            type: "list",
            name: "role",
            message: "Choose new role:",
            choices: roleTitles,
          },
        ];

        const updateEmployeeAnswers = await inquirer.prompt(
          updateEmployeeQuestions
        );

        const selectEmployee = employees.find(
          (employee) =>
            `${employee.first_name} ${employee.last_name}` ===
            updateEmployeeAnswers.employee
        );

        const selectRole = roles.find(
          (role) => role.job_title === updateEmployeeAnswers.role
        );

        await updateEmployeeRole(selectEmployee.id, selectRole.id);
        console.log("Employee role updated");
        break;

      case "View all roles":
        const viewAllRoles = await getRoles();
        console.table(viewAllRoles);
        break;

      case "Add a role":
        let departmentList = await getDepartments();
        let departmentNames = departmentList.map(
          (department) => department.department
        );

        const roleQuestions = [
          {
            type: "text",
            name: "role",
            message: "Add role name:",
          },
          {
            type: "number",
            name: "salary",
            message: "Add role salary:",
          },
          {
            type: "list",
            name: "department",
            message: "Choose department:",
            choices: departmentNames,
          },
        ];

        const roleAnswers = await inquirer.prompt(roleQuestions);

        const roleName = roleAnswers.role;
        const salary = roleAnswers.salary;
        const departmentTitle = roleAnswers.department;

        const selectedDepartment = departmentList.find(
          (department) => departmentTitle === department.department
        );

        await insertRoleData(roleName, salary, selectedDepartment.id);
        console.log("Role added");
        break;

      case "View all departments":
        const viewAllDepartments = await getDepartments();
        console.table(viewAllDepartments);
        break;
    }
  }
};
