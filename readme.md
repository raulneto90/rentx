# Rentx API

## :information_source: Informações sobre o projeto

Este projeto é uma api de comunicação que realiza aluguel de carros. Foi desenvolvida
no bootcamp Ignite da Rocketseat.

## :computer: Tecnologias utilizadas

- [X] NodeJS
- [X] Express
- [X] Typescript
- [X] PostgreSQL
- [X] TypeORM
- [X] Tsyringe
- [X] Swagger

## :floppy_disk: Como baixar e utilizar este projeto

Para poder utilizar este projeto, é necessário que tenha instalado o `yarn` ou `npm` e
o `docker` com `docker-compose`.

No seu terminal:

```bash
$ git clone https://github.com/raulneto90/rentx
$ cd rentx
$ yarn / npm install

# É necessário inicializar o banco com o docker-compose
$ docker-compose up -d

# Rodar as migrations
$ yarn / npm run migration:run

# Iniciar o servidor em modo desenvolvimento
$ yarn dev
```

A API da documentação pode ser acessada [aqui](http://localhost:3333/docs) após o servidor estiver online.

## :exclamation: Observações

- Para configurar sua base de dados, é necessário alterar os dados do arquivo `ormconfig.json`.
- É necesário configurar o arquivo `.env`. No projeto há um `.env.example` como demo.
---
Feito com ❤ por Raul Neto. Me siga no [Linkedin](https://www.linkedin.com/in/raul-neto-777bb988/)
