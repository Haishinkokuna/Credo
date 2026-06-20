import { Model } from '@nozbe/watermelondb'
import { field, text, date, readonly, relation } from '@nozbe/watermelondb/decorators'

export default class Note extends Model {
  static table = 'notes'
  static associations = {
    jobs: { type: 'belongs_to', key: 'job_id' },
  }

  @relation('jobs', 'job_id') job

  @text('title') title
  @text('description') description
  @text('date') date

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
}
