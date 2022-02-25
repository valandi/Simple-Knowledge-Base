import React from 'react';
import Home from './Screens/Home/Home.js';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import ViewArticle from './Screens/ViewArticle/ViewArticle';
import CreateArticle from './Screens/CreateArticle/CreateArticle.js';
import ListArticles from './Components/ListArticles/ListArticles.js';
import Admin from './Screens/Admin/admin.js';
import Search from './Screens/Search/search.js';

function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/create-article">Create Article</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/view-article/:id" element={<ViewArticle />}/>
          <Route path="/create-article" element={<CreateArticle />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/admin" element={<Admin />}/>
        </Routes>
    </Router>
  );
}

export default App;
