const inquirer = require("inquirer"); //allows use of inquirer npm adding question functionality
const mysql = require("mysql"); //connects to database
const nodemon = require("nodemon"); //keeps server refreshing
const questions = require("./assets/questions");

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
  readAllData();
});

// start program

function optionsPrompt() {
  inquirer.prompt(questions.options).then(function (answer) {
    switch (answer.userAction) {
      case "View employees by department":
        viewByDepartment();
        break;
      case "View employees by role":
        viewByRole();
        break;
      case "Create New Department":
        createDepartment(answer.departmentName);
        break;
      case "Create New Role":
        createRole(answer.roleName, answer.roleSalary, answer.departmentNumber);
        break;
      case "Create New Employee":
        createEmployee();
        break;
      case "Delete Employee":
        deleteEmployee();
        break;
    }
  });
}

//**Reading data from database**

//displays all employee data on screen at start of application
function readAllData() {
  connection.query(
    `
  SELECT empl_id as id, empl_first_name as first_name, empl_last_name as last_name, 
  role_title as title, dep_name as department, role_salary as salary, manager_id as manager FROM cms.employee_role 
  LEFT JOIN cms.employee ON employee_role.id=employee.role_id 
  LEFT JOIN cms.department ON department.id=employee_role.department_id 
  WHERE empl_first_name IS NOT NULL;
  `,
    function () {
      optionsPrompt();
    }
  );
}

//Returns employee view by Department
function viewByDepartment() {
  connection.query(
    `SELECT empl_id as id, empl_first_name as first_name, empl_last_name as last_name, 
  role_title as title, dep_name as department, role_salary as salary, manager_id as manager FROM cms.employee_role 
  LEFT JOIN cms.employee ON employee_role.id=employee.role_id 
  LEFT JOIN cms.department ON department.id=employee_role.department_id 
  WHERE empl_first_name IS NOT NULL ORDER BY department ;`,
    function (err, result) {
      if (err) throw err;
      console.table(result);
      optionsPrompt();
    }
  );
}

//Returns employee data by Role
function viewByRole() {
  connection.query(
    `SELECT empl_id as id, empl_first_name as first_name, empl_last_name as last_name, 
  role_title as title, dep_name as department, role_salary as salary, manager_id as manager FROM cms.employee_role 
  LEFT JOIN cms.employee ON employee_role.id=employee.role_id 
  LEFT JOIN cms.department ON department.id=employee_role.department_id 
  WHERE empl_first_name IS NOT NULL ORDER BY title ;`,
    function (err, result) {
      if (err) throw err;
      console.table(result);
      optionsPrompt();
    }
  );
}

//Create New Section
function createEmployee() {
  inquirer.prompt(questions.createEmployeeQuestions).then(function (answer) {
    if ((answer.employeeManagerId = "undefined")) {
      answer.employeeManagerId = 0;
    }
    connection.query(
      `INSERT INTO cms.employee (empl_first_name, empl_last_name, role_id, manager_id) VALUES
       ('${answer.employeeFirstName}',
       '${answer.employeeLastName}',
        '${answer.employeeRoleId}',
        '${answer.employeeManagerId}'
        );`,
      function (error, results, fields) {
        viewByDepartment();
      }
    );
  });
}

//Delete Employee
function deleteEmployee() {
  connection.query(
    //pull a list of employees and their id's for user reference
    `SELECT empl_id AS id, empl_first_name, empl_last_name FROM cms.employee;`,
    function (error, results, feilds) {
      console.table(results)
      //then call  inquirer to ask user to choose which id to terminate an employee
      inquirer.prompt(questions.terminateEmployee).then(function (answer) {
        results.forEach((element) => {
          employeeId = parseInt(answer.employeeNames);
      //matches the answer to the correct employee to delete
          if (element.id === employeeId) {
            connection.query(
              `DELETE from cms.employee where empl_id = ${employeeId}`
            );
          }
        });
        //resets program
        viewByDepartment();
      });
    }
  );
}
