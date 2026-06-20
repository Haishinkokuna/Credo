import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const schema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'jobs',
      columns: [
        { name: 'company_name', type: 'string' },
        { name: 'position_title', type: 'string' },
        { name: 'job_link', type: 'string' },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'contacted_me', type: 'boolean' },
        { name: 'first_interview', type: 'boolean' },
        { name: 'hired', type: 'boolean' },
        { name: 'date_published', type: 'string', isOptional: true },
        { name: 'date_applied', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'notes',
      columns: [
        { name: 'job_id', type: 'string', isIndexed: true },
        { name: 'title', type: 'string', isOptional: true },
        { name: 'description', type: 'string' },
        { name: 'date', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
  ]
})
