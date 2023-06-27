import './App.css';
import {
  TextBox,
  ChatInterface,
  NavBar
 } from './ui-components-personalized';



function App() {
  // Display the elements of the interface
  return (
    <div className="App">
      <NavBar />
      <ChatInterface />
    </div>
  );
}

export default App;
