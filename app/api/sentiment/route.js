import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req) {

    const { reviews } = await req.json()

    const text = reviews.map(r => r.content).join("\n")

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You analyze movie reviews and return sentiment summary and classification (Positive, Mixed, Negative)."
            },
            {
                role: "user",
                content: text
            }
        ]
    })

    return Response.json({
        result: response.choices[0].message.content
    })
}