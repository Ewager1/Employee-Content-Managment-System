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
      type: "list",
      name: "hasManager",
      message: "Does this Employee have a manager?",
      choices: ["Yes", "No"],
    },
    {
      type: "input",
      name: "employeeManagerId",
      message: "Enter Employee's Manager ID or leave blank",
      when: (answer) =>
        answer.hasManager === "Yes",
    },
];

//export used in app.js
module.exports.options = options
module.exports.createEmployeeQuestions = createEmployeeQuestions