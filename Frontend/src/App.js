import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import Option1 from './components/Option1';
import Option2 from './components/Option2';
import Option3 from './components/Option3';
import Transaction from './components/Transaction';
import Document from './components/Document';
import Help from './Pages/Help';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/option-one" element={<Option1 />} />
          <Route path="/option-two" element={<Option2 />} />
          <Route path="/option-three" element={<Option3 />} />
          <Route path="/transactionPage" element={<Transaction />} />
          <Route path="/help" element={<Help />} />
          <Route path="/doc" element={<Document />} />

        </Routes>
      </div>
    </Router>

  );
}

export default App;
