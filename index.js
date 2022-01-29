// dependencies
const inquirer = require('inquirer');
const deptQuery = require('./modules/Department');
const roleQuery = require('./modules/Role');
const employeeQuery = require('./modules/Employee');


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
                deptQuery.showDepartments();
                mainMenu();
                break;

            case 'View all roles':
                roleQuery.showRoles();
                mainMenu();
                break;

            case 'View all employees':
                employeeQuery.showEmployees();
                mainMenu();
                break;

            case 'Add a department':
                deptQuery.addDepartment();
                mainMenu();
                break;

            case 'Add a role':
                roleQuery.addRole();
                mainMenu();
                break;

            case 'Add an employee':
                employeeQuery.addEmployee();
                mainMenu();
                break;

            case 'Update an employee role':
                employeeQuery.updateEmployeeRole();
                mainMenu();
                break;

            case 'Quit':
                process.exit();
                
            default:
                break;
        }
    });
};

module.exports = {mainMenu};