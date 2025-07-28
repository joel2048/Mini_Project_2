import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import './index.css'

import CardSearch from './pages/CardSearch'
import Decks from './pages/Decks'
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Box from '@mui/material/Box';
import ParallaxBackground from './components/ParallaxBackground';

function App() {
  return (
    <>
    <NavBar className="sticky top-0" />
    <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
    <ParallaxBackground/>
    <Router>
      <div>
        <main>
          <Routes> 
            <Route path="/" element={<CardSearch />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/decks"
              element={
                <ProtectedRoute>
                  <Decks />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
    </Box>
    </>
  )
}

export default App
