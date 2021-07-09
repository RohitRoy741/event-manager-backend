# Event Manager Backend
An express backend application made to provide to CRUD REST APIs to a React Event management app. This application is hosted in isolation on heroku from where it can be accessed to create, read and update the events. The database used is mongoDB provided by Mongo Atlas.

## Installation And Runninng on Local Machine
### Prerequisites
<ul>
  <li>Node v 12 or above</li>
  <li>Access and knowledge of CLI </li>
  <li>Postman</li>
</ul>

##### Note
Nodemon is added as dev dependency and included in scripts to ease the testing of application on a local machine. Please follow the below steps to run the application locally:
### Steps
<ol>
  <li> Clone the github repo locally using: <code> git clone https://github.com/RohitRoy741/minor.git</code> </li>
  <li> Navigate to the main folder directory, the event-manager-backend </li>
  <li> Run the command: 
    <code>
      npm install
    </code>
  </li>
  <li> Start the application by <code> npm run dev </code> </li>
  <li> Fire up the postman server and request to localhost:5000/events and choose the request to be GET,POST or PATCH according to need. Also add the body with POST and PATCH requests. </li>
</ol>

### End Points
GET https://salamander-event-manager.herokuapp.com/events (to fetch the events) <br/>
POST https://salamander-event-manager.herokuapp.com/events (to post the events) <br/>
PATCH  https://salamander-event-manager.herokuapp.com/events (to update events) <br/>

### FrontEnd
https://practical-goldwasser-e32b5f.netlify.app/

### Database
MongoDb Atlas Cloud
