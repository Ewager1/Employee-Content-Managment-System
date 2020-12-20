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
      createRoll();
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
    connection.end();
  });
}

//Returns all Employees
function readEmployees() {
  connection.query("SELECT * FROM employee", function (err, result) {
    if (err) throw err;
    console.table(result);
    connection.end();
  });
}

//Returns all Roles
function readRoles() {
  connection.query("SELECT * FROM employee_role", function (err, result) {
    if (err) throw err;
    console.table(result);
    connection.end();
  });
}

//**CREATE NEW IN DATABASE  */
function createDepartment(departmentName) {
  console.log(departmentName);
  connection.query(
    `INSERT INTO department (dep_name) VALUES ('${departmentName}')`,
    function (err, result) {
      if (err) throw err;
      readDepartments();
    }
  );
}
