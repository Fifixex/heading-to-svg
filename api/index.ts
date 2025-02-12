import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const config = {
  runtime: 'edge'
}

const app = new Hono().basePath('/api')

app.get('/text', (c) => {
    const { content, width = 100, height = 80 } = c.req.query()

    c.header('Content-Type', 'image/svg+xml')
    return c.body(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}px" height="${height}px">
        <text x="10" y="20" style="font-size: 24px">${content}</text>
    </svg>
    `)
})

export default handle(app)
