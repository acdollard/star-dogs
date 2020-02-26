# Star-Dogs
an application to get a personalized horoscope for your favorite furry friend.


## About
This app is a simple yet fun way to create a dog, and then view a new daily horoscope for that dog. Dogs can be added and removed (future version will include the possibility to edit), and users can safely log in and out via an authentication process. When a user logs in, all their dogs, and only their dogs will automatically be displayed on the home screen, along with information about their sign and buttons to view horoscope and delete the dog. Each time a user deletes or creates a dog, the page is refreshed and the current list of user's dogs is re-rendered. 

<img width="1210" alt="Screen Shot 2020-02-25 at 6 55 13 PM" src="https://user-images.githubusercontent.com/55324845/75301492-8ef6ba80-5800-11ea-81ce-dd077951cf64.png">

## Coding 
### Front-End
This app uses CSS frameworks Tailwind and Bootstrap for styling, and the templating enging Handlebars to render the dog's horoscope. 
### Back-End
This app uses a Node and Express server and various HTTP requests to manage a MySQL database called star_dogs. Sequelize ORM is used to create models and run queries for the user and the dogs.

<img width="819" alt="Screen Shot 2020-02-22 at 2 53 15 AM" src="https://user-images.githubusercontent.com/55324845/75301598-d9783700-5800-11ea-92df-bfbc45613276.png">

## Installation

To view the app hosted on Heroku: https://sleepy-retreat-96731.herokuapp.com/


To run this app locally, follow these instructions: 
    1. Clone or fork the repository https://github.com/acdollard/star-dogs on to your local machine

    2. Open a MySQL workbench window and run the content of schema.sql and seed.sql, respectively. (Both found in the app/db file)

    3. Open the server.js file in terminal and run 'npm install'

    4. Open the config.json file (located in the config folder) and enter your MySQL username and password

    5. Open the api-routes.js file (located in the routes folder) and enter your MySQL username and password on lines 25 and 27 respectively

    6. Return to your node terminal and run 'node server.js' to star the server listening
    
    7. Have fun!
