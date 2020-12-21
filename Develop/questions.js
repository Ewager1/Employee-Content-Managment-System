// Inquirer Questions 

const questions = [
    {
      type: "list",
      name: "userAction",
      message: "What would you like to do?",
      choices: ["View a department", "View a role", "View an Employee", "Create New Department", "Create New Role", "Create New Employee"],
    },
    {
      type: "input",
      name: "departmentName",
      message: "What is the name of the new department?",
      when: (answer) =>
        answer.userAction === "Create New Department",
    },
    {
        type: "input",
        name: "roleName",
        message: "What is the name of the new Role?",
        when: (answer) =>
          answer.userAction === "Create New Role",
      },
    {
        type: "input",
        name: "departmentNumber",
        message: "What Department Number is the new Role?",
        when: (answer) =>
          answer.userAction === "Create New Role",
      },
      {
        type: "input",
        name: "roleSalary",
        message: `What is the salary of the new Role?`,
        when: (answer) =>
          answer.userAction === "Create New Role",
      },
      {
        type: "input",
        name: "employeeFirstName",
        message: "What is the new employee's first name?",
        when: (answer) =>
          answer.userAction === "Create New Employee",
      },
      {
        type: "input",
        name: "employeeLastName",
        message: "What is the new employee's last name?",
        when: (answer) =>
          answer.userAction === "Create New Employee",
      },
      {
        type: "input",
        name: "employeeRoleId",
        message: "What is the new employee's role ID?",
        when: (answer) =>
          answer.userAction === "Create New Employee",
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
  module.exports = (questions)