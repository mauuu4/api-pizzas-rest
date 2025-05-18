import pgPromise from 'pg-promise'

const config = {
  host: 'localhost',
  port: 5432,
  database: 'pizzasdb',
  user: 'postgres',
  password: 'mauricio'
}

const pgp = pgPromise({})

export const db = pgp(config)
