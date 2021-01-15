const options = [
  {
    type: "list",
    name: "userAction",
    message: "What would you like to do?",
    choices: ["View employees by department", "View employees by role", "View Roles", "View Departnments", "Create New Department", "Create New Role", "Create New Employee", "Update Employee Role", "Delete Employee"],
  }
] 

const createEmployeeQuestions = [

    {
      type: "input",
      name: "employeeFirstName",
      message: "What is the new employee's first name?",
    },
    {
      type: "input",
      name: "employeeLastName",
      message: "What is the new employee's last name?",
    },
    {
      type: "input",
      name: "employeeRoleId",
      message: "What is the new employee's role ID?",
    },
    {
      type: "input",
      name: "employeeManagerId",
      message: "Enter Employee's Manager ID or leave blank",
    },
];

const terminateEmployee = {
  type: "input",
  name: "employeeNames",
  message: "Enter the Id of the employee you would like to terminate", 
}

const createRoleQuestions = [
  {
    type: "input",
    name: "roleName",
    message: "What is name of the new role?",
  },
  {
    type: "input",
    name: "roleSalary",
    message: "What is salary of the new role?",
  },
  {
    type: "input",
    name: "department",
    message: "What department does the new role belong to?",
  }
]

const createDepartmentQuestions = {
  type: "input",
  name: "departmentName",
  message: "What is the name of the new Department?", 
}

const updateEmployeeRole = [{
  type: "input",
  name: "updateEmployeeRole",
  message: "What is the id of the employee whose role you wish to update?", 
},
{
  type: "input",
  name: "newEmployeeRole",
  message: "What is the RoleId of the new role?", 
}]




//export used in app.js
module.exports.options = options
module.exports.createEmployeeQuestions = createEmployeeQuestions
module.exports.terminateEmployee = terminateEmployee
module.exports.createRoleQuestions = createRoleQuestions
module.exports.createDepartmentQuestions = createDepartmentQuestions
module.exports.updateEmployeeRole = updateEmployeeRole

