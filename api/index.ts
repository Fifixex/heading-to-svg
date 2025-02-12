import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const config = {
  runtime: 'edge'
}

const app = new Hono().basePath('/api')

app.get('/', (c) => {
    const options = c.req.query()
    const {
        text,
        color = 'light-dark(black, white)',
        size = 30,
        font = 'Inter',
        width = 640,
        height = 40,
    } = options;

    c.header('Content-Type', 'image/svg+xml')
    return c.body(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
            <style>
                @import url(https://fonts.googleapis.com/css?family=${font}:700);
            </style>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
                <stop offset="0%" stop-color="${color}" />
                <stop offset="100%" stop-color="transparent" />
            </linearGradient>
        </defs>
        <g transform="translate(10, 30)">
            <text
                fill="url(#gradient)"
                font-family="${font}"
                font-size="${size}"
                x="0"
                y="0"
            >
            ${text}
            </text>
        </g>
    </svg>
    `)
})

export default handle(app)
