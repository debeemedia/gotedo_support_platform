import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      { email_address: 'okekedeborah@gmail.com', full_name: 'Deborah Okeke' },
      { email_address: 'techdebee@gmail.com', full_name: 'Tech Debee' },
      { email_address: 'debeemediasolutions@gmail.com', full_name: 'Debee Media' },
      { email_address: 'willowszone@gmail.com', full_name: 'Chidi Michael' },
    ])
  }
}
