import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'
import { join } from 'node:path'

const dbConfig = defineConfig({
  connection: 'sqlite',
  connections: {
    sqlite: {
      client: 'better-sqlite3',
      connection: {
        filename: join(app.appRoot.pathname, '..', 'mca.db'),
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig