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

# Entity

## TODO:

1.  Перенести логику работы с юзерами в отдельный сервис - +
7.  Поправить модули, соблюдать порядок инициализации imports, exports, providers, controllers - +
8.  app.module в отдельную папку - +
2.  Заменить все методы на стрелочные функции
3.  Задать правильный нейминг всем типам (про логику нейминга добавить в документацию readme.md)
4.  Вынести типы entity в отдельную папку
5.  Разобраться с UsePipes
6.  Создать декоратор @CurrentUser
