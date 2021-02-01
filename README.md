## Shipper
##### Server

 Traffic Management System for Coastal Regions. 
Developed for **ASEAN-India Hackathon** 2021 - PS7.

##### Demo:  [Shipper-Web](https://shipper-web.netlify.app)

##### For Frontend- Refer to [Shipper-Web](https://github.com/NiketanG/shipper-web)

### Local Development

##### Prerequisites
 - [Postgresql](https://www.postgresql.org/) Installed and Configured on the system
 - [Node.js](https://nodejs.org/) Installed

##### Configure Environment Variables
Make sure you have set the following environment variables. You can also use a **.env** file. An .env.example file is provided for the format
```
DATABASE_URL=Url of the Postgresql Database For Eg. `postgresql://postgres:postgres@localhost:5432/shipper`
PORT=Port on which you want the server to run For Eg. `4000`
FRONTEND_URL=URL on which the Frontend ([Shipper-Web](https://github.com/NiketanG/shipper-web)) is running Gor Eg. `http://localhost:3000`
```
##### Install Dependencies
```
yarn install
	#OR
npm install
```

##### Start Development Server
```
yarn dev
	#OR
npm run dev
```
This will allow you to access the app on [http://localhost:4000](http://localhost:4000) 

#### [Optional] Run Migrations

    typeorm:migrations run  

If the above command doesn't work, try this one: 
```
ts-node ./node_modules/typeorm/cli.js migration:run
```


#### Create Production Build
This will create a production build that can be deployed.
```
yarn postinstall
#OR
npm run postinstall
```

```
yarn start
#OR
npm run start
```


### Getting Started
The server uses [Socket.io](https://socket.io/) to provide Bi-Directional Communication to all clients connected as the location of ships changes. The Updated data is then stored in the database. 
