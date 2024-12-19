import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./pages/Login"
import Dashboard from './pages/Dashboard';
import  Setting  from './pages/Setting';

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/connected-websites" element={<Dashboard />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
  )
}

