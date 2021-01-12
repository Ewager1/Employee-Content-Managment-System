const options = [
  {
    type: "list",
    name: "userAction",
    message: "What would you like to do?",
    choices: ["View employees by department", "View employees by role",  "Create New Department", "Create New Role", "Create New Employee"],
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

//export used in app.js
module.exports.options = options
module.exports.createEmployeeQuestions = createEmployeeQuestions