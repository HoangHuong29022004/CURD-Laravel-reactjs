import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Create from './components/Create';
import Update from './components/Update';
import Index from './components/Index';

function App() {
  return (
    <div className="container">
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;