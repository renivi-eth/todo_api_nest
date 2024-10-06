# Node.js REST API app ToDo (Nest.js, PostgreSQL (TypeORM))

<img src="https://nestjs.com/img/logo-small.svg" alt="Nest Logo" width="100" height="100">

# Инициализация:

```bash
# Клонирование репозитория:
git clone git@github.com:renivi-eth/todo_api_nest.git

cd todo_api_nest

# Установка зависимостей:
npm ci

# Инициализация базы данных и redis:
docker-compose up -d

# Запуск сервера:
npm run start:dev
```

# Database

```bash
1 (Frontend) <-> 2 (Backend) <-> 3 (PostgreSQL)
```

FR_RQ - используется как DTO для входящих запросов (Frontend -> Backend), определена для валидации и типизации данных, которые приходят от клиента (Frontend)
FR_RS - используется как DTO для ответа от Backend к Frontend, определенна для согласованности структуры данных к клиенту

Backend <-> PostgreSQL

PG-RQ - PostgreSQL Request
PG-RS - PostgreSQL Response

# NPM scripts

# Authentication

# Swagger API docs

Это приложения имеет документацию Swagger, не стеняйтесь в нее заглянуть:

[http://localhost:3000/api](http://localhost:3000/api)

# Особенности:

1. В проекте используется модульный подход: каждый модуль управляет своей частью функционала и использует соответствующие сущности базы данных, что обеспечивает лучшую организацию и масштабируемость кода. При работе с конкретным модулем мы должны импортировать TypeOrm с нужной для модуля сущностью (entity)
