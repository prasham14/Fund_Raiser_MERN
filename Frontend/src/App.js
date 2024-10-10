import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import Transaction from './components/Transaction';
import Document from './components/Doc';
import Help from './Pages/Help';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/transactionPage" element={<Transaction />} />
          <Route path="/help" element={<Help />} />
          <Route path="/doc" element={<Document />} />

        </Routes>
      </div>
    </Router>

  );
}

export default App;
