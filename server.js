const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 8000;
const DB_STRING = `mongodb://localhost:27017`;

const withDB = async (operations, res) => {
	try {
		const client = await MongoClient.connect(DB_STRING);
		const db = client.db('mern_blog');
		await operations(db);
		client.close();
	} catch (error) {
		res.status(500).json({
			message: 'Error connecting to database.',
			error,
		});
	}
};
// Initialize middleware
// we use to have to installl body parser but now is a built in middleware
// function of express. It parses incoming JSON payload
app.use(express.json({ extended: false }));

app.get('/api/articles/:name', async (req, res) => {
	withDB(async (db) => {
		const name = req.params.name;
		const article = await db.collection('articles').findOne({ name: name });
		res.status(200).json(article);
	}, res);
});

app.post('/api/articles/:name/comments', async (req, res) => {
	const { username, text } = req.body;
	const name = req.params.name;
	withDB(async (db) => {
		let article = await db.collection('articles').findOne({ name: name });
		await db.collection('articles').updateOne(
			{ name: name },
			{
				$set: {
					comments: article.comments.concat({ username, text }),
				},
			}
		);
		article = await db.collection('articles').findOne({ name: name });
		res.status(200).json(article);
	}, res);
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
