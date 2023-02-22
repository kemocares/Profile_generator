const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const prompt = inquirer.createPromptModule();
//  getting user questions
const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "Enter the Manager's name: ",
  },
  {
    type: "input",
    name: "id",
    message: "Enter the Manager's employee ID: ",
  },
  {
    type: "input",
    name: "email",
    message: "Enter the Manager's email address: ",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "Enter the Manager's office number: ",
  },
];

const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "Enter the Engineer's name: ",
  },
  {
    type: "input",
    name: "id",
    message: "Enter the Engineer's employee ID: ",
  },
  {
    type: "input",
    name: "email",
    message: "Enter the Engineer's email address: ",
  },
  {
    type: "input",
    name: "github",
    message: "Enter the Engineer's Github username: ",
  },
];

const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "Enter the Intern's name: ",
  },
  {
    type: "input",
    name: "id",
    message: "Enter the Intern's employee ID: ",
  },
  {
    type: "input",
    name: "email",
    message: "Enter the Intern's email address: ",
  },
  {
    type: "input",
    name: "school",
    message: "Enter the Intern's school: ",
  },
];

const mainMenuQuestions = [
  {
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: ["Add an Engineer", "Add an Intern", "Finish building the team"],
  },
];

const employees = [];

prompt(managerQuestions)
  .then((answers) => {
    const { name, id, email, officeNumber } = answers;
    manager = new Manager(name, id, email, officeNumber);
    employees.push(manager);
  })
  .then(() => promptMainMenu(employees))
  .then(() => render(employees))
  .then((html) => {
    fs.writeFileSync(outputPath, html);
  });

function promptMainMenu(employees) {
  return prompt(mainMenuQuestions)
    .then((answers) => {
      const { choice } = answers;
      if (choice === "Add an Engineer") {
        return prompt(engineerQuestions).then((answers) => {
          const { name, id, email, github } = answers;
          employees.push(new Engineer(name, id, email, github));
          return false;
        });
      } else if (choice === "Add an Intern") {
        return prompt(internQuestions).then((answers) => {
          const { name, id, email, school } = answers;
          employees.push(new Intern(name, id, email, school));
          return false;
        });
      } else {
        return true;
      }
    })
    .then((isDone) => {
      if (!isDone) {
        return promptMainMenu(employees);
      }
      return;
    });
}
