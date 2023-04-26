# remix-strapi-mysql-template

## Elements

- [Strapi (Backend)](https://docs.strapi.io/)
- [Remix (Frontend)](https://remix.run/)
  - [i18n (internationalization)](https://www.i18next.com/)
  - [Apollo (GraphQL client)](https://www.apollographql.com/docs/)
  - [GraphQL codegen](https://the-guild.dev/graphql/codegen)

```
.
├── cms
│   └── ... Strapi files
├── database
│   └── ... MySQL files
└── frontend
    └── ... Remix files

```

## Setup local development environment

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

## Todo list

- [ ] adjust ui design
- [x] create language-selector component
- [x] create theme-selector (dark/light) component
- [ ] add i18n locale contents
- [ ] adjust frontend Docker env or remove frontend from Docker env
