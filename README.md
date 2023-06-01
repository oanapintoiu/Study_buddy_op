# Bank_Tech_Test README

## Table of Contents

[1. Specifications](#1-specifications)  
[2. Observations](#2-observations)  
[3. User Story](#3-user-story)  
[4. Diagram](#4-diagram)  
[5. Methodology Implementaion](#5-methodology-implementation)  
[6. Tickets](#6-tickets)  
[7. Test Covarage](#7-test-covarage)  
[8. Screenshots: program tested in terminal](#8-screenshots-program-tested-in-terminal)  
[9. Instructions](#9-instructions)   

Technologies

Technologies
Here's an overview of the technologies used to build this template application. You don't need to do a deep dive on each one right now. Instead, try to get a feeling for the big picture and then dive into the details when a specific task pushes you in that direction.

M is for MongoDB
MongoDB is a NoSQL database program that stores data in collections of documents (in a format similar to JSON), rather than in tables. The application interacts with MongoDB using a tool called Mongoose.

E is for Express
Express is the Javascript equivalent of Sinatra. The structure of this application will feel quite different to what you're used to but the principles are the same.

R is for React
React is a hugely popular tool that is used to build engaging front ends. The basic principle is that the front end is split up into components, each of which could include some logic, template structure (HTML) and styling (CSS).

N is for Node
Java script was originally designed to run exclusively in browsers, such as Chrome. Node is a tool that allows you to run Javascript outside the browser and its invention made it possible to build full stack Javascript apps.

We also used...

Jest for unit testing on the back end
Cypress for end-to-end testing and component testing, on the front end
Mongoose to model objects in MongoDB.
Handlebars for the home template.
ESLint for linting.
Nodemon to reload the server automatically.
Architecture
This application is comprised of two distinct pieces.

A backend API built with Express
A front end built with React
The React front end sends HTTP requests to the backend API and receives JSON in response body, rather than a whole page of HTML.



## 1. Specifications


#### Requirements

* TEXT


## 2. Observations

*

## 3. User Story

```

#Authentication
1. As a user, I would like to: sign up - MVP - Started
2. As a user, I would like to: log in - MVP - Started
3. As a user, I would like to: log out - MVP - Started
4. As a user, I would like to: have a username that's unique - MVP
  
#User Profile
4. As a user, I would like to: view and edit my profile page - MVP - Use Moangoose code
5. As a user, I would like to: have my personal details on my profile - MVP - Use Moangoose code base for this
6. As a user, I would like to: list all study groups I'm a part of - MVP
7. As a user, I would like to: list all my skill levels (proficiency) - MVP
8. As a user, I would like to: list all my study interests - MVP
  
#View
9. As a user, I would like to: like to see other peoples profiles with limited personal details (GDPR) - MVP
10. As a user, I would like to: see my study group page

#Add study buddies
11. As a user, I would like to: add study buddies to my study buddy list - MVP (to invite they need to be on list)

#Search
12. As a user, I would like to: filter study categories using a search bar (predefined) - MVP
 
#Create or join
13. As a user, I would like to: create or join private groups - MVP
14. As a user, I would like to: invite other users to a group - MVP
15. As a user, I would like to: accept or decline invitations - MVP
16. As a user, I would like to: give my group a custom name - MVP

#AI integration
17. As a user, I would like to: ask a ai bot questions in my group that everyone can see the answers to - MVP

#Post
18. As a user, I would like to: post threads in a group - MVP
19. As a user, I would like to: respond to posts - MVP

#Nice to have features: 

1. As a user, I would like to: see my photo - Bonus
2. As a user, I would like to: message other users directly - Bonus
3. As a user, I would like to: search public groups by name - Bonus
4. As a user, I would like to: filter study groups by location on a map - Bonus (high priority)
5. As a user, I would like to: use the ai to summarise the day - bonus
6. As a user, I would like to: have an option to display if I'm open to face to face meetups - Bonus
7. As a user, I would like to: have a reminder for my meetups - Bonus
8. As a user, I would like to: set my status (custom text) - Bonus
9. As a user, I would like to: set my status (green/red/amber) - Bonus
10. As a user, I would like to: see all the group notes organised in the study group page - Bonus
11. As a user, I would like to: add and see study links on my study group page - Bonus
12. As a user, I would like to: see rules of the group - Bonus
13. As a user, I would like to: like posts - Bonus
14. As a user, I would like to: set the limit for the number of people in my group - Bonus
15. As a user, I would like to: set other users as admins - Bonus
```

## 4. Diagram

**1. Diagram Version 1**
<img src="location/picure_name.png"
alt="Text in case picture does not display">

**2. Diagram Version 2**
<img src="location/picure_name_2.png"
alt="Text in case picture does not display 2">



## 5. Methodology Implementation

### Research

This is how you add a link: [test to link](link).


### Controller functionality

1. **User Controller**: 

* All about the `user controller`

2. **Example Controller**:

* 

3. **Example Controller**:

* 

### Testing

1. **User Controller Tests**:

* key notes:

* test (PASSED):
  * test


2. **Transaction Controller Tests**:

* key notes:
  * test

3. **Statement Controller Tests**:

* print

## 6. Tickets


## 7. Test Covarage

**1. Test coverage:**

**1. Screenshot 1**
<img src="location/picure_name.png"
alt="Text in case picture does not display">

**2. Screenshot 2**
<img src="location/picure_name_2.png"
alt="Text in case picture does not display 2">

**4. ESlint - all errors fixed and cleared:** 

Note: in two situations `this` was used to call upon a method ([see here for more details](https://www.w3schools.com/js/js_function_call.asp)) and ESlint gave an error. One was fixed by turning the method into const declaration and the other by using the keyword `static`and turned the (regurlar) method into a static method ([read more here on static methods](https://javascript.info/static-properties-methods)).

**1. Screenshot 1**
<img src="location/picure_name.png"
alt="Text in case picture does not display">

## 8. Screenshots: program tested in terminal

**1. Screenshot 1**
<img src="location/picure_name.png"
alt="Text in case picture does not display">

**10. Finished product:**

<img src="location/picure_name.png"
alt="Text in case picture does not display">

## 9. Instructions

### Running JavaScript

#### Introduction

This program uses Javascript, a dynamic computer programming language and one of the core technologies for developing web page content, alongside HTML and CSS.

For this exercise to be run, a program called Node.js will have to be installed. Node.js is a JavaScript runtime, i.e. it reads JavaScript code and executes it as a programs

<ins> Step 1: Clone this repo to your machine:

```
# Create a folder/directory where you would like to store the cloned repo: 
$ mkdir cloned-repo

# Then switch to the newly created directory:
$ cd cloned-repo

# Inside the new fodler clone the repo, command which will copy all the existing files from the Git repository:
$ git clone link-to-git-repository

```

<ins> Step 2: Install nvm

Nvm stands for Node Version Manager, a tool that allows you to install and swtich in between different versions of Node.
NVM is distributed using github - you can find installation instructions for the latest version [here](https://github.com/nvm-sh/nvm#installing-and-updating).

```
# You'll need to run a command that looks like this:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Once that step is complete, reload your ~/.zshrc file:
source ~/.zshrc

# Now you can install Node by running: 
$ nvm install node
```

<ins> Step 3: Setting up the project

```
# When NVM is installed, once can automatically install and use the latest, stable version. You can set up the enviroment by running: 
$ nvm use node

#The next step would be to set up the folder structure, however this is not required as this has been already done. 

# Initialize NPM project, i.e. create the package.json file: 
$ npm init -y

# Add the jest package to run tests in the tests directory:
$ npm add jest

```

<ins> Step 4: Running tests:

```
# Please check that all tests are running in the test directory before running the program in REPL: 
$ npx jest

# alternatively try:
$ jest


# To see test coverage then run: 
$ npx jest --coverage

# alternatively try:
$ test
```

<ins> Step 5: Running the program:

__OPTIONN 1__ 

```

```


<!-- BEGIN GENERATED SECTION DO NOT EDIT -->

---

**How was this resource?**  
[😫](https://airtable.com/shrUJ3t7KLMqVRFKR?prefill_Repository=makersacademy/course&prefill_File=individual_challenges/bank_tech_test.md&prefill_Sentiment=😫) [😕](https://airtable.com/shrUJ3t7KLMqVRFKR?prefill_Repository=makersacademy/course&prefill_File=individual_challenges/bank_tech_test.md&prefill_Sentiment=😕) [😐](https://airtable.com/shrUJ3t7KLMqVRFKR?prefill_Repository=makersacademy/course&prefill_File=individual_challenges/bank_tech_test.md&prefill_Sentiment=😐) [🙂](https://airtable.com/shrUJ3t7KLMqVRFKR?prefill_Repository=makersacademy/course&prefill_File=individual_challenges/bank_tech_test.md&prefill_Sentiment=🙂) [😀](https://airtable.com/shrUJ3t7KLMqVRFKR?prefill_Repository=makersacademy/course&prefill_File=individual_challenges/bank_tech_test.md&prefill_Sentiment=😀)  
Click an emoji to tell us.

<!-- END GENERATED SECTION DO NOT EDIT -->