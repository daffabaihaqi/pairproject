/*
    npx sequelize-cli model:generate --name User --attributes email:string,password:string,role:string

    npx sequelize-cli model:generate --name Category --attributes name:string

    npx sequelize-cli model:generate --name Court --attributes name:string,location:string,imageURL:string,description:text,price:integer,CategoryId:integer

    npx sequelize-cli model:generate --name Schedule --attributes CourtId:integer,UserId:integer,date:date,session:string,price:integer

    npx sequelize-cli model:generate --name UserProfile --attributes firstName:string,lastName:string,dateOfBirth:date,UserId:integer

    npx sequelize-cli migration:generate --name add-address-column-userprofile
*/

"use strict"

const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/routes.js');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

