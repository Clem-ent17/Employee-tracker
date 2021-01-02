# homework-12

MySQL: Employee Tracker


## Links:

GitHub repository: 
https://github.com/Clem-ent17/Employee-tracker


## User story:

* AS A business owner
* I WANT to be able to view and manage the departments, roles, and employees in my company
* SO THAT I can organize and plan my business


## Description:

This app is an interfaces that make it easy for non-developers to view and interact with information stored in databases. I built a solution for managing a company's employees using node, inquirer, and MySQL.

That command-line application allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * View employees by manager

  * Update departments, roles, and employees

  * Delete departments, roles, and employees

  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department


## Installation:

* Make sure to install the `package.json` by typing `npm install` in your console.

* The dependencies are, [MySQL](https://www.npmjs.com/package/mysql), [inquirer](https://www.npmjs.com/package/inquirer), and [console.table](https://www.npmjs.com/package/console.table).

* After installing the dependencies you can run the app by typing into your terminal: `node server.js`


## Database:

The database schema containing three tables:

![Database Schema](Assets/schema.png)

* **department**:

  * **id**
  * **name** - hold department name

* **role**:

  * **id**
  * **title** -  hold role title
  * **salary** -  hold role salary
  * **department_id** -  hold reference to department role belongs to

* **employee**:

  * **id** 
  * **first_name** - hold employee first name
  * **last_name** - hold employee last name
  * **role_id** - hold reference to role employee has
  * **manager_id** - hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
  

## Usage:

* The command-line application should allow users to:

  * Add departments, roles, employees

  ![Add](Assets/employee-tracker-add-gif.gif)

  * View departments, roles, employees

  ![View](Assets/employee-tracker-view-gif.gif)

  * Update employee departments, roles, employees

  ![Update](Assets/employee-tracker-update-gif.gif)

  * Remove departments, roles, and employees

  ![Remove](Assets/employee-tracker-remove-gif.gif)

  * View the total utilized budget of a department 

  ![budget](Assets/employee-tracker-budget-gif.gif)


* When running the user can navigate through the application by using UP arrow, DOWN arrow and press ENTER


## Technologies:

* Technology used in this application: 
    - JavaScript
    - MySQL
    - MySQL Workbench
    - GitHub

* npm dependencies: 
    - [MySQL](https://www.npmjs.com/package/mysql)
    - [inquirer](https://www.npmjs.com/package/inquirer)
    - [console.table](https://www.npmjs.com/package/console.table)


## Project status:

* When deleted, the note doesn't refresh on the browser, without hitting reload.

- - -

Clement Valles
