import styles from './homeview.module.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";

function StarRating({ rating }) {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars >= 0.5 ? 1 : 0;

  const stars = Array.from({ length: fullStars }, (_, i) => (
    <span key={i} role="img" aria-label="star" className={styles.star}>
      ⭐
    </span>
  ));

  if (halfStars === 1) {
    stars.push(
      <span key={fullStars} role="img" aria-label="half-star" className={styles.star}>
        🌟
      </span>
    );
  }

  while (stars.length < maxStars) {
    stars.push(
      <span key={stars.length} role="img" aria-label="empty-star" className={styles.star}>
        ☆
      </span>
    );
  }

  return <span>{stars}</span>;
}

function HomeView() {
  const [songList, setSongList] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newSong, setNewSong] = useState({
    artist: "",
    song: "",
    rating: "",
  });
  const [artistFilter, setArtistFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const navigate = useNavigate();

  useEffect(() => {
    const user = Cookies.get('name');
    if (user) {
      setLoggedInUser(user);
      fetchSongList(user);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleCreateClick = () => {
    setOpenCreateDialog(true);
  };

  const fetchSongList = (username) => {
    axios.get(`http://localhost:80/index.php/music/list`)
      .then((response) => {
        setSongList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching song list:", error);
      });
  };

  const handleCreateSong = (event) => {
    axios.post("http://localhost:80/index.php/music/create", {
      artist: newSong.artist,
      song: newSong.song,
      rating: newSong.rating,
    })
      .then((response) => {
        console.log("Song created successfully");
        return axios.get("http://localhost:80/index.php/music/list");
      })
      .then((response) => {
        console.log("Fetched song list:", response.data);
        setSongList(response.data);
        setOpenCreateDialog(false);
      })
      .catch((error) => {
        console.error("Error creating or fetching song list:", error);
      });
  };

  const filteredSongs = songList.filter((song) =>
    artistFilter
      ? song.artist.toLowerCase().includes(artistFilter.toLowerCase())
      : true
  );

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortSongs = (songs) => {
    return songs.slice().sort((a, b) => {
      const ratingA = parseFloat(a.rating);
      const ratingB = parseFloat(b.rating);
      return sortOrder === "asc" ? ratingA - ratingB : ratingB - ratingA;
    });
  };

  const sortedSongs = sortSongs(filteredSongs);

  const handleLogout = () => {
    Cookies.remove('name');
    navigate("/login");
  };

  const navigateToCreate = (e) => {
    e.preventDefault();
    navigate("/create", { replace: true });
  };

  return (
    <div className={styles.homeContainer}>
      {loggedInUser && (
        <>
          <h6 className={styles.welcomeMessage}>
            Welcome, {loggedInUser}!
          </h6>
          <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </>
      )}
      <button className={styles.sortButton} onClick={toggleSortOrder}>
        Sort by Rating ({sortOrder === "asc" ? "Low to High" : "High to Low"})
      </button>

      <ul className={styles.songList}>
        {sortedSongs.map((song) => (
          <li key={song.id} className={styles.songItem}>
            <span>
              {song.song} - Artist: {song.artist}
            </span>
            <StarRating rating={song.rating} />
            {loggedInUser === song.username && (
              <div>
              <Link to={`/update/${song.id}`}>
                <button className={styles.updateButton}>
                  Update
                </button>
              </Link>
              <Link to={`/delete/${song.id}`}>
                <button className={styles.updateButton}>
                  Delete
                </button>
              </Link>
              </div>
              
            )}
          </li>
        ))}
      </ul>

      <button
        className={styles.createButton}
        onClick={navigateToCreate}
      >
        Create Song
      </button>
    </div>
  );
}

export default HomeView;

