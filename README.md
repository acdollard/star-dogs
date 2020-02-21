# Star-Dogs
an application to get a personalized horoscope for your favorite furry friend.


## About
This app is a simple yet fun way to create a dog, and then view a new daily horoscope for that dog. Dogs can be added and removed (future version will include the possibility to edit), and users can safely log in and out via an authentication process. When a user logs in, all their dogs, and only their dogs will automatically be displayed on the home screen, along with information about their sign and buttons to view horoscope and delete the dog. Each time a user deletes or creates a dog, the page is refreshed and the current list of user's dogs is re-rendered. 

## Coding 
### Front-End
This app uses CSS frameworks Tailwind and Bootstrap for styling, and the templating enging Handlebars to render the dog's horoscope. 
### Back-End
This app uses a Node and Express server and various HTTP requests to manage a MySQL database called star_dogs. Sequelize ORM is used to create models and run queries for the user and the dogs.

## Installation
