# shared-server-match

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone https://github.com/juanmanuelromeraferrio/shared-server-match.git # or clone your own fork
$ cd shared-server-match
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).


## Provision Postgres Database

 Create local database

- Install [Postgres](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup) 
- Configure the config.js 
    - postgres://<username>:<password>@localhost:5432/postgres
	
  Create tables in database

```sh
$ cd server/database
$ node CreateUserTable.js
$ node CreateInterestTable.js
```

Create database in Heroku

```sh
$ heroku addons:create heroku-postgresql:hobby-dev
```
Create tables in heroku database

```sh
$ heroku pg:psql
$ create table interest(id serial primary key, category text, value text);
$ create table user(id serial primary key, data jsonb, insert_time timestamp, update_time timestamp);
```

## Deploying to Heroku

```
$ heroku create shared-server-match
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)


## Running Tests

```
$ npm test
```