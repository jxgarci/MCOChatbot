import './App.css';
import {
  TextBox,
  ChatInterface,
  NavBar
 } from './ui-components-personalized';



function App() {
  // Set the messages array in the local storage
  localStorage.setItem('messages', JSON.stringify([]));

  // Display the elements of the interface
  return (
    <div className="App">
      <NavBar />
      <ChatInterface />
    </div>
  );
}

export default App;
