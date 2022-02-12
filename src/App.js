import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './style.scss';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Layout
import Container from './components/layout/Container';
import Logo from './components/layout/Logo';
import MainContent from './components/layout/MainContent';
import NavBar from './components/layout/NavBar';
import Follow from './components/layout/Follow';

// Components
import Nav from './components/navs/Nav';

// Pages
import Home from './pages/Home';
import Tags from './pages/Tags';
import SearchResult from './pages/SearchResult';

export default function App() {
  // 
  const [newArray, setNewArray] = useState([])

  // API Connections
  const apiURL = 'https://api.unsplash.com/search/collections?query';
  const apiKey = 'U-rUir27xXKsXtMIFGZ0TcQ4DTFAsfUC14OdqJCArmw';

  useEffect(() => {
    setTimeout(() => {
      fetch(`${apiURL}=snow&per_page=1&client_id=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          setNewArray(data.results)
        })
    }, 1500);
  }, []);
  
  return (
    <BrowserRouter>
      <Container>
        <Logo></Logo>
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/search/:query/:range" element={<SearchResult newArray={newArray} />} />
          </Routes>
        </MainContent>
        <NavBar>
          <Nav />
        </NavBar>
        <Follow>
          <Routes>
            <Route path="*" element={<Follow />} />
          </Routes>
        </Follow>
      </Container>
    </BrowserRouter>
  );
}
