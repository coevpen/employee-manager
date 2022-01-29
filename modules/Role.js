const mysql = require('mysql2');
const conTable = require('console.table');


// show table for roles: job title, role id, department it belongs to, salary for role
function showRoles(){
    console.log("function called");
}

// adds a role
function addRole(){
    console.log("function called");
}

module.exports = { showRoles, addRole };