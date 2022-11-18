# MakeNTU2023Competition

2022 MakeNTU 開發板 雷切 3DP 借用網站

[Project Introduction Page](https://hackmd.io/eo1-EJj8SHSnlF2erGbL3g)

## Quick Start (Development mode)

### Install dependency

```shell
$ # ./makeNTU-2023-competition

$ npm install
$ # or
$ yarn install
```

### Copy .env

```shell
$ cp .env.default .env
```

### Run database

```shell
$ # ./makeNTU-2023-competition/server

$ docker-compose up -d
```

To reset team account (data in `./server/database/data/teams.json`)

```shell
$ # ./makeNTU-2023-competition

$ # in Linux/Mac
$ npm run database reset
$ # or
$ yarn database reset
$ # in window
$ npm run window-database reset
$ # or
$ yarn window-database reset
```

### Run backend

```shell
$ # ./makeNTU-2023-competition

$ # in Linux/Mac
$ npm run dev-server
$ # or
$ yarn dev-server

$ # in window
$ npm run window-dev-server
$ # or
$ yarn window-dev-server
```

### Run frontend

```shell
$ # ./makeNTU-2023-competition

$ npm start
$ # or
$ yarn start
```

Goto `http://localhost:3000` to see the website.
