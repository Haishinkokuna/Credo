import { Model } from '@nozbe/watermelondb'
import { field, text, date, readonly, children } from '@nozbe/watermelondb/decorators'

export default class Job extends Model {
  static table = 'jobs'
  static associations = {
    notes: { type: 'has_many', foreignKey: 'job_id' },
  }

  // @text gives us string fields, @field gives us raw types (like booleans)
  @text('company_name') companyName
  @text('position_title') positionTitle
  @text('job_link') jobLink
  
  @children('notes') notes
  
  @field('contacted_me') contactedMe
  @field('first_interview') firstInterview
  @field('hired') hired

  @text('date_published') datePublished
  @text('date_applied') dateApplied

  // WatermelonDB automatically manages created_at and updated_at
  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
}
