const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json());

const configuration = new Configuration({
  apiKey: "YourApiKey",
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const { transcription, messages } = req.body;

  try {
    // Add the new user message to the existing messages history
    const updatedMessages = [
      ...messages,
      { role: "user", content: transcription },
    ];

    console.log("Updated messages:", updatedMessages);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: updatedMessages,
    });
    const message = completion.data.choices[0].message.content;
    console.log("Message:", message);
    res.json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5008;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
