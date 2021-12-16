# WebAppsProject

This project was created to mimic the functionalities of stack overflow. It is a platform where people can make posts, 
read them and comment on them. Unauthenticated (people who aren’t logged in) people cannot make posts or post comments 
but they can still view them. A person has to register before being able to sing in and make posts/comments. For this 
project I decided to use Node.js Express and React because they were the ones I was the most familiar with. For database
functions I decided to use MongoDB for the same reason as the aforementioned technologies. I decided to use 
react bootstrap because I had heard good things about it from a friend.

Installation 
------------

After importing the project it’s important to add .env file to the "back" folder. It’s should include 3 variables  

1. PORT (port I used, was 1234) 
2. NODE_ENV (I had it default to production) 
3. SECRET (string of random characters) 

To install the necessary dependencies npm install needs to be run. To start the client side you need to navigate to 
the "front" folder and run npm start. To start server side you need to navigate to "back" folder and run npm start.
If the .env file was added and the variables were set as above, the client should run on localhost:3000 and server
on localhost:1234.

User manual
-----------

To make an account open the home page and click on the register in the top middle. Enter email and password in to
the right fields and press register (password has to be at least 5 characters). You cannot create multiple accounts 
with just one email address. Your username will automatically be generated from your email by removing everything 
after the '@' character.

You have now been redirected to login page. In here you can use your newly created credentials to log in. 

After logging in you will be taken to the home page. Now that you have logged in it's possible for you to make posts. 
Only title and description are required, you don't have to enter a code snippet to be able to post. 

There's a "show more" button on each post by clicking it you're taken into a detailed view of the post. In this view 
you can also post comments. To get back to the home page you can click home in the top middle. 

To log out you can click on logout in top middle and you will be taken to logout page. By clicking the logout button 
you will no longer be able to post comments or posts but you can still view them.

List of features
----------------

Basic features: 25 points

Utilization of React: 5 points

Post/comment creation timestamps: 1 point

=31 points
