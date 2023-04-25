# MakeNTU

## Dvelopment
```
# use correct node version
nvm use                       

# use correct pnpm version
corepack enable
corepack prepare pnpm@8.3.0 --activate

# install dependency
pnpm install

# environment
cp .env.default .env
```
## Run database
```
docker-compose -f server/docker-compose.yml up -d
```
## init database
```
pnpm database reset
```

## Run Backend 
```
pnpm dev-server
```

## Run Frontend
```
pnpm start
```
