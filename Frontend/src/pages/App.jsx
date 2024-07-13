// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './home';
import Form from './form';
import List from './list';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form/:id" element={<Form />} /> {/* Added route with parameter */}
        <Route path="/form" element={<Form />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>
  );
}

export default App;
