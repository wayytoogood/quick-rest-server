# quick-rest-server

Generate a simple REST API in less than 15 seconds.

## Getting started

Install rest api

```
npm install quick-rest-server
```

Install nodemon for having hot reload

```
npm install nodemon
```

### Basic Usage

```
import server from 'quick-rest-server'

server.config({ port: 3000 })

// Making type annotation for the data here is optional.
server.generateRoutes<{ id: number; name: string; price: number }>([
  {
    method: 'get',
    path: '/api/products',
    data: [
      { id: 1, name: 'Product 1', price: 500 },
      { id: 2, name: 'Product 2', price: 750 },
    ],
    delay: 2000,
  },
])

server.start()
```

After adding the code all you need to is type the command below in terminal(here it's assumed that we have that code in server.ts file)

```
npx nodemon server.ts
```

If you are going to use it in a ts project that is already exist, you may want to add a new folder and in that folder add an empty tsconfig.json file for preventing
conflict might arise from having multiple tsconfig files.

```
mkdir mock-server
cd mock-server
touch server.ts
touch tsconfig.json

npx nodemon server.ts
```

### Options

```
Config options(this options apply all routes if you don't override them in generateRoutes):
  --port            optional          Defaults to 5000
  --delay           optional          Defaults to 0

Route options:
  --method          required          Right now only accepts 'get'
  --path            required          Route path
  --data            required          Data to be stored
  --statusInfo      optional          Defaults to {status: 200, success: true, message?: Generic message changes according to success state }
  --delay           optional          Defaults to delay value specified in config
```
