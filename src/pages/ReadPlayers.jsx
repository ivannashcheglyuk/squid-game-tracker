// src/pages/ReadPlayers.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import PlayerCard from '../components/PlayerCard';
import './ReadPlayer.css';



const ReadPlayers = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase
        .from('Players')     // Make sure your table name is 'Players'
        .select()
        .order('created_at', { ascending: false });


      if (error) {
        console.error('Error fetching players:', error);
      } else {
        setPlayers(data);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="player-list">
      {players.length > 0 ? (
        players.map(player => (
          <PlayerCard
            key={player.id}
            id={player.id}
            name={player.name}
            author={player.author}
            status={player.status}
            role={player.role}
            description={player.description}
          />
        ))
      ) : (
        <h2>No Players Found 😞</h2>
      )}
    </div>
  );
};

export default ReadPlayers;
