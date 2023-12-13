import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import SupportRequest from './SupportRequest'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email_address: string

  @column()
  public full_name: string

  @hasMany(() => SupportRequest, { foreignKey: 'user_id' })
  public supportRequests: HasMany<typeof SupportRequest>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
}
