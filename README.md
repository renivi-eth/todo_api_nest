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

## DTO

```bash
1 (Frontend) <-> 2 (Backend) <-> 3 (PostgreSQL)
```

FR_RQ - используется как DTO для входящих запросов (Frontend -> Backend), определена для валидации и типизации данных, которые приходят от клиента (Frontend)
FR_RS - используется как DTO для ответа от Backend к Frontend, определенна для согласованности структуры данных к клиенту

Backend <-> PostgreSQL

PG-RQ - PostgreSQL Request
PG-RS - PostgreSQL Response

## TODO:

1.  Создать декоратор @CurrentUser
1.  Реализовать сортировку и фильртацию
1.  Реализовать связь task_tag
1.  Привести проект в порядок, включая ReadMe
