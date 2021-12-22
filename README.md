# mealFinalProject-server
<div style="margin-bottom: 1%; padding-bottom: 2%;">
	<img align="right" width="100px" src="https://mealproject-client.herokuapp.com/static/media/EAT%20HOME_Logo%20blanco.089bb84e.png">
</div>

Dx29 PhenSimilarity
==============================================================================================================================================

[![Build Status](https://f29.visualstudio.com/Dx29%20v2/_apis/build/status/DEV-MICROSERVICES/Dx29.PhenSimilarity?branchName=develop)](https://f29.visualstudio.com/Dx29%20v2/_build/latest?definitionId=112&branchName=develop)

### **Overview**

This project is used to obtain the differential diagnosis at the phenotypic level between a patient’s symptoms and those of a disease.

It is used in the [Dx29 application](https://dx29.ai/) and therefore how to integrate it is described in the [Dx29 architecture guide](https://dx29-v2.readthedocs.io/en/latest/index.html).


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
>- manifests folder: with the YAML configuration files for deploy in Azure Container Registry and Azure Kubernetes Service.
>- pipeline sample YAML file. For automatizate the tasks of build and deploy on Azure.

<p>&nbsp;</p>
