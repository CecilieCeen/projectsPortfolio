# webudvikler 2 semester projekt 3
 
 ## setup api
run
```
npm install
```
in bruger api folder
then import <code>userPic.json</code> to mongodb
make sure mongodb and mongoimport is installed then run in data folder
```
mongoimport --jsonArray --db gameusers --collection profilepics --file userpic.json
```
start server with
```
npm start
```
## Project setup 
make sure that the localhost for game site is ´the corcect for the redirects in the api

then run the project as a serever