import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Article from './pages/Article';
import ArticlesList from './pages/ArticlesList';
import NavBar from './components/NavBar';
import NotFound from './pages/NotFound';
function App() {
	return (
		<Router>
			<NavBar />
			<div className='max-w-screen-md mx-auto pt-20'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/about' element={<About />} />
					<Route path='/articles' element={<ArticlesList />} />
					<Route path='/articles/:name' element={<Article />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
