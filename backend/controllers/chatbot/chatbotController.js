const axios = require("axios");
require("dotenv").config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


const chatbot= async (req, res) => {
  const { prompt } = req.body;
  console.log("Prompt: ", prompt);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "You are a book recommendation assistant." }, { role: "user", content: prompt }],
        max_tokens: 150,
      },
      { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {chatbot};


