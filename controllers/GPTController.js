const axios = require('axios');

const generateLore = async (req, res) => {
    const {name, race, charClass, gender} = req.body;
    const body = {
        model: "gpt-3.5-turbo-0125",
        messages: [{
            role: "user",
            content: `Create a lore introduction for a ${gender} character named ${name}, a ${race}, wich is a ${charClass} , referred to as the Warrior of Light in Final Fantasy XIV, summarize the lore in maximum 1000 characters that completes the sentence.`
        }],
        max_tokens: 300
     };
     const config = {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        }
    }
    try {
        const response = await axios.post(process.env.OPENAI_URL, body, config );

        const lastMessage = response.data.choices[0].message.content;
        return res.json({ lore: lastMessage });
    } catch (e) {
        console.error('Error calling OpenAI API:', e.response ? e.response.data : e.message);
        if (e.response) {
            
            res.status(e.response.status).send({
                error: e.response.data.error.message
            });
        } else {
            
            res.status(500).send('Failed to generate lore due to a server error');
        }
    }
};

module.exports = {generateLore};