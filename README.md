## What's this?

This is a quirky little full-stack app where users are asked to construct poems with 10 random words.

Features:
* post poems to a SQL database
* validates incoming poems (so that they only use allowed words)
* assigns random quirky styling to each poem, which is encoded and saved on the server in a custom format, so that they render the same way on every request

## Tech

* Node.js
* Express
* Pug as templating engine
* SQLite DB with Sequelize as driver

## Screenshots

![Screenshot of Post a Poem web app](https://raw.githubusercontent.com/qvistdev09/post-a-poem/main/screenshots/poemscreenshot1.png)