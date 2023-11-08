import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './updateview.module.css'; // Import your CSS module

function UpdateView({ onClose, songId }) {
  const [updateData, setUpdateData] = useState({
    artist: "",
    song: "",
    rating: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch song details and update updateData when the component mounts
  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const response = await fetch(`http://localhost:80/index.php/music/read/${id}`);
        const data = await response.json();
        setUpdateData(data);
      } catch (error) {
      }
    };

    fetchSongDetails();
  }, [id]);

  useEffect(() => {
    const name = Cookies.get('name')
    if (!name) {
      navigate('/login')
    }
  }, [navigate]);

  const handleUpdate = () => {
    // Send a request to update the song with the provided data
    const payload = { ...updateData, "id": id };
    console.log(payload);
    fetch(`http://localhost:80/index.php/music/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(() => {
        console.log("response")
      })

    // After updating, you can close the dialog
    onClose();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Update Song</h1>
      <label className={styles.label}>
        Artist:
        <input
          type="text"
          value={updateData.artist}
          onChange={(e) => setUpdateData({ ...updateData, artist: e.target.value })}
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Song:
        <input
          type="text"
          value={updateData.song}
          onChange={(e) => setUpdateData({ ...updateData, song: e.target.value })}
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Rating:
        <input
          type="text"
          value={updateData.rating}
          onChange={(e) => setUpdateData({ ...updateData, rating: e.target.value })}
          className={styles.input}
        />
      </label>
      <button className={styles.button} onClick={() => navigate("/")}>Cancel</button>
      <button className={styles.button} onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default UpdateView;
