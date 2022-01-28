INSERT INTO departments
    (dept_name)
VALUES
    ('Sales'),
    ('Finance'),
    ('Legal'),
    ('Human Resources'),
    ('Customer Service'),
    ('Engineering');

INSERT INTO employee_role
    (title, salary, department_id)
VALUES
    ('Lawyer', 190000, 3),
    ('Legal Team Lead', 250000, 3),
    ('Accountant', 125000, 2),
    ('Account Manager', 160000, 2),
    ('Software Engineer', 70000, 6),
    ('Salesperson', 40000, 1),
    ('Sales Lead', 80000, 1),
    ('Lead Engineer', 150000, 6);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Carrie', 'Fin', 1, 3),
    ('Mike', 'Wunder', 3, 4),
    ('Kevin', 'Tupik', 2, NULL),
    ('Lola', 'Stevenson', 4, NULL),
    ('Trevor', 'Allen', 5, 6),
    ('Meghan', 'Swooney', 8, NULL),
    ('Sarah', 'Gourd', 7, NULL);