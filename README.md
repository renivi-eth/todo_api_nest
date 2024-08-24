# Модули:

1. AppModule
2. AuthModule
3. TaskModule
4. TagsModule

// 1 <-> 2 <-> 3
// 1 <-> 2 : 1. Request, 2. Response. FR_RQ, FR_RS
// 2 <-> 3 : 1. Request, 2. Response. PG_RQ, PG_RS
// 2 <-> 4 : 1. Request, 2. Response. CH_RQ, CH_RS
// 2 <-> 5 : 1. Request, 2. Response. RD_RQ, RD_RS

# DTO

1(Frontend) <-> 2 (Backend) <-> 3 (PostgreSQL)

Frontend <-> Backend

FR_RQ - используется как DTO для входящих запросов (Frontend -> Backend), определена для валидации и типизации данных, которые приходят от клиента (Frontend)
FR_RS - используется как DTO для ответа от Backend к Frontend, определенна для согласованности структуры данных к клиенту

Backend <-> PostgreSQL

PG-RQ - PostgreSQL Request
PG-RS - PostgreSQL Response

Examples:

FR_RQ (Frontend Request) - DTO

export class CreateUser_FR_RQ {
@IsEmail()
email: string;

@IsString()
@Length(6, 20)
password: string;
}

## TODO:

1.  Перенести логику работы с юзерами в отдельный сервис - +
2.  Поправить модули, соблюдать порядок инициализации imports, exports, providers, controllers - +
3.  app.module в отдельную папку - +
4.  Заменить все методы на стрелочные функции +
5.  Задать правильный нейминг всем типам (про логику нейминга добавить в документацию readme.md) - +
6.  Вынести типы entity в отдельную папку - +
7.  Разобраться с UsePipes - + 
8.  Создать декоратор @CurrentUser 
