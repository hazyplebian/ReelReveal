import './App.css';
import { Outlet } from 'react-router-dom';
import  ReelReveal  from './components/ui/reelReveal';

function App() {

  return (
    <div className="app">
      <h1>ReelReveal</h1>
    
      <ReelReveal></ReelReveal>
      <Outlet/>
    </div>
  );
}

export default App
