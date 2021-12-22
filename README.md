<div style="margin-bottom: 1%; padding-bottom: 2%;">
	<img align="right" width="100px" src="https://mealproject-client.herokuapp.com/static/media/EAT%20HOME_Logo%20blanco.089bb84e.png">
</div>

EatAtHome Server
==============================================================================================================================================


### **Overview**



It is used in the [EatAtHome application](https://mealproject-client.herokuapp.com/).


It is programmed in NodeJS, and the structure of the project is as follows:

>- src folder which contains the source code of the project.  
>>- The controllers folder contains the functionality to work with the methods.
>>- In the routes folder, all the routes of the API appear. It contains the file index.js that links with the controllers, defining the requests that will be available to the external clients.
>>- In the services folder the functionality of the methods is implemented.
>>- Some files:
>>>- index.js: file where the app.js is loaded. It establish the port for connections and listens to requests.
>>>- Config.js: configuration file. It contains the keys and values that can be public.
>>>- App.js: the crossdomain is established.
>- .gitignore file
>- README.md file

<p>&nbsp;</p>
