const inquirer = require("inquirer"); //allows use of inquirer npm adding question functionality
const mysql = require("mysql"); //connects to database
const nodemon = require("nodemon"); //keeps server refreshing
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
    switch (answer.userAction) {
      case "View a department":
        readDepartments();
        break;
      case "View a role":
        readRoles();
        break;
      case "View an Employee":
        readEmployees();
        break;
      case "Create New Department":
        createDepartment(answer.departmentName);
        break;
      case "Create New Role":
        createRole(answer.roleName, answer.roleSalary, answer.departmentNumber);
        break;
      case "Create New Employee":
        createEmployee(
          answer.employeeFirstName,
          answer.employeeLastName,
          answer.employeeRoleId,
          answer.employeeManagerId
        );
        break;
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

//creates new Employee, then lets user see employeese
function createEmployee(
  firstName,
  lastName,
  employeeRoleId,
  employeeManagerId
) {
  connection.query(
    `INSERT INTO employee ( empl_first_name, empl_last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', '${employeeRoleId}', '${employeeManagerId}')`,
    function (err, result) {
      if (err) throw err;
      readEmployees();
    }
  );
}
