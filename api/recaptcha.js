import { useBody } from 'h3'
import { $fetch } from 'ohmyfetch/node'

export default async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { token, secret } = await useBody(req)

        if (!token || !secret) {
            res.end(JSON.stringify({
                success: false,
                message: 'Invalid token'
            }))
            return
        }
        const response = await $fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
        )

        if (response.success) {
            res.end(JSON.stringify({
                success: true,
                message: 'Token verifyed',
                response: response
            }))
        } else {
            res.end(JSON.stringify({
                success: false,
                message: 'Invalid token',
                response: response
            }))
        }
    } catch (e) {
        console.log('ReCaptcha error:', e)
        res.end(JSON.stringify({
            success: false,
            message: 'Internal error'
        }))
    }
}