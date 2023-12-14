import { test } from '@japa/runner'
import SupportRequest from 'App/Models/SupportRequest'

test('show multiple support requests linked to a user', async ({assert}) => {
  await SupportRequest.create({
    email_address: 'donaldtrump@gmail.com',
    first_name: 'Test',
    last_name: 'User',
    title: 'Request 1',
    message: 'Message 1',
  });

  await SupportRequest.create({
    email_address: 'donaldtrump@gmail.com',
    first_name: 'Test',
    last_name: 'User',
    title: 'Request 2',
    message: 'Message 2',
  });

  const supportRequestsBelongToUser = await SupportRequest.query()
    .where('email_address', 'donaldtrump@gmail.com')

  assert.equal(supportRequestsBelongToUser.length, 2);
})
