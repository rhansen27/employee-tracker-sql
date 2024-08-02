const pool = require("../db/dbConnection");

const getRoles = async () => {
  try {
    const roles = await pool.query(`
            SELECT * FROM roles;
            `);
    return roles.rows;
  } catch (err) {
    throw "Error getting roles";
  }
};

const getDepartments = async () => {
  try {
    const departments = await pool.query(`
            SELECT * FROM departments;
            `);
    return departments.rows;
  } catch (err) {
    throw "Error retrieving departments";
  }
};

const getEmployees = async () => {
  const employees = await pool.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.job_title, departments.department, roles.salary,
        CASE 
            WHEN employees.managers.first_name IS NOT NULL THEN concat_ws(' ', managers.first_name, managers.last_name
            ELSE NULL
        END AS manager
        FROM employees
        JOIN roles ON employees.role_id = roles.id
        JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees AS managers ON employees.manager_id = managers.id`);
  return employees.rows;
};
