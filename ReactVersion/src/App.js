import logo from './logo.svg';
import './App.css';
import './App.scss';
import Notes from './Notes';

function App() {
  return (
    <main>
      <article>
        <div className="App">
          <Notes />
          <header className="App-header">
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </article>
    </main>
  );
}

export default App;
