import './App.css';
import Classifier from './Components/Classifier/Classifier';
import ImageList from './Components/ImageList/ImageList';
import Navigation from './Components/Navigation/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path='/' Component={Classifier} />
          <Route path='/list' Component={ImageList} />
          <Route path='*' element={<h1>Sorry... Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
