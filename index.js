
// Packages for this application
let inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

//Questions for user input
const questions = [

  {
    type: 'input',
    message: 'What is your project title?',
    name: 'title',
    validate: function (value) {
      if (value.length == 0) {
        return 'Please enter a valid input.';
      }
      return true;
    }
  },
  {
    type: 'input',
    message: 'What is your motivation?',
    name: 'motivation',
    validate: function (value) {
      if (value.length == 0) {
        return 'Please enter a valid input.';
      }
      return true;
    }
  },

  {
    type: 'input',
    message: 'Why did you build this project?',
    name: 'projectReason',
    validate: function (value) {
      if (value.length == 0) {
        return 'Please enter a valid input.';
      }
      return true;
    }
  },
  {
    type: 'input',
    message: 'What problem did it solve?',
    name: 'problemSolved',
    validate: function (value) {
      if (value.length == 0) {
        return 'Please enter a valid input.';
      }
      return true;
    }
  },

  {
    type: 'confirm',
    message: 'Would you like to include a table of contents in your readme file?',
    name: 'toc',
  },
  {
    type: 'confirm',
    message: 'Do you want to add installation steps to your project?',
    name: 'hasSteps',
  },

  {
    type: 'input',
    message: 'What are the steps required to install your project (comma-separated)?',
    name: 'steps',
    when: (answers) => answers.hasSteps,
    validate: function (value) {
      if (value.length == 0) {
        return 'Please enter a valid input.';
      }
      return true;
    },
    filter: function (value) {
      if (!value) {
        return []; 
      }
      return value.split(',').map((step) => step.trim());
    }
  },
  {
    type: 'confirm',
    message: 'Do you want to add screenshots to your project?',
    name: 'addPath',
  },
  {
    type: 'input',
    message: 'Enter the paths to your screenshots (comma-separated):',
    name: 'screenshotsPath',
    when: (answers) => answers.addPath,
    validate: function (value) {
      if (value.length == 0) {
        return 'Please enter a valid path.';
      }
      return true;
    },
    filter: function (value) {
      if (!value) {
        return []; 
      }
      return value.split(',').map((paths) => paths.trim());
    }
  },
  {
    type: 'confirm',
    message: 'Do you have any collaborators in your project?',
    name: 'hasCollaborators',

  },
  {
    type: 'input',
    message: 'List your collaborators (comma-separated):',
    name: 'collaborators',
    when: (answers) => answers.hasCollaborators, //if there are collaborators
    validate: function (value) {
      if (value.length == 0) {
        return 'Please enter a valid input.';
      }
      return true;
    },
    filter: function (value) {
      if (!value) {
        return []; 
      }
      return value.split(',').map((collaborators) => collaborators.trim());
    }
  },

  {
    type: 'confirm',
    message: 'Would you like other developers to contribute to your project?',
    name: 'addcontribute',
  },
  {
    type: 'input',
    message: 'Add contribution guidelines to your project?',
    name: 'contribute',
    when: (answers) => answers.addcontribute,
    validate: function (value) {
      if (value.length == 0) {
        return 'Please enter a valid input.';
      }
      return true;
    },
    filter: function (value) {
      if (!value) {
        return [];
      }
      return value.split(',').map((tests) => tests.trim());
    }
  },
  {
    type: 'confirm',
    message: 'Would you like to add tests to your project?',
    name: 'addTests',
  },
  {
    type: 'input',
    message: 'Add tests to your project (comma-separated):',
    name: 'tests',
    when: (answers) => answers.addTests,
    validate: function (value) {
      if (value.length == 0) {
        return 'Please enter a valid input.';
      }
      return true;
    },
    filter: function (value) {
      if (!value) {
        return [];
      }
      return value.split(',').map((tests) => tests.trim());
    }
  },

  {
    type: 'input',
    message: 'Enter your GitHub Username',
    name: 'username',
    validate: function (value) {
      if (value.length == 0) {
        return 'Please enter a valid username.';
      }
      return true;
    },
  },
  {
    type: 'input',
    message: 'Enter your emailId',
    name: 'email',

    validate: function (value) {
      if (value.length == 0) {
        return 'Please enter a valid emailId: ';
      }
      return true;
    },
  },

  {
    type: 'list',
    message: 'Add license to your project?',
    name: 'license',
    choices: ['MIT', 'Apache 2.0', 'GPLv3', 'ISC', 'No license'],

    validate: function (value) {
      if (value.length == 0) {
        return 'Please enter a valid username.';
      }
      return true;
    }
  },
];

//function to write README file
function writeToFile(data) {
  fs.writeFile('readme.md', data,
    (err) => err ? console.error(err) : console.log('Successfully created the Readme file!!')
  );
}

//function to initialize app
function init() {
  console.clear();
  console.log('Welcome to the Readme Generator Application!');
  console.log('A high-quality README file explains what your application does and why you used the technologies that you did!!');
  console.log('Lets get started with creating a professional README file..');
  // Prompt the questions to the user
  inquirer.prompt(questions)
    .then((answers) => {
      generatedans = generateMarkdown(answers)
      console.log(answers);
      writeToFile(generatedans);

    })
    .catch((error) => {
      console.log('An error occurred:', error);
    });
}
init();