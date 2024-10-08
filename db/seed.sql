INSERT INTO departments (department)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (job_title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id)
VALUES
('John', 'Doe', 2),
('Jane', 'Smith', 1),
('Ryan', 'Hansen', 7),
('Test', 'Test', 2);