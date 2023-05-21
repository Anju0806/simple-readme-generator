//returns a license badge based on which license is selected
function renderLicenseBadge(data) {
  let badge = '';
  if (data.license && data.license != 'No license') {
    switch (data.license) {
      case 'MIT':
        badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]';
        break;
      case 'Apache 2.0':
        badge = '[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)]';
        break;
      case 'GPLv3':
        badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)]';
        break;
      case 'ISC':
        badge = '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)]';
        break;
      default:
        badge = '';
        break;
    }
  }
  return badge;
}

//function to add a license section
function renderLicenseSection(data) {
  if (data.license && data.license != 'No license') {
    const licenseText = `
  ## License
    This project is licensed under the ${data.license} license.
    https://opensource.org/licenses/${data.license}`;
    return licenseText;
  }
  return '';
}

//function to add installation steps
function generateSteps(data) {
  let step = '';
  if (data.steps && data.steps.length > 0) {
    step += `
  ## Installation\n`;
    data.steps.forEach((s, index) => {
      step += `    ${index + 1}. ${s}\n`;
    });
  }
  return step;
}

//function to add screen shots
function generateScreenShots(data) {
  let sshots = '';
  if (data.screenshotsPath && data.screenshotsPath.length > 0) {
    sshots += `
  ## Usage\n`;
    data.screenshotsPath.forEach((path, index) => {
      sshots += `    ![ScreenShot${index + 1}](${path})\n`;
    });
  }
  return sshots;
}

//function to add collaborators
function generateCollaborators(data) {
  let collabs = '';
  if (data.collaborators && data.collaborators.length > 0) {
    collabs += `
  ## Credits\n`;
    data.collaborators.forEach((c, index) => {
      collabs += `    - ${c}\n`;
    });
  }
  return collabs;
}

//function to add test to project
function generateTests(data) {
  let test = '';
  if (data.tests && data.tests.length > 0) {
    test += `
  ## Tests\n`;
    data.tests.forEach((t, index) => {
      test += `    ${index + 1}. ${t}\n`;
    });
  }
  return test;
}

//function to add contribution guidelines
function generatecontribute(data) {
  let c = '';
  if (data.contribute && data.contribute.length > 0) {
    c += `
  ## Contribution Guidelines
     ${data.contribute}\n`;
  }
  return c;
}

//function to add contact section
function genarateUsername(data) {
  let quest = '';
  if (data.username && data.username.length > 0 && data.email && data.email.length > 0) {
    quest += `\n
  ## Questions
     GitHub Profile: https://github.com/${data.username}
     Email: ${data.email}\n`;
  }
  return quest;
}

//function to add table of contents
function generatetoc(data) {
  let toc = '';
  toc += `
  ## Table of Contents\n`;

  if(data.hasSteps){
    toc += `   - [Installation](#installation)\n`;
  }
  if(data.addPath){
    toc += `   - [Usage](#usage)\n`;
  }
  if(data.hasCollaborators){
    toc += `   - [Credits](#credits)\n`;
  }
  if(data.addcontribute){
    toc += `   - [Contribution Guidelines](#contribution guidelines)\n`;
  }
  if(data.addTests){
    toc += `   - [Tests](#tests)\n`;
  }
  
  if(data.license != 'No license'){
    toc += `   - [License](#license)\n`;
  }
  toc += `   - [Questions](#questions)\n`;
  return toc;
}

//function to generate markdown for README
function generateMarkdown(data) {
  badge = renderLicenseBadge(data);
  let markdown = `
  ${badge}\n
  # ${data.title}
    
  
  ## Description
    - ${data.motivation}
    - ${data.projectReason}
    - ${data.problemSolved}
`;
  if (data.toc) {
    toc = generatetoc(data);
    markdown += toc;
  }

  let stps = generateSteps(data);
  markdown += stps;

  let ss = generateScreenShots(data);
  markdown += ss;

  let collabs = generateCollaborators(data);
  markdown += collabs;

  let contribute = generatecontribute(data);
  markdown += contribute;

  let tests = generateTests(data);
  markdown += tests;

  let license = renderLicenseSection(data);
  markdown += license;

  let username = genarateUsername(data);
  markdown += username;

  return markdown;
}

module.exports = generateMarkdown;

