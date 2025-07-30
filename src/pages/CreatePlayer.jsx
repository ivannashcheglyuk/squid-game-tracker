import { useState } from 'react';
import { supabase } from '../client';
import './CreatePlayer.css';

const CreatePlayer = () => {
  const [player, setPlayer] = useState({
    name: '',
    author: '',
    status: '',
    role: '',
    description: '',
    age: '',
    skill: '',
  });

  const handleChange = (e) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic required fields check
    if (!player.name || !player.author || !player.description) {
      alert('Please fill out Name, Author, and Description.');
      return;
    }

    const { data, error } = await supabase
      .from('Players')
      .insert([
        {
          name: player.name,
          author: player.author,
          status: player.status,
          role: player.role,
          description: player.description,
          age: player.age,
          skill: player.skill,
        },
      ]);

    if (error) {
      console.error('Error inserting player:', error.message, error.details);
      alert(`Failed to create player: ${error.message}`);
    } else {
      // Redirect to home page after successful creation
      window.location = '/';
    }
  };

  return (
    <div className="create-player">
      <h2>Create New Player</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={player.name}
          onChange={handleChange}
          placeholder="Player's name"
        />

        <label>Author</label>
        <input
          type="text"
          name="author"
          value={player.author}
          onChange={handleChange}
          placeholder="Your name"
        />

        <label>Role</label>
        <select name="role" value={player.role} onChange={handleChange}>
          <option value="">Select role</option>
          <option value="Leader">Leader</option>
          <option value="Guard">Guard</option>
          <option value="Player">Player</option>
        </select>

        <label>Status</label>
        <select name="status" value={player.status} onChange={handleChange}>
          <option value="">Select status</option>
          <option value="Alive">Alive</option>
          <option value="Eliminated">Eliminated</option>
        </select>

        <label>Description</label>
        <textarea
          name="description"
          value={player.description}
          onChange={handleChange}
          placeholder="Tell us about the player..."
          rows="5"
        ></textarea>

        <label>Age</label>
        <input
          type="number"
          name="age"
          value={player.age}
          onChange={handleChange}
          placeholder="Player's age"
        />

        <label>Skill</label>
        <input
          type="text"
          name="skill"
          value={player.skill}
          onChange={handleChange}
          placeholder="Player's skill"
        />

        <button type="submit">Create Player</button>
      </form>
    </div>
  );
};

export default CreatePlayer;

