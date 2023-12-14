import { test } from '@japa/runner'
import SupportRequest from 'App/Models/SupportRequest'

test('submit support request and show data persistence', async ({assert, client}) => {
  const response = await client.post('/submit_request')
    .field('email_address', 'maryjane@gmail.com')
    .field('first_name', 'Mary')
    .field('last_name', 'Jane')
    .field('title', 'Test Title')
    .field('message', 'Test message')

  response.assertStatus(201)
  response.assertBodyContains({ message: 'Request submitted successfully' })

  const supportRequest = await SupportRequest.query()
    .where('email_address', 'maryjane@gmail.com')
    assert.exists(supportRequest);
})