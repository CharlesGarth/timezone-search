## Timezone Search

A simple MySQL, Node and React stack to search for timezones from an XML file loaded into a DB.
The results of the timezone search are displayed alongside a constantly updating timestamp (HH:MM:SS) adjusted for each timezone.

### Using docker:

1. run `docker-compose up -d` to start MySQL DB, API and UI
2. go to `http://localhost:3001` to access the UI
3. call the api directly like so: `http://localhost:3000/timezones?search=Island`

### Using run-everything.sh Script

1. run `./run-everything.sh` to start API and UI outside of docker and using MySQL docker container
2. go to `http://localhost:3001` to access the UI
3. call the api directly like so: `http://localhost:3000/timezones?search=Island`

### Manual setup:

1. run `docker-compose -f db-stack.yml up -d` to start only MySQL and Adminer
   note: you may need to wait a moment for the DB container to finish initialising (30 seconds to 1 min)
         while I haven't had an issue with this it may be a race condition on faster machines (or not)
         You can check the container is initialised in the docker dashboard.
         look for: `X Plugin ready for connections` in the univers-labs_db_1.
         In the meantime you can proceed with steps 2 and 3!
2. run `cd timezone-search-api`
3. run `npm install`
4. run `nohup npm start &` - this will seed the DB using the XML file and then start the API on localhost:3000
    note: `nohup` removes logs in the console and isn't strictly needed
5. run `cd ..`
6. run `cd timezone-search-ui`
7. run `npm install`
8. run `nohup npm start &` - this will start the react app on localhost:3001
9.  go to `http://localhost:3001` to access the UI
10. call the api directly like so: `http://localhost:3000/timezones?search=Island`

### Environment

You can tweak the environment variables using the .env files in either /timezone-search-api or /timezone-search-ui folders

### Notes

I've included Adminer because it was helpful to check the contents of the DB when developing/debugging
You can login in using these credentials:

```
System: MySQL
Server: db
Username: root
Password: password
Database: timezones
```

### Things to add
I've considered some additional things that would improve the current design:

- Login page, using encrypted login api and salted passwords in db as per the optional bit 
- Could also add routing for login page and search page
- Improve look and feel - its a little basic at the moment! Custom Font or more colour perhaps.
- Refactor API file structure to be more extensible
- Improve types and interfaces - try to remove 'any'