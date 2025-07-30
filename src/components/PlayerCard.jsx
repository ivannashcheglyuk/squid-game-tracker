

import { Link } from 'react-router-dom';
import './PlayerCard.css';

const PlayerCard = ({ id, name, author, status, role, description }) => {
  return (
    <div className="player-card">
      {/* Clicking name goes to detail */}
      <Link to={`/player/${id}`}>
        <h2 className="player-name">{name}</h2>
      </Link>

      <h3 className="player-author">by {author}</h3>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Role:</strong> {role}</p>
      <p className="player-description">{description}</p>

      {/* Edit button goes to edit */}
      <Link to={`/edit/${id}`}>
        <button className="edit-button">Edit</button>
      </Link>
    </div>
  );
};

export default PlayerCard;
