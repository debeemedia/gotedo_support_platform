import { test } from '@japa/runner'
import Drive from '@ioc:Adonis/Core/Drive'
import { file } from '@ioc:Adonis/Core/Helpers'

test('show file uploaded and stored', async ({assert, client}) => {
  // const fakeDrive = Drive.fake()
  // const fakeAvatar = await file.generatePng('1mb')

  // await client
  //   .put(`/me`)
  //   .file('avatar', fakeAvatar.contents, { filename: fakeAvatar.name })

  // assert.isTrue(await fakeDrive.exists(fakeAvatar.name))


  Drive.restore()
})
