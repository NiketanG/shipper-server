## Shipper

#### Web

Traffic Management System for Coastal Regions.
Developed for **ASEAN-India Hackathon** 2021 - PS7 and won **Encouragement Award**.

### Demo

[Shipper-Web](https://shipper-web.netlify.app)

##### For Frontend- Refer to [Shipper-Web](https://github.com/NiketanG/shipper-web)

## Local Development

### Prerequisites

-   [Postgresql](https://www.postgresql.org/) Installed and Configured on the system
-   [Node.js](https://nodejs.org/) Installed

### Environment Variables

Make sure you have set the following environment variables. You can also use a **.env** file. An [`.env.example`](.env.example) file is provided in the repo.

`DATABASE_URL`

> Url of the Postgresql Database.
> For Eg. `postgresql://postgres:postgres@localhost:5432/shipper`

`PORT`

> Port on which you want the server to run. For Eg. 4000 <br/>
> If you change this, you have to make appropriate changes in [`docker-compose.yml`](docker-compose.yml)

`FRONTEND_URL`

> URL on which the Frontend ([Shipper-Web](https://github.com/NiketanG/shipper-web)) is running Gor Eg. `http://localhost:3000`. If this is incorrect, you will face CORS issues

`DB_ENABLE_SSL`

> set to `true` for enabling SSL connection to the database. Only set to true when deploying and your database provider only supports SSL

### Install Dependencies

```bash
yarn install
or
npm install
```

### Start Development Server

```bash
yarn dev
or
npm run dev
```

This will start a develoment server for the frontend on [http://localhost:4000](http://localhost:4000)

---

### Run Migrations

This will create necessary tables in the database.
Required to run only once.

```bash
yarn init-database
```

## Deployment

### Create a production build

This will create a production build that can be deployed.

```bash
yarn build
or
npm run build
```

### Start the Production Server

```bash
yarn start
OR
npm run start
```

For Deploying, you can use Docker (with Docker Compose).

> The project is configured to use its own Postgresql Database, so make sure either the hosts port `5432` is free or map the port for docker container `shipper_db` to another port and make changes to `shipper_server`s environment variables section.

```bash
docker-compose up --build
```

---

### Getting Started

The server uses [Socket.io](https://socket.io/) to provide Bi-Directional Communication to all clients connected as the location of ships changes. The Updated data is then stored in the database.

Build and Start the Frontend Server ([Shipper-Web](https://github.com/NiketanG/shipper-web)), make sure the API_URL is properly configured and follow the instructions in [Getting Started](https://github.com/NiketanG/shipper-web#getting-started).
