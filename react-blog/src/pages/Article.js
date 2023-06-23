import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import articles from '../data/articles.js';

import NotFound from './NotFound.js';

import Articles from '../components/Articles.js';

const Article = () => {
	const { name } = useParams();
	const article = articles.find((x) => x.name === name);
	const [articleInfo, setArticleInfo] = useState({ comments: [] });
	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`/api/articles/${name}`);
			const body = await res.json();
			setArticleInfo(body);
			console.log(body);
		};
		fetchData();
		console.log('Component Mounted');
	}, [name]);

	if (!article) return <NotFound />;
	const otherArticles = articles.filter((x) => x.name !== article.name);
	return (
		<>
			<h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>
				{article.title}
			</h1>
			{article.content.map((paragraph, i) => (
				<p className='mx-auto leading-relaxed text-base mb-4' key={i}>
					{paragraph}
				</p>
			))}
			<h1 className='sm:text-2xl text-xl font-bold my-4 text-gray-900'>
				Other Articles
			</h1>
			<div className='flex flex-wrap -m-4'>
				<Articles articles={otherArticles} />
			</div>
		</>
	);
};

export default Article;
