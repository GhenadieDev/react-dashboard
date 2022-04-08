import { Routes, Route } from 'react-router-dom';
import { AuthRoute } from './features/auth/AuthRoute';
import { Register } from './features/register/Register';
import { NullPage } from './features/null/NullPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<AuthRoute />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='*' element={<NullPage />}/>
      </Routes>
    </div>
  );
}

export default App;
