DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS employee_role;
DROP TABLE IF EXISTS department;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE employee_role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    -- to hold reference to the department role it belongs to
    department_id INTEGER,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    -- holds reference to role id employee belongs to
    FOREIGN KEY (role_id)
    REFERENCES employee_role(id)
);