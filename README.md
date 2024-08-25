# Node.js REST API app ToDo (Nest.js, Knex.js)

## Инициализация:

```bash
# Клонирование репозитория:
git clone git@github.com:renivi-eth/todo_api_nest.git

cd todo_api_nest

# Установка зависимостей:
npm ci

# Инициализация базы данных:
docker-compose up -d

# Запуск сервера:
npm run start:dev
```

// 1 <-> 2 <-> 3
// 1 <-> 2 : 1. Request, 2. Response. FR_RQ, FR_RS
// 2 <-> 3 : 1. Request, 2. Response. PG_RQ, PG_RS
// 2 <-> 4 : 1. Request, 2. Response. CH_RQ, CH_RS
// 2 <-> 5 : 1. Request, 2. Response. RD_RQ, RD_RS

## DTO

```bash
1 (Frontend) <-> 2 (Backend) <-> 3 (PostgreSQL)
```

Frontend <-> Backend

FR_RQ - используется как DTO для входящих запросов (Frontend -> Backend), определена для валидации и типизации данных, которые приходят от клиента (Frontend)
FR_RS - используется как DTO для ответа от Backend к Frontend, определенна для согласованности структуры данных к клиенту

Backend <-> PostgreSQL

PG-RQ - PostgreSQL Request
PG-RS - PostgreSQL Response

## TODO:

8.  Создать декоратор @CurrentUser
