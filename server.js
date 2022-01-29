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

// will call the opening prompt that 
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
                        departments.name AS department,
                        employee_role.salary
                        CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee
                        LEFT JOIN employee_role ON employee.role_id = employee_role.id
                        LEFT JOIN departments ON employee_role.department_id = departments.id
                        LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    db_connection.query(query, (err, res) => {
        if(err) throw err;
        console.log("\n");
        console.table(res);
        mainMenu();
    });

}

// adds an employee
function addEmployee(){
    console.log("function called");

}

// updates employee role
function updateEmployeeRole(){
    console.log("function called");

}



/*
*
*   ROLE FUNCTIONS
*
*/

// show table for roles: job title, role id, department it belongs to, salary for role
function showRoles(){
    console.log("function called");
}

// adds a role
function addRole(){
    console.log("function called");
}



/*
*
*   DEPARTMENTS FUNCTIONS
*
*/

// show table for departments and department ids
function showDepartments(){
    console.log("function called");

}

function addDepartment(){
    console.log("function called");

}