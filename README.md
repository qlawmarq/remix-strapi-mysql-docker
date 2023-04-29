# remix-strapi-mysql-docker

## Elements

- [Strapi (Backend)](https://docs.strapi.io/)
  - [i18n (internationalization)](https://strapi.io/features/internationalization)
  - [GraphQL API](https://docs.strapi.io/dev-docs/api/graphql)
- [Remix (Frontend)](https://remix.run/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [i18n (internationalization)](https://github.com/sergiodxa/remix-i18next)
  - [Apollo (GraphQL client)](https://www.apollographql.com/docs/)
  - [GraphQL codegen](https://the-guild.dev/graphql/codegen)

```
.
├── backend
│   └── ... Strapi files
├── database
│   └── ... MySQL files
└── frontend
    └── ... Remix files

```

## Setup local development environment (Docker)

```sh
docker-compose build
docker-compose up
```

After the setup is complete, access to the following will be available:

- Admin console (Strapi): http://localhost:1337/admin/
- GraphQL playground (Strapi): http://localhost:1337/graphql/
- Frontend (Remix): http://localhost:3000/

Now you can access the admin console to edit contents, and update the frontend as you wish.

Here's initial local admin credential:

- `admin@example.com`
- `P4ssW0rd`

See other credentials on each `local.env` files.

- **NOTE: Please change passwords and other credentials if using this in a production environment.**

If you want to save local database change as a dump file, try following command:

```sh
docker-compose exec database mysqldump -u root -p strapi > database/data/init/init.sql
```

If you update a GraphQL query (`gql`) and need to generate type definitions, try the following:

```sh
docker-compose exec frontend bash
npm run generate:type
```

## Setup local development environment (without Docker)

It can also be set up without Docker.

### Frontend

Since it is easier to refer to the type information by having `node_modules` locally, not using Docker only for Frontend is also an option.

```sh
cd frontend
npm i
npm run dev
```

### Backend

Backend need setup database in your local.
Therefore, I recommend using Docker for the database and backend at least.

```sh
cd backend
npm i
npm run dev
```

## Todo & What I Did

- [x] [Language-selector & support i18n feature.](https://github.com/qlawmarq/remix-strapi-mysql-docker/pull/1/files)
- [x] [Theme selector (dark/light).](https://github.com/qlawmarq/remix-strapi-mysql-docker/pull/2)
- [x] [Frontend works even if the API does not work or does not exist.](https://github.com/qlawmarq/remix-strapi-mysql-docker/pull/4)
- [x] [Localized URLs route](https://github.com/qlawmarq/remix-strapi-mysql-docker/pull/6)
- [x] [Sitemap.xml and robots.txt](https://github.com/qlawmarq/remix-strapi-mysql-docker/pull/7)
