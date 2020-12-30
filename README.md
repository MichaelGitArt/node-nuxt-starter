**Run**

```bash
(cd client/ && yarn dev)

(cd server/ && yarn dev)
```

**Setup**

change ip and domain names if you need
and add it to your host file:

```
192.168.1.185 server.planner.com
127.0.0.1 planner.com
```

**Setup server**

```bash
cd ./server
yarn install
# run migrations and seeds
yarn db:reset
```

**Setup front**

```bash
cd ./client
yarn install
```

### Server

- express
- typescript
- postgreSQL (knex)
- passport
- express-validator
- vue-toast-notification
- shortid | uuid

### Front

- vue/nuxt
- vuetify
- i19n
- axios
- vee-validate
