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
            "Remove departments, roles, and employees",
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
                "View employee"
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
            }
        });
}

//Function to display Department on the console
function viewDepartment() {
    const querySelect = "SELECT * FROM department";

    connection.query(querySelect, function(err, res) {
        if (err) throw err;
        console.table(res)
        init()
    });
}

//Function to display Roles on the console
function viewRole() {
    const querySelect = "SELECT role.id, title, salary, name FROM role LEFT JOIN department ON role.department_id = department.id";

    connection.query(querySelect, function(err, res) {
        if (err) throw err;
        console.table(res)
        init()
    });
}

//Function to display Employees on the console
function viewEmployee() {
    const querySelect = "SELECT employee.id, first_name, last_name, title, salary, name, manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id";

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
            const query = "INSERT INTO department (name) VALUES (?)";

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
            const query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";

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
            const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";

            connection.query(query, [answer.firstName, answer.lastName, Number(answer.roleId), Number(answer.managerId)], function(err, res) {
                if (err) throw err;
                console.log("Employee added!")
                console.table(answer)
                init()
            });
        })
}


//=============================================UPDATING=============================================
//Function Update to update department, role and employee input. This function call specific updates functions
function update() {
    inquirer
        .prompt({
            name: "actionUpdate",
            type: "list",
            message: "Select what you would like to update?",
            choices: [
                "Update department",
                "Update role",
                "Update employee"
            ]
        })
        .then(function(answer) {
            switch (answer.actionUpdate) {
                case "Update department":
                updateDepartment();
                break;
        
                case "Update role":
                updateRole();
                break;
        
                case "Update employee":
                updateEmployee();
                break;
            }
        });
}

//Function to update a department data
function updateDepartment() {
    inquirer
        .prompt([
            {
                name: "departmentId",
                type: "input",
                message: "What is the department ID?"
            },
            {
                name: "name",
                type: "input",
                message: "What is the new department name?"
            }
        ])
        .then(function(answer) {
            const query = "UPDATE department SET name = ? WHERE id = ?";

            connection.query(query, [answer.name, Number(answer.departmentId)], function(err, res) {
                if (err) throw err;
                console.log("Department updated!")
                console.table(answer)
                init()
            });
        });
}

//Function to a role data
function updateRole() {
    inquirer
        .prompt([
            {
                name: "roleId",
                type: "input",
                message: "What is the role ID?"
            },
            {
                name: "title",
                type: "input",
                message: "What is the new role title?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the new role salary?"
            },
            {
                name: "departmentId",
                type: "input",
                message: "What is the new department ID for this role?"
            }
        ])
        .then(function(answer) {
            const query = "UPDATE role SET title = ?, salary = ?, department_id = ? WHERE id = ?";

            connection.query(query, [answer.title, Number(answer.salary), Number(answer.departmentId), Number(answer.roleId)], function(err, res) {
                if (err) throw err;
                console.log("Role updated!")
                console.table(answer)
                init()
            });
        });
}

function updateEmployee() {
    inquirer
        .prompt([
            {
                name: "employeeId",
                type: "input",
                message: "What is the employee ID?"
            },
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
        .then(function(answer) {
            const query = "UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?";

            connection.query(query, [answer.firstName, answer.lastName, Number(answer.roleId), Number(answer.managerId), Number(answer.employeeId)], function(err, res) {
                if (err) throw err;
                console.log("Employee updated!")
                console.table(answer)
                init()
            });
        });
}


//=============================================DELETING=============================================
//Function Remove to delete department, role and employee input. This function call specific removes functions
function remove() {
    inquirer
        .prompt({
            name: "actionRemove",
            type: "list",
            message: "Select what you would like to remove?",
            choices: [
                "Remove department",
                "Remove role",
                "Remove employee"
            ]
        })
        .then(function(answer) {
            switch (answer.actionRemove) {
                case "Remove department":
                removeDepartment();
                break;
        
                case "Remove role":
                removeRole();
                break;
        
                case "Remove employee":
                removeEmployee();
                break;
            }
        });
}

//Function to remove a Department on the table
function removeDepartment() {
    inquirer
        .prompt({
            name: "removeDepartmentId",
            type: "input",
            message: "Enter the department ID you would like to delete?"
        })
        .then(function(answer) {
            const query = "DELETE FROM department WHERE id=?";

            connection.query(query, Number(answer.removeDepartmentId), function(err, res) {
                if (err) throw err;
                console.log("Department deleted!")
                console.table(answer)
                init()
            });
        });
}

//Function to remove a Role on the table
function removeRole() {
    inquirer
        .prompt({
            name: "removeRoleId",
            type: "input",
            message: "Enter the role ID you would like to delete?"
        })
        .then(function(answer) {
            const query = "DELETE FROM role WHERE id=?";

            connection.query(query, Number(answer.removeRoleId), function(err, res) {
                if (err) throw err;
                console.log("Role deleted!")
                console.table(answer)
                init()
            });
        });
}

//Function to remove an Employee on the table
function removeEmployee() {
    inquirer
        .prompt({
            name: "removeEmployeeId",
            type: "input",
            message: "Enter the employee ID you would like to remove?"
        })
        .then(function(answer) {
            const query = "DELETE FROM employee WHERE id=?";

            connection.query(query, Number(answer.removeEmployeeId), function(err, res) {
                if (err) throw err;
                console.log("Employee deleted!")
                console.table(answer)
                init()
            });
        });
}