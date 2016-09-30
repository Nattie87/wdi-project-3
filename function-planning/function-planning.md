#Global stuff

##Index.html
- Build nav bar - should contain clickable logo which is the home button and display current user or login/register buttons
- link to angular app
- link to angular ctrl
- link ui angular functionality
- link css
- link app.js

##src/js/app.js
- require angular modules ui.router, ngResource, angular-jwt.

##db/seeds.js
- Populate db with users

------------

#Functionality for individual features

##Landing page - (this would also be the logged out state)

###F/E

**controllers/main.js**
- logged out state

**config/router.js**
- home state

**Views/home.html**
Build home HTML to include:
- Image
- Short description
- Logo

###B/E

-

##Register/login pages

###F/E

**HTML**
- Create register form page in views
- Create login page in views
- Link to register/login page in index.html

**Services**
- build token functionality in token.js
- build functionality in current-user.js -

**factories**
- build user factory in urser.js
- build authentication-interceptor.js


**controllers**
- register.js
- login.js

**configs**
- router.js - add register and login states
- interceptor.js - sends the interceptor with the http request


###B/E

**index.js**
- JWT error handler
- Middleware for JWT

**models/user.js**
- user schema,  virtuals and validation functionality

**controllers/authentications.js**
- login and register functions

**config/routes.js**
- require authentications controllers
- create routes for register and login

**config/config.js**
- add authentication db
- add secret process.env

##User index (this is what shows after logged in or registered)

*Unknowns:
- Ask Rane/Alex about the best way to display users one at a time
- Swipe functionality
- Discarded users array - to go in back end user model?
- Take discarded users' discard array out when they change their profile details*

###F/E

**views/user/index.html**
- Write the modal - work out how to get the modal to show on page load.
- build HTML to display users - use ng-repeat to get all users - put users in ul/li's - display only one user at any one time.
- Link to angular controller
- Add input which will bring up the contact form.
- Create a modal as the contact form - the send button on the contact form needs to append the inputted text to the 'offers model'.

**controllers/users/index.js**
- building the users index controller- sends ajax request to get data.users and save as a variable

**constatnts/api.js**
- require api as a constatant

**config/router.j**
- add user index state

###B/E
*models/user.js will have been created for authentication and will be be required for this page.*


**controllers/users.js**
- writing the users RESTful routes functions.

**config/routes.js**
-require the user controller and add in the users routes



##User profile page (not public)

###F/E
**view/users/show.html**
- Edit profile button
- A nav bar which will appear as two tabs at the top of the page - one tab for the current user profile and one to show the the messages that the current user has had with other users.
- use cards in bootstrap to display in current user profile:
  - user name
  - blurb
  - what the user wants to learn
  - comments relating to that user - this will get the data from offers model.

**constollers/users/show.js**
- build functionality to show the current user

**configs/router.js**
- add a state for uses show (use 'users/:id') - look at lightsaber example

###B/E
*all done in the RESTful routes*

##Edit profile page
F/E
**views/uses/edit.html**
- Would display register form
- Delete profile button

**controllers/users/edit.js**
- Edit controller

**controllers/users/delete.js**
- Remove controller

**configs/router.js**
- User update state (for editing your profile)
- User delete state

###B/E
*RESTful routes already created*

##Messages Index
*
- which RESTful routes would we require for the messages?
- Ask about embedded databases
*

###F/E
**views/messages/index.html**
- create a list which displays all of the messages current user has sent and received - The initial view of the each list item would display the username of the user in question and an icon indicating if current user offered help or had help offered to them.
-  List item is clickable - when clicked a modal will display the messages.comments

**factories/message.js**
- build message factory

**controllers/messages/index.js**
- build the messages index

**configs/router.js**
- add states for messages index

###B/E
*db seeds must be run at this point.*
**models/message.js**
- create message schema

**consrollers/messages.js**
- create messgaes RESTful routes

**config/routes/js**
-create messages end points

##Messages show/edit

###F/E
*this is the form with a text field which is shown in a modal when a message li is clicked on. It will be a show/hide element in the messages.html*

**controllers/messages/show.js**
- create the show controller

**controllers/messages/edit.js**
- create the edit controller

**controllers/messages/delete.js**
- create the delete controller

**configs/router.js**
- add states for show, edit and delete

###B/E
- already done in the index
