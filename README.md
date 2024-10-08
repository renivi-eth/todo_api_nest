# NestJS REST API TODO app (PostgreSQL,TypeORM)

<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" alt="Nest Logo" width="100" height="100">
</div>

---

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

---

# Database

Конфигурация TypeOrmModule:

```bash
   {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [join(__dirname, '/../database/entities/*.entity{.ts,.js}')],
      migrations: [join(__dirname, '/../database/migrations/*{.js,.ts}')],
      synchronize: false,
    }
```

## DTO

`(Frontend) <-> 2 (Backend) <-> 3 (PostgreSQL)`

1. `FR_RQ` - используется как DTO для входящих запросов (Frontend <-> Backend), определена для валидации и типизации данных, которые приходят от клиента (Frontend)
2. `FR_RS` - используется как DTO для ответа от Backend к Frontend, определенна для согласованности структуры данных к клиенту
3. `Entity` - сущности для определения струтуры таблиц PostgreSQL

PG-RQ - PostgreSQL Request
PG-RS - PostgreSQL Response

---

# NPM scripts

- `npm start` - Запустить приложение
- `npm run start:dev` - Запустить приложение в режиме разработки (nodemon)
- `npm run test` - Запустить Unit (Jest) тесты
- `npm run start:prod` - Cобрать приложение

---

# Authentication

Приложение использует JSON Web Token (JWT) для проверки аутентификации пользователя, логика работы реализована в `Auth.guard.ts`

---

# Swagger API docs

Это приложения имеет документацию Swagger, не стеняйтесь в нее заглянуть:

[http://localhost:3000/api](http://localhost:3000/api)

---

# Особенности:

1. В проекте используется модульный подход: каждый модуль управляет своей частью функционала и использует соответствующие сущности базы данных, что обеспечивает лучшую организацию и масштабируемость кода. При работе с конкретным модулем мы должны импортировать TypeOrm с нужной для модуля сущностью (entity)
2. Для логгирования используется Logger модуль (встроенное API)
