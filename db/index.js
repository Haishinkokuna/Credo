import { Database } from '@nozbe/watermelondb'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'

import { schema } from './schema'
import Job from './model/Job'
import Note from './model/Note'

// The LokiJSAdapter handles communication between WatermelonDB and a pure JS memory database.
// This allows us to instantly test the UI using Expo Go without needing the Android SDK!
const adapter = new LokiJSAdapter({
  schema,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
    console.error('WatermelonDB Setup Error', error)
  }
})

// Finally, we create the Database instance
export const database = new Database({
  adapter,
  modelClasses: [
    Job,
    Note,
  ],
})
