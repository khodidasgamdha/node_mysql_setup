# NodeJs Project Setup with MySQL DB (Sequelize ORM)

```bash
$ npm install
```

```bash
$ npm start
```
Open [Localhost](http:localhost:3000)

Folder Structure will looks like 
> * api
> * config
> * core
> * cron
> * db
> * functions
> * middleware
> * src
> * uploads
> * .env
> * .gitignore
> * .sequelizerc
> * package.json


## Folder info

### API :
- The api folder contains many different folders.
- each folder contains `controller` folder, `middleware` folder, `services` folder and `routes.josn` file.
- `controller` folder, `middleware` folder and `services` folder contains different files.
- `routes.json` file contains endpoint information

### Config :
- Config folder contains `database.json`, `config.json` and `multer.js` file
- `database.json` file contains information about the database.
- `config.josn` file conatains information for the configuration of morgan and logging
- `multer.js` file contains configuration about image upload

### Core :
- Core folder contains many files,
    - connection.js
    - cron.js
    - ErrorHandler.js
    - function.js
    - migration.js
    - routes.js
    - services.js

### Cron :
- cron folder contains cron files.

 ### DB :
 - db folder contains three folder `migrations`,`models` and `seeders`.
 - `migration` folder contains the migration file that talk to our mysql database.
 - `models` folder contains model file.

 ### Function :
 - function folder contains many folder and function files inside it.

 ### Middleware :
 - middleware folder contains the `global middlewares` files.

 ## Src :
- src folder contains `app.js` file.

 ### Uploads :
 - uploads folder will contains the `uploaded files` of the user.

 ### .sequelizerc :
 - sequelizerc file esatblishes the `connection between db folder and database.json` file.
