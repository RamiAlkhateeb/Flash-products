# Node.js Express, Sequelize & PostgreSQL: CRUD Rest APIs

You are asked to develop a system for flash product card listings. Flash
listings are products that show up for a certain amount of time. Each
product card entry is set to show up at a certain time and for a limited
duration.
There will be a global list of products, and whenever the API is called, it will
return the products that are supposed to show up at the current time.
Products have the following properties: a name that can be arabic or
english, a creation date, a start date, a duration, a price and finally a list of
custom fields. Custom fields have a title and a list of key values. For
example: there could be a product with the name “Car”, it can have a
custom field such as “Engine specs” which is a list of key-values that
represent the car specs (engine size, engine type). Another example is you
can have a product “House” with a custom field called “House Fields” and
this field has a list of key values such as “Type” => “Apartment”, “Rooms”=> 5
etc
Products are also categorized under categories. Categories are created as
a seed to the db and will not be added using the API.
Only authenticated users can add or delete a product card, deleting a
card deletes all its associated custom fields. Authentication is done using
JWT in the header. User accounts can be seeded to the db as well and not
managed in the system.
You can decide the best way to let the backend know which language you
want the data to be in, the returned data will be in that selected language.
You must take in mind topics like security and proper error handling. Also,
consider including a postman collection for your API as part of your
submission.
Technology
You must use an SQL db behind an ORM of your choice. We prefer
postgres and sequelize.
You must submit your work as a git repo, docker must be used for all
project dependencies.
APIs:
POST auth/login
POST /products
GET /products
GET /products/:productId
PUT /products/:productId
DELETE /products/:poductId
GET /categories
GET /categories/:categoryId/products
DELETE /categories/:categoryId

## Project setup
```
npm install
```

### Run
```
sequelize db:seed:all
node server.js
```
