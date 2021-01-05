const inquirer = require("inquirer"); //allows use of inquirer npm adding question functionality
const mysql = require("mysql"); //connects to database
const nodemon = require("nodemon"); //keeps server refreshing
const questions = require("./Develop/questions");
// console.log(questions.options)

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
  startPrompt();
});

// start program

function startPrompt() {
  setTimeout(function () {
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
          createRole(
            answer.roleName,
            answer.roleSalary,
            answer.departmentNumber
          );
          break;
        // case "Create New Employee":
        //   createEmployee(
        //     answer.employeeFirstName,
        //     answer.employeeLastName,
        //     answer.employeeRoleId,
        //     answer.employeeManagerId
        //   );
        //   break;
      }
    });
  }, 500);
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
    function (err, result) {
      if (err) throw err;
      console.table(result);
      let test = result;
      return test;
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
      startPrompt();
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
      startPrompt();
    }
  );
}

function createDepartment(firstName, lastName, roleID, manager) {
  console.log(firstName, lastName, roleID, manager);
}
