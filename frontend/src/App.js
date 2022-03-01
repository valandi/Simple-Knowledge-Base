import React, { useEffect } from 'react';
import Home from './Screens/Home/Home.js';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink
} from "react-router-dom";
import ViewArticle from './Screens/ViewArticle/ViewArticle';
import CreateArticle from './Screens/CreateArticle/CreateArticle.js';
import Admin from './Screens/Admin/admin.js';
import Search from './Screens/Search/search.js';
import ErrorReporter from './Components/ErrorReporter/errorReporter.js';

function App() {
  return [
      <Router>
        <div className="nav-container">
          <div className="nav-link">
            <NavLink to="/" className={(navData) => (navData.isActive ? 'selected-link' : '')}>Home</NavLink>
          </div>
          <div className="nav-link">
            <NavLink to="/create-article" className={(navData) => (navData.isActive ? 'selected-link' : '')}>Create Article</NavLink>
          </div>
          <div className="nav-link">
            <NavLink to="/search" className={(navData) => (navData.isActive ? 'selected-link' : '')}>Search</NavLink>
          </div>
          <div className="nav-link">
            <NavLink to="/admin" className={(navData) => (navData.isActive ? 'selected-link' : '')}>Admin</NavLink>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/view-article/:id" element={<ViewArticle />}/>
          <Route path="/create-article" element={<CreateArticle />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/admin" element={<Admin />}/>
        </Routes>
    </Router>,
    <ErrorReporter
    ></ErrorReporter>
  ];
}

export default App;
