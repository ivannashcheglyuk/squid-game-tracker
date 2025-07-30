import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './PlayerDetail.css';

const PlayerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      const { data, error } = await supabase
        .from('Players')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching player:', error);
        alert('Player not found');
        navigate('/'); // go back to home if not found
      } else {
        setPlayer(data);
      }
      setLoading(false);
    };

    fetchPlayer();
  }, [id, navigate]);

  if (loading) return <p>Loading player details...</p>;
  if (!player) return null;

  return (
    <div className="player-detail">
      <h1>{player.name}</h1>
      <p><strong>Author:</strong> {player.author}</p>
      <p><strong>Status:</strong> {player.status}</p>
      <p><strong>Role:</strong> {player.role}</p>
      <p><strong>Description:</strong></p>
      <p>{player.description}</p>

      {/* Link to edit page */}
      <Link to={`/edit/${player.id}`}>
        <button>Edit Player</button>
      </Link>
    </div>
  );
};

export default PlayerDetail;


