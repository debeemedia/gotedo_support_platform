import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import SupportRequest from 'App/Models/SupportRequest';
import User from 'App/Models/User';

export default class SupportRequestsController {
    public async submitRequest ({request, response}: HttpContextContract) {
        try {
            const validationSchema = schema.create({
                email_address: schema.string([
                    rules.minLength(10),
                    rules.trim(),
                    rules.unique({ table: 'support_requests', column: 'email_address' })
                ]),
                first_name: schema.string(),
                last_name: schema.string(),
                title: schema.string(),
                message: schema.string(),
                file_path: schema.string.optional()
            })

            const newRequestDetails = await request.validate({schema: validationSchema})

            let user = await User.findBy('email_address', newRequestDetails.email_address)
            if (!user) {
                user = await User.create({
                    email_address: newRequestDetails.email_address,
                    full_name: `${newRequestDetails.first_name} ${newRequestDetails.last_name}`
                })
            }

            const file = request.file('file', {
                size: '2mb',
                extnames: ['jpg', 'jpeg', 'png']
            })
            let filePath
            if (file) {
                if (!file.isValid) {
                    return response.status(400).json({message: file.errors})
                }
                const fileName = `${Date.now()}_${file.clientName}`
                await file.move(Application.publicPath('uploads'), {
                    name: fileName,
                    overwrite: true
                })
                filePath = `uploads/${fileName}`
            }

            const newRequest = new SupportRequest()
            newRequest.email_address = newRequestDetails.email_address
            newRequest.first_name = newRequestDetails.first_name
            newRequest.last_name = newRequestDetails.last_name
            newRequest.title = newRequestDetails.title
            newRequest.message = newRequestDetails.message
            newRequest.file_path = filePath ?? null
            
            await user.related('supportRequests').save(newRequest)

            response.status(201).json({
                message: 'Request submitted successfully'
            })

        } catch (error) {
            response.status(500).json({
                message: 'Failed to submit request',
                error: error.message
            })
            console.error(error);
            
        }
    }
}
