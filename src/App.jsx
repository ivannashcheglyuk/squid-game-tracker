import './App.css';
import React from 'react';
import { useRoutes, Link } from 'react-router-dom';
import ReadPlayers from './pages/ReadPlayers';
import CreatePlayer from './pages/CreatePlayer';
import EditPlayer from './pages/EditPlayer';
import PlayerDetail from './pages/PlayerDetail';  // import detail page

const App = () => {
  const descr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  // example data (optional)
  const players = [
    {
      id: '1',
      name: 'Player One',
      author: 'Author One',
      description: descr,
      status: 'Alive',
      role: 'Player',
    },
  ];

  // add player detail route here, no props passed since pages fetch data themselves
  const element = useRoutes([
    { path: '/', element: <ReadPlayers /> },
    { path: '/new', element: <CreatePlayer /> },
    { path: '/edit/:id', element: <EditPlayer /> },
    { path: '/player/:id', element: <PlayerDetail /> },  // <-- added detail route
  ]);

  return (
    <div className="App">
      <div className="header">
        <h1>🦑 Squid Game Tracker</h1>
        <Link to="/"><button className="headerBtn">All Players</button></Link>
        <Link to="/new"><button className="headerBtn">Add New</button></Link>
      </div>

      {element}
    </div>
  );
};

export default App;
