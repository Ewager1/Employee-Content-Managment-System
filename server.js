const inquirer = require("inquirer"); //allows use of inquirer npm adding question functionality
const mysql = require("mysql"); //connects to database
const nodemon = require("nodemon"); //keeps server refreshing
const cTable = require("console.table"); //allows easier reading of table data

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

//move everything below this to seperate files later

function start() {
  inquirer.prompt(questions).then(function (answer) {
    if (answer.userAction === "View a department") {
      //query department data
      readDepartments();
    } else if (answer.userAction === "View a role") {
      readRoles();
    } else {
      readEmployees();
    }
  });
}

const questions = [
  {
    type: "list",
    name: "userAction",
    message: "What would you like to do?",
    choices: ["View a department", "View a role", "View an Employee"],
  },
  {
    type: "input",
    name: "item",
    message: "What is the name of the item you are listing?",
    when: (answers) =>
      answers.userAction === "Which Department would you like to view?",
  },
];

//Returns all Departments
function readDepartments() {
  connection.query("SELECT * FROM department", function (err, result) {
    if (err) throw err;
    console.log(result);
    connection.end();
  });
}

//Returns all Employees
function readEmployees() {
  connection.query("SELECT * FROM employee", function (err, result) {
    if (err) throw err;
    console.log(result);
    connection.end();
  });
}

//Returns all Roles
function readRoles() {
  connection.query("SELECT * FROM employee_role", function (err, result) {
    if (err) throw err;
    console.log(result);
    connection.end();
  });
}
