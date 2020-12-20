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
  ];

  //export used in app.js
  module.exports = (questions)