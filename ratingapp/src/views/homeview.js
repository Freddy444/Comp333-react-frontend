import styles from './homeview.module.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";

// Component for rendering star ratings
function StarRating({ rating }) {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars >= 0.5 ? 1 : 0;

  // Generating stars based on the rating
  const stars = Array.from({ length: fullStars }, (_, i) => (
    <span key={i} role="img" aria-label="star" className={styles.star}>
      ⭐
    </span>
  ));

  // Adding a half-star if applicable
  if (halfStars === 1) {
    stars.push(
      <span key={fullStars} role="img" aria-label="half-star" className={styles.star}>
        🌟
      </span>
    );
  }

  // Adding empty stars to reach the maximum
  while (stars.length < maxStars) {
    stars.push(
      <span key={stars.length} role="img" aria-label="empty-star" className={styles.star}>
        ☆
      </span>
    );
  }

  return <span>{stars}</span>;
}

// Component for the home view
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

  // useEffect to fetch the song list and check user authentication
  useEffect(() => {
    const user = Cookies.get('name');
    if (user) {
      setLoggedInUser(user);
      fetchSongList(user);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Handler to open the create dialog
  const handleCreateClick = () => {
    setOpenCreateDialog(true);
  };

  // Function to fetch the song list
  const fetchSongList = (username) => {
    axios.get(`http://localhost:80/index.php/music/list`)
      .then((response) => {
        setSongList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching song list:", error);
      });
  };

  // Handler to create a new song
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

  // Filtered songs based on the artist
  const filteredSongs = songList.filter((song) =>
    artistFilter
      ? song.artist.toLowerCase().includes(artistFilter.toLowerCase())
      : true
  );

  // Toggle sorting order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Function to sort songs based on the rating and sorting order
  const sortSongs = (songs) => {
    return songs.slice().sort((a, b) => {
      const ratingA = parseFloat(a.rating);
      const ratingB = parseFloat(b.rating);
      return sortOrder === "asc" ? ratingA - ratingB : ratingB - ratingA;
    });
  };

  // Sorted songs based on filter, sort order, and rating
  const sortedSongs = sortSongs(filteredSongs);

  // Handler to logout the user
  const handleLogout = () => {
    Cookies.remove('name');
    navigate("/login");
  };

  // Handler to navigate to the create view
  const navigateToCreate = (e) => {
    e.preventDefault();
    navigate("/create", { replace: true });
  };

  // Rendering the home view
  return (
    <div className={styles.homeContainer}>
      {loggedInUser && (
        <>
          {/* Displaying user information and logout button */}
          <h6 className={styles.welcomeMessage}>
            Welcome, {loggedInUser}!
          </h6>
          <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </>
      )}
      {/* Button to toggle sorting order */}
      <button className={styles.sortButton} onClick={toggleSortOrder}>
        Sort by Rating ({sortOrder === "asc" ? "Low to High" : "High to Low"})
      </button>

      {/* List of songs with star ratings and update button */}
      <ul className={styles.songList}>
        {sortedSongs.map((song) => (
          <li key={song.id} className={styles.songItem}>
            <span>
              {song.song} - Artist: {song.artist}
            </span>
            <StarRating rating={song.rating} />
            {/* Display update button only for the owner of the song */}
            {loggedInUser === song.username && (
              <Link to={`/update/${song.id}`}>
                <button className={styles.updateButton}>
                  Update
                </button>
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Button to navigate to the create view */}
      <button
        className={styles.createButton}
        onClick={navigateToCreate}
      >
        Create Song
      </button>
    </div>
  );
}

// Export the component as the default export
export default HomeView;
