import { useState } from 'react';
import terminalLogo from '/terminal.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <img src={terminalLogo} className="logo" alt="Igor Dzichkovskii personal logo" />
      </div>
      <h1>News App</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
