var inquirer = require("inquirer");

//Request the connection.js to start connection to the database
const connection = require("./connection.js");

//function to start the inquirer and display the questions menu
function init() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
            "View departments, roles, employees",
            "Add departments, roles, employees",
            "Update employee roles",
            "Delete departments, roles, and employees",
            "Exit"
            ]
        })
        //Calling the main functions to view, add, update or remove element of the tables
        .then(function(answer) {
            switch (answer.action) {
                case "View departments, roles, employees":
                view();
                break;
        
                case "Add departments, roles, employees":
                add();
                break;
        
                case "Update employee roles":
                update();
                break;
        
                case "Remove departments, roles, and employees":
                remove();
                break;
        
                case "exit":
                connection.end();
                break;
            }
      });
}
  
init()


//=============================================VIEWING=============================================
//Function View to view department, role and employee choices. This function call specific views functions
function view() {
    inquirer
        .prompt({
            name: "actionView",
            type: "list",
            message: "Select what you would like to view?",
            choices: [
                "View department",
                "View role",
                "View employee",
                "View employee by manager"
            ]
        })
        .then(function(answer) {
            switch (answer.actionView) {
                case "View department":
                viewDepartment();
                break;
        
                case "View role":
                viewRole();
                break;
        
                case "View employee":
                viewEmployee();
                break;

                case "View employee by manager":
                viewEmployeeByManager();
                break;
            }
        });
}

//Function to display Employees on the console
function viewEmployee() {
    var querySelect = "SELECT employee.id, first_name, last_name, title, salary, name, manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id";

    connection.query(querySelect, function(err, res) {
        if (err) throw err;
        console.table(res)
        init()
    });

}


//=============================================ADDING=============================================
//Function Add to add department, role and employee choices. This function call specific add functions
function add() {
    inquirer
        .prompt({
            name: "actionAdd",
            type: "list",
            message: "Select what you would like to add?",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
            ]
        })
        .then(function(answer) {
            switch (answer.actionAdd) {
                case "Add department":
                addDepartment();
                break;
        
                case "Add role":
                addRole();
                break;
        
                case "Add employee":
                addEmployee();
                break;
            }
        });
}

//Function to add a department
function addDepartment() {
    inquirer
        .prompt([
            {
                name: "departmentName",
                type: "input",
                message: "What is the department name?"
            }
        ])
        //Then insert information added, to the table
        .then(function (answer) {
            var query = "INSERT INTO department (name) VALUES (?)";
            connection.query(query, answer.departmentName, function(err, res) {
                if (err) throw err;
                console.log("Department added!")
                console.table(answer)
                init()
            });
        })
}

//Function to add a role
function addRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the role title?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the role salary?"
            },
            {
                name: "departmentId",
                type: "input",
                message: "What is the department ID for this role?"
            }
        ])
        //Then insert information added, to the table
        .then(function (answer) {
            var query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
            connection.query(query, [answer.title, Number(answer.salary), Number(answer.departmentId)], function(err, res) {
                if (err) throw err;
                console.log("Role added!")
                console.table(answer)
                init()
            });
        })
}

//Function to add an employee
function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee last name?"
            },
            {
                name: "roleId",
                type: "input",
                message: "What is the employee role ID?"
            },
            {
                name: "managerId",
                type: "input",
                message: "What is the employee manager ID?"
            }
        ])
        //Then insert information added, to the table
        .then(function (answer) {
            var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
            connection.query(query, [answer.firstName, answer.lastName, Number(answer.roleId), Number(answer.managerId)], function(err, res) {
                if (err) throw err;
                console.log("Employee added!")
                console.table(answer)
                init()
            });
        })
}