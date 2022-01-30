//const startPrompt = require('./index');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const conTable = require('console.table');
require('dotenv').config();

// database connection configuration
const db_connection = mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
});

// makes the database connection
db_connection.connect(err => {
    if(err) throw err;
    console.log("connected");
    main();
})


// prints the opening message once connection is made
function main(){

    console.log(
        `         ---------------------------------------------------
        |                                                   |
        |                 Welcome To                        |
        |                                                   |
        |               Employee Manager                    |
        |                                                   |
         ---------------------------------------------------`
    );

    mainMenu();
}

// will call the opening prompt 
function mainMenu(){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Quit"
            ]
        }
    ])
    .then(chosen => {
        switch(chosen.choice){
            case 'View all departments':
                showDepartments();
                break;

            case 'View all roles':
                showRoles();
                break;

            case 'View all employees':
                showEmployees();
                break;

            case 'Add a department':
                addDepartment();
                break;

            case 'Add a role':
                addRole();
                break;

            case 'Add an employee':
                addEmployee();
                break;

            case 'Update an employee role':
                updateEmployeeRole();
                break;

            case 'Quit':
                db_connection.end();
                process.exit();
                
            default:
                break;
        }
    });
};


/*
*
*   EMPLOYEE FUNCTIONS
*
*/

// show table for Employees: id, first and last name, job title, department, salary, manager reporting
function showEmployees(){
        let query = `SELECT employee.id,
                        employee.first_name,
                        employee.last_name,
                        employee_role.title,
                        departments.dept_name AS department,
                        employee_role.salary,
                        CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee
                        LEFT JOIN employee manager ON employee.manager_id = manager.id
                        INNER JOIN employee_role ON employee.role_id = employee_role.id
                        INNER JOIN departments ON employee_role.department_id = departments.id
                        `;
    db_connection.query(query, (err, res) => {
        if(err) throw err;
        console.log("\n");
        console.log("Showing all employees. \n");
        console.table(res);
        mainMenu();
    });

}

// adds an employee
function addEmployee(){
    db_connection.query(`SELECT * FROM employee_role`, (err, res) => {
        if(err) throw err;
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?",
                validate: first => {
                    if(first){
                        return true;
                    }
                    else{
                        console.log("Please provide a first name.");
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?",
                validate: last => {
                    if(last){
                        return true;
                    }
                    else{
                        console.log("Please provide a last name.");
                        return false;
                    }
                }
            },
            {
                type: "list",
                name: "role",
                message: "What is this employee's role?",
                choices: function(){
                    var role = [];
                    for(var i = 0; i < res.length; i++){
                        role.push(res[i].title);
                    }
                    return role;
                }
            
            }
        ])
        .then(answers => {
            var employeeInfo = [answers.first_name, answers.last_name];

            var roleId;
            for(var i = 0; i < res.length; i++){
                if(res[i].title === answers.role){
                    roleId = res[i].id;
                }
            }
            employeeInfo.push(roleId);
            

            db_connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", (err, res) => {
                if(err) throw err;
                inquirer.prompt([
                    {
                        type: "list",
                        name: "manager",
                        message: "Who is the employee's manager?",
                        choices: function(){
                            var manager = [];
                            for(var i = 0; i < res.length; i++){
                                manager.push(res[i].first_name + " " + res[i].last_name);
                            }
                            return manager;
                        }
                    
                    }
                ])
                .then(answers => {
                    var managerId;
                    for(var i = 0; i < res.length; i++){
                        if(res[i].first_name + " " + res[i].last_name === answers.manager){
                            managerId = res[i].id;
                        }
                    }
                    employeeInfo.push(managerId);
  
                    const insert = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`;
                    db_connection.query(insert, employeeInfo, (err, res) => {
                        if(err) throw err;
                        console.log("\n");
                        console.log("Employee added \n");
                        showEmployees();
                    });

                });
            });
        });
            
    });
}

// updates employee role
function updateEmployeeRole(){
    console.log("function called");
    mainMenu();

}


/*
*
*   ROLE FUNCTIONS
*
*/

// show table for roles: job title, role id, department it belongs to, salary for role
function showRoles(){
    let query = `SELECT employee_role.title,
                        employee_role.id,
                        departments.dept_name AS department,
                        employee_role.salary
                        FROM employee_role
                        INNER JOIN departments on employee_role.department_id = departments.id `;
    db_connection.query(query, (err, res) => {
        if(err) throw err;
        console.log("\n");
        console.log("Showing all roles. \n");
        console.table(res);
        mainMenu();
    });
}

// adds a role and then shows roles table
function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "What is the role title?",
            validate: role => {
                if(role){
                    return true;
                }
                else{
                    console.log("Please enter a role title.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary amount?",
            validate: salary => {
                if(salary){
                    return true;
                }
                else{
                    console.log("Please enter a dollar amount.");
                    return false;
                }
            }
        }
    ])
    .then(answers => {
        const roleInfo = [answers.role, answers.salary];
        db_connection.query(`SELECT dept_name, id FROM departments`, (err, res) => {
            if(err) throw err;
            const allDepts = res.map(({dept_name, id}) => ({name: dept_name, value: id}));

            inquirer.prompt([
                {
                    type: "list",
                    name: "department",
                    message: "What department is this role in?",
                    choices: allDepts
                }
            ])
            .then(choice => {
                roleInfo.push(choice.department);
                
                const sqlQuery = `INSERT INTO employee_role (title, salary, department_id) VALUES (?, ?, ?)`;
                db_connection.query(sqlQuery, roleInfo, (err, res) =>{
                    if(err) throw err;
                    console.log("\n");
                    console.log("Added role. \n");
                    showRoles();
               });
            });
        });
    });
}


/*
*
*   DEPARTMENTS FUNCTIONS
*
*/

// show table for departments and department ids
function showDepartments(){
    let query = `SELECT * FROM departments`;
    db_connection.query(query, (err, res) => {
        if(err) throw err;
        console.log("\n");
        console.log("Showing all departments. \n");
        console.table(res);
        mainMenu();
    });

}

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "dept",
            message: "What department do you want to add?",
            validate: dept => {
                if(dept){
                    return true;
                }
                else{
                    console.log("Please enter a department name.");
                    return false;
                }
            }
        }
    ])
    .then(answer => {
        const insert = `INSERT INTO departments (dept_name) VALUES(?)`;
        db_connection.query(insert, answer.dept, (err, res) => {
            if(err) throw err;
            console.log("\n");
            console.log("Department added \n");
            showDepartments();
        });
    });

}