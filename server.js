const inquirer = require("inquirer"); //allows use of inquirer npm adding question functionality
const mysql = require("mysql"); //connects to database
const nodemon = require("nodemon"); //keeps server refreshing
const { throwError } = require("rxjs");
const questions = require("./assets/questions");

./assets/images/demoPic.png

const connection = mysql.createConnection({
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

function readAllData() {
  connection.query(
    `
  SELECT empl_id as id, empl_first_name as first_name, empl_last_name as last_name, 
  role_title as title, dep_name as department, role_salary as salary, manager_id as manager FROM cms.employee_role 
  LEFT JOIN cms.employee ON employee_role.id=employee.role_id 
  LEFT JOIN cms.department ON department.id=employee_role.department_id 
  WHERE empl_first_name IS NOT NULL;
  `,
    function (err, result) {
      console.table(result);
      options();
    }
  );
}

function options() {
  inquirer.prompt(questions.options).then(function (answer) {
    switch (answer.userAction) {
      case "View employees by department":
        viewByDepartments();
        break;
      case "View employees by role":
        viewByRole();
        break;
      case "View Roles":
        viewRoles();
        break;
      case "View Departnments":
        viewDepartments();
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
      case "Update Employee Role":
        updateEmployeeRole();
        break;
      case "Delete Employee":
        deleteEmployee();
        break;
    }
  });
}

//View by deparments
function viewByDepartments() {
  connection.query(
    `SELECT empl_id as id, empl_first_name as first_name, empl_last_name as last_name, 
  role_title as title, dep_name as department, role_salary as salary, manager_id as manager FROM cms.employee_role 
  LEFT JOIN cms.employee ON employee_role.id=employee.role_id 
  LEFT JOIN cms.department ON department.id=employee_role.department_id 
  WHERE empl_first_name IS NOT NULL ORDER BY department ;`,
    function (err, result) {
      if (err) throw err;
      console.table(result);
      options();
    }
  );
}

//View employees by Role
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
      options();
    }
  );
}

//view Roles
function viewRoles() {
  connection.query(`SELECT * FROM cms.employee_role;`, function (err, result) {
    if (err) throw err;
    console.table(result);
    options();
  });
}

//Returns Roles
function viewDepartments() {
  connection.query(`SELECT * FROM cms.department;`, function (err, result) {
    if (err) console.log(error);
    console.table(result);
    options();
  });
}

function createEmployee() {
  inquirer.prompt(questions.createEmployeeQuestions).then(function (answer) {
    if ((answer.employeeManagerId = "undefined")) {
      answer.employeeManagerId = 0;
    }
    connection.query(
      "INSERT INTO `cms`.`employee` (`empl_first_name`, `empl_last_name`, `role_id`, `manager_id`) VALUES ('" +
        answer.employeeFirstName +
        "', '" +
        answer.employeeLastName +
        "', '" +
        answer.employeeRoleId +
        "','" +
        answer.employeeManagerId +
        "');",
      function (error, results) {
        if (error) throwError;
        viewByDepartments();
        options();
      }
    );
  });
}

//creates a new role
function createRole() {
  inquirer.prompt(questions.createRoleQuestions).then(function (answer) {
    connection.query(
      "INSERT INTO `cms`.`employee_role` (`role_title`, `role_salary`, `department_id`) VALUES ('" +
        answer.roleName +
        "', '" +
        answer.roleSalary +
        "', '" +
        answer.department +
        "');",
      function (error, results) {
        if (error) console.log(error);
        viewRoles();
        options();
      }
    );
  });
}

//creates a new Department
function createDepartment() {
  inquirer.prompt(questions.createDepartmentQuestions).then(function (answer) {
    connection.query(
      "INSERT INTO `cms`.`department` (`dep_name`) VALUES ('" +
        answer.departmentName +
        "');",
      function (error, results) {
        if (error) console.log(error);
        viewDepartments();
        options();
      }
    );
  });
}

//update Employee Role
function updateEmployeeRole() {
  connection.query(
    //pull a list of employees and their id's for user reference
    `SELECT empl_id as id, empl_first_name as first_name, empl_last_name as last_name, 
  role_title as title, dep_name as department, role_salary as salary, manager_id as manager FROM cms.employee_role 
  LEFT JOIN cms.employee ON employee_role.id=employee.role_id 
  LEFT JOIN cms.department ON department.id=employee_role.department_id 
  WHERE empl_first_name IS NOT NULL ORDER BY title ;`,
    function (error, results, feilds) {
      console.table(results);
      //then call  inquirer to ask user to choose which id to terminate an employee
      inquirer.prompt(questions.updateEmployeeRole).then(function (answer) {
        connection.query(
          //pull a list of employees and their id's for user reference
          "UPDATE `cms`.`employee` SET `role_id` = '" + answer.newEmployeeRole +  "' WHERE (`empl_id` = '"+ answer.updateEmployeeRole +"');",
          function (error, results, feilds) {
            if(error) console.log(error)
           viewByRole()
            options() 
    
      
      });
    }
  );
})}

//Delete Employee
function deleteEmployee() {
  connection.query(
    //pull a list of employees and their id's for user reference
    `SELECT empl_id AS id, empl_first_name, empl_last_name FROM cms.employee;`,
    function (error, results, feilds) {
      console.table(results);
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
        viewByDepartments();
        options();
      });
    }
  );
}
