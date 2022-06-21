# The Opinion

A full-stack web application for readers who want to rate and review articles.

## Technologies Used

-	React
-	Postgresql
-	Express
-	argon2
-	JWT
-	JavaScript
-	CSS
-	HTML
-	GNews-API

## Live Demo

The Opinion was my first solo full-stack project. The idea came from a common issue many have of differentiating between articles selling you an opinion or telling you the facts of a story. I wanted to create a site that took articles from all around the world and allow users to determine this for themselves.
Try the application live at https://the-opinion.herokuapp.com/

## Features

- Users can see daily headlines on the home page
- Users can view individual article info as well as a link to read the full article
- Users can view the reviews and ratings given by other users
- Users can sign up and sign into website
- Users can rate and review articles they read
- Users can view their list of reviews and corresponding articles
- Users can search for articles based on keywords, language, and country.

## Preview

 ![theOpinionPreview](https://user-images.githubusercontent.com/99702540/174905534-2d5ae3da-1c42-4066-90bd-424cee452123.gif)


## Stretch Features

- Users can see the percentages of user ratings
- Users can like and dislike comments
- Users can bookmark articles
- Users can edit their reviews
- Users can delete their reviews

### Getting Started

*	Copy the .env.example file by using the command: cp .env.example .env
*	Install all dependencies using the command: npm i
*	Set up a database using Postgresql
*	3rd party account set-up:
  * Create a GNews API account (https://gnews.io/)
  * Create a Heroku account
  * Set your environment variables on Heroku and .env file
    * DATABASE_URL
    * API_KEY

!!WARNING Do NOT add these to your .env file. Only add to Heroku!!
    * TOKEN_SECRET (use a dummy token in .env for now)

