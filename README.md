# Memory Game with Classic Art
This is the classic memory card game built with the following technologies:
- Frontend: React and Redux 
- API: Typescript and Express 
- ORM: Prisma 
- Database: PostgreSQL

The images on the cards come from the [Artsy API](https://developers.artsy.net).  [Here](https://memory-art-35efd80c8dec.herokuapp.com/) is a demo hosted on Heroku.

## Local Dev
To run this app locally, run the backend and frontend in separate terminals

Requirements: `Node v22`, `yarn`, `npm`

Backend:\
```$ yarn install```\
```$ yarn dev```

Frontend:\
```$ cd client```\
```$ yarn install```\
```$ yarn start```

Database:\
Create a database in postgres named ```memoryart```

Migrations:\
```yarn migrate```

DB Seed\
```yarn seed```

```Environment Variables```:\
DATABASE_URL="postgresql://{{DB_USER}}:{{DB_PASSWORD}}:@localhost:5432/memoryart"

If you want to populate the database with images connected to the Artsy API, create a developer account with the Artsy API [here] (https://developers.artsy.net/).\
ARTSY_BASE_URL=https://api.artsy.net/api\
ARTSY_CLIENT_ID=\
ARTSY_CLIENT_SECRET=

## API Docs



## Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/mess3109/memory-react-redux. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org)
code of conduct.

## License
This application is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
