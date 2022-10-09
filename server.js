const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
require("dotenv").config();
var Promise = require('promise');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'HRStampke22!',
    database: 'employee_db'
},
console.log(`Connected to employee database`)
);

connection.connect(function(err) {
    if (err) throw err;
    options();
});

function options() {
    inquirer
        .prompt({
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
                name: 'new_role',
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
                    for (let i = 0; i < res.length; i++) {
                        departmentArray.push(res[i].name);
                    }
                    return departmentArray;
                },
            }
        ]).then(function(answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
            connection.query(
                'INSERT INTO role SET ?', {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function(err, res) {
                    if (err) throw err;
                    console.log('Role has been added!');
                    console.table('All Roles', res);
                    options();
                })
        })
    })
};

function addEmployee() {
    connection.query('SELECT * FROM role', function(err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                    name: 'first_name',
                    type: 'input',
                    message: "Employee first name: ",
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: "Employee last name: "
                },
                {
                    name: 'manager_id',
                    type: 'input',
                    message: "Employee manager ID: "
                },
                {
                    name: 'role',
                    type: 'list',
                    choices: function() {
                        var roleArray = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArray.push(res[i].title);
                        }
                        return roleArray;
                    },
                    message: "Employee role: "
                }
            ]).then(function(answer) {
                let role_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].title == answer.role) {
                        role_id = res[a].id;
                        console.log(role_id)
                    }
                }
                connection.query(
                    'INSERT INTO employee SET ?', {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function(err) {
                        if (err) throw err;
                        console.log('Your employee has been added!');
                        options();
                    })
            })
    })
};

function exitApp() {
    connection.end();
};