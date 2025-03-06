import './App.css';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className="app">
      <h1>ReelReveal</h1>
      <Outlet/>
    </div>
  );
}

export default App
