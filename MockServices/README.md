
# Evershop ecommerce app
 **Install:**
- [System Requirements]( https://evershop.io/docs/development/getting-started/system-requirements)

- [pgadmin](https://www.pgadmin.org/)

**Follow instructions here:** 
- [Installation Guide](https://evershop.io/docs/development/getting-started/installation-guide)

## Using Docker as a host

```bash
curl -sSL https://raw.githubusercontent.com/evershopcommerce/evershop/main/docker-compose.yml > docker-compose.yml
docker-compose up -d
```
Add Admin User in Docker terminal
```bash
npm run user:create -- --email "your email" --password "your password" --name "your name"
```
## Using npm as a host

```bash
npx create-evershop-app my-evershop-app
```
Add admin user
```bash
npm run user:create -- --email "your email" --password "your password" --name "your name"
```
- [Video Guide](https://www.youtube.com/watch?v=-KBh_Lw8AC0&t=1s)

* Run
```bash
npm run build
npm run start
```
