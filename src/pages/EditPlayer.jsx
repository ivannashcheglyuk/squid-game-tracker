import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './EditPlayer.css';

const EditPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState({
    name: '',
    author: '',
    status: '',
    role: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      const { data, error } = await supabase
        .from('Players')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching player:', error);
        alert('Failed to fetch player data.');
      } else {
        setPlayer({
          name: data.name || '',
          author: data.author || '',
          status: data.status || '',
          role: data.role || '',
          description: data.description || '',
        });
      }
      setLoading(false);
    };

    if (id) fetchPlayer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!player.name || !player.author || !player.description) {
      alert('Please fill out all required fields: Name, Author, Description.');
      return;
    }

    const { error } = await supabase
      .from('Players')
      .update({
        name: player.name,
        author: player.author,
        status: player.status,
        role: player.role,
        description: player.description,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating player:', error);
      alert('Failed to update player.');
    } else {
      navigate('/');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!window.confirm('Are you sure you want to delete this player?')) {
      return;
    }

    const { error } = await supabase
      .from('Players')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting player:', error);
      alert('Failed to delete player.');
    } else {
      navigate('/');
    }
  };

  if (loading) return <p>Loading player data...</p>;

  return (
    <div className="edit-player">
      <h2>Edit Player</h2>
      <form onSubmit={handleUpdate}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={player.name}
          onChange={handleChange}
          placeholder="Player's name"
        />

        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={player.author}
          onChange={handleChange}
          placeholder="Your name"
        />

        <label>Role:</label>
        <select name="role" value={player.role} onChange={handleChange}>
          <option value="">Select role</option>
          <option value="Leader">Leader</option>
          <option value="Guard">Guard</option>
          <option value="Player">Player</option>
        </select>

        <label>Status:</label>
        <select name="status" value={player.status} onChange={handleChange}>
          <option value="">Select status</option>
          <option value="Alive">Alive</option>
          <option value="Eliminated">Eliminated</option>
        </select>

        <label>Description:</label>
        <textarea
          name="description"
          value={player.description}
          onChange={handleChange}
          placeholder="Tell us more about this player..."
          rows={5}
        />

        <div className="buttons">
          <button type="submit">Update Player</button>
          <button className="delete-button" onClick={handleDelete}>
            Delete Player
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPlayer;
