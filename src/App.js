import React from 'react';
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
  return (
    <BrowserRouter>
      <Container>
        <Logo></Logo>
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/search/:query/:range" element={<SearchResult />} />
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
