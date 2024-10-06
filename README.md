# Node.js REST API app ToDo (Nest.js, PostgreSQL (TypeORM))

## Инициализация:

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

<img src="https://nestjs.com/img/logo-small.svg" alt="Nest Logo" width="100" height="100">

## DTO

```bash
1 (Frontend) <-> 2 (Backend) <-> 3 (PostgreSQL)
```

Swagger

FR_RQ - используется как DTO для входящих запросов (Frontend -> Backend), определена для валидации и типизации данных, которые приходят от клиента (Frontend)
FR_RS - используется как DTO для ответа от Backend к Frontend, определенна для согласованности структуры данных к клиенту

Backend <-> PostgreSQL

PG-RQ - PostgreSQL Request
PG-RS - PostgreSQL Response

Особенности:

1. В проекте используется модульный подход: каждый модуль управляет своей частью функционала и использует соответствующие сущности базы данных, что обеспечивает лучшую организацию и масштабируемость кода. При работе с конкретным модулем мы должны импортировать TypeOrm с нужной для модуля сущностью (entity)

TODO:

1. Тестирование. Unit тесты (jest) и тесты производительности (ab).
   1. Unit тесты - написать тесты для функций в папке src/utils
   1. Тесты производительности - использовать ab для тестирования производительности своего API. Разобраться в параметрах ab и результатах его работы.
1. Документация. Swagger
   1. OpenAPI - создать документацию для своего API с помощью Swagger. Разобраться в формате OpenAPI и его возможностях.
1. Хостинг
1. Микросервисы и общение между ними. Redis
1. Final Проект - Свой проект или Cryptorank
