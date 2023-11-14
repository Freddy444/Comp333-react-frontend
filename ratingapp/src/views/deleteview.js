import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './updateview.module.css'; 
import axios from "axios";

function DeleteSong({ onClose, songId }) {
  const [updateData, setUpdateData] = useState({
    id: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

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

  const handleDelete = (event) => {
    event.preventDefault();
    console.log(id);
    axios.post("http://localhost:80/index.php/music/delete",{id : id}, {withCredentials: true}).then(
        (response) => {
            console.log(response);
            if (response.data.success) {
              navigate("/");
            }
            else {
              console.error(`Song not Deleted.`);
              console.log(response);
              console.log ("FUCCCCCKKKKKK");
            }
        }
    )
    
  };


  return (
    <div className={styles.container}>
    <h1 className={styles.heading}>Delete Song</h1>
        <button className={styles.button} onClick={() => navigate("/")}>Cancel</button>
    <button className={styles.button} onClick={handleDelete}>Delete</button>
  </div>
  );
}

export default DeleteSong;
