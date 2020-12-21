const { create } = require("domain");
const inquirer = require("inquirer"); //allows use of inquirer npm adding question functionality
const mysql = require("mysql"); //connects to database
const nodemon = require("nodemon"); //keeps server refreshing
const { createBrotliDecompress } = require("zlib");
const questions = require("./Develop/questions");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Jesterman17!",
  database: "cms",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

// start program

function start() {
  inquirer.prompt(questions).then(function (answer) {
    if (answer.userAction === "View a department") {
      //query department data
      readDepartments();
    } else if (answer.userAction === "View a role") {
      readRoles();
    } else if (answer.userAction === "View an Employee") {
      readEmployees();
    } else if (answer.userAction === "Create New Department") {
      createDepartment(answer.departmentName);
    } else if (answer.userAction === "Create New Role") {
      createRole(answer.roleName, answer.roleSalary, answer.departmentNumber);
    } else if (answer.userAction === "Create New Employee") {
      createEmployee();
    }
  });
}

//**Reading data from database**

//Returns all Departments
function readDepartments() {
  connection.query("SELECT * FROM department", function (err, result) {
    if (err) throw err;
    console.table(result);
  });
}

//Returns all Employees
function readEmployees() {
  connection.query("SELECT * FROM employee", function (err, result) {
    if (err) throw err;
    console.table(result);
  });
}

//Returns all Roles
function readRoles() {
  connection.query("SELECT * FROM employee_role", function (err, result) {
    if (err) throw err;
    console.table(result);
  });
}

//**CREATE NEW IN DATABASE  **/

//Creates new Departments, then lets user see departments
function createDepartment(departmentName) {
  connection.query(
    `INSERT INTO department (dep_name) VALUES ('${departmentName}')`,
    function (err, result) {
      if (err) throw err;
      readDepartments();
    }
  );
}

//creates new Role, then lets user see roles
function createRole(roleName, roleSalary, departmentId) {
  connection.query(
    `INSERT INTO employee_role (role_title, role_salary, department_id) VALUES ('${roleName}', '${roleSalary}', '${departmentId}')`,
    function (err, result) {
      if (err) throw err;
      readRoles();
    }
  );
}
