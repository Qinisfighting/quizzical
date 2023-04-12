

import React, {useState, useEffect} from 'react';
import Quiz from './components/Quiz';
import Home from './components/Home';
import Navbar from './components/Navbar';
import './App.css';


function App() {
  const [lightMode, setLightMode] = useState(() => JSON.parse(localStorage.getItem("lightMode"))) 
  const [isHome, setIsHome] = useState(true);
  const [formData, setFormData] = useState({
    numberOfQuestions: '5',
    category: '',
    difficulty: '',
    type: ''
    
});
function toggleLightMode(){  
  setLightMode(prev => !prev)
}
function toggleIsHome() {
  setIsHome(prev => !prev);
}
function handleFormChange(e) {
  const {name, value} = e.target;
  
  setFormData(prev => {
      return {
          ...prev, [name] : value
      };
  });
}

useEffect(() => {
  localStorage.setItem('lightMode', JSON.stringify(lightMode));
}, [lightMode]);
  return (
    <div className="App">
        <Navbar lightMode={lightMode} toggle={toggleLightMode} />
       {
                isHome 
                    ?
                    <Home toggleIsHome={toggleIsHome} formData={formData} 
                        handleFormChange={handleFormChange}  lightMode={lightMode}
                        
                    />
                    :
                    <Quiz formData={formData} toggleIsHome={toggleIsHome} 
                         lightMode={lightMode}
                    />
            }
          
       <footer>QIN勤©2023 up&qu</footer>      
    </div>
  );
}

export default App;
