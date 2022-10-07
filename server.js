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

// Department db
function viewDepartments() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('All departments:', res);
        options();
    })
};

function viewRoles() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('All roles:', res);
        options();
    })
};

function viewEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('All employees:', res);
        options();
    })
}

function addDepartment() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: 'newDepartment',
                type: 'input',
                message: 'What department are you adding?' 
            }]).then(function(answer) {
                connection.query(
                    'INSERT INTO department SET ?', {
                        name: answer.newDepartment
                    });
                var query = 'SELECT * FROM department';
                connection.query(query, function(err, res) {
                    if (err) throw err;
                    console.log('The department has been added!');
                    console.table('All departments:', res);
                    options();
                })
            })
    })
};

function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        inquirer
            .prompt ([{
                name: 'new-role',
                type: 'input',
                message: 'What role are you adding?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Roles annual salary?'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var departmentArray = [];
                    
                }
            }
        ])
    })
}