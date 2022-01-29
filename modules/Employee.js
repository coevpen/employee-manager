const mysql = require('mysql2');
const conTable = require('console.table');

// show table for Employees: id, first and last name, job title, department, salary, manager reporting
function showEmployees(){
    console.log("function called");

}

// adds an employee
function addEmployee(){
    console.log("function called");

}

// updates employee role
function updateEmployeeRole(){
    console.log("function called");

}

module.exports = { showEmployees, addEmployee, updateEmployeeRole };