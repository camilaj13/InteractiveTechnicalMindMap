// src/App.tsx

// 1. IMPORT the MindMap component
import MindMap from './components/MindMap';
// If App.tsx is in the root of src, and MindMap is in src/components

function App() {
  return (
    // 2. RENDER the MindMap component
    <div className="App">
      <MindMap />
    </div>
  );
}

export default App;
