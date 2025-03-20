const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

async function categorizeEmail(email) {
    try {
        const prompt = `Categorize the following email into one of these categories: Interested, Meeting Booked, Not Interested, Spam, Out of Office\n\nEmail: ${email.subject}\n${email.body}`;
        
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 50
        });

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('AI categorization error:', error);
        throw error;
    }
}

async function generateReply(email) {
    try {
        const prompt = `Generate a professional reply to this email:\n${email.body}`;
        
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 200
        });

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('AI reply generation error:', error);
        throw error;
    }
}

module.exports = { categorizeEmail, generateReply };