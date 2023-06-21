const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 8000;
const DB_STRING = `mongodb://localhost:27017`;
const articlesInfo = {};

// Initialize middleware
// we use to have to installl body parser but now is a built in middleware
// function of express. It parses incoming JSON payload
app.use(express.json({ extended: false }));

app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}!`));

app.get('/api/articles/:name', async (req, res) => {
	try {
		const name = req.params.name;
		const client = await MongoClient.connect(DB_STRING);
		const db = client.db('mern_blog');
		const article = await db.collection('articles').findOne({ name: name });
		res.status(200).json(article);
		client.close();
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
