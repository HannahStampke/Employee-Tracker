const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
require("dotenv").config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_db'
},
console.log(`Connected to employee database`)
);

connection.connect(function(err) {
    if (err) throw err;
    PushSubscriptionOptions();
});

function options() {
    inquirer
        .createPromptModule({
            type: 'list',
            name: 'choices',
            message: 'What now?',
            choices: [
                'View departments',
                'View roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Exit!'
            ]
        }).then(function(answer) {
            switch (answer.choices) {
                case 'View departments' :
                    viewDepartments();
                    break;
                case 'View roles' :
                    viewRoles();
                    break;
                case 'View all employees' :
                    viewEmployees();
                    break;
                case 'Add a department' :
                    addDepartment();
                    break;
                case 'Add a role' :
                    addRole();
                    break;
                case 'Add an employee' :
                    addEmployee();
                    break;
                default:
                    break;
            }
        })
};