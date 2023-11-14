import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateView = () => {
  const navigate = useNavigate();

  const [newSong, setNewSong] = useState({
    artist: "",
    song: "",
    rating: "",
  });

  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handleCreateClick = () => {
    setOpenCreateDialog(true);
  };

  const handleCreateClose = () => {
    setOpenCreateDialog(false);
  };

  const handleCreateSong = async () => {
    // fetch("http://localhost:80/index.php/music/create", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newSong),
    //   mode: 'cors',
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Create Song Response:", data);
    //     if (data.success) {
    //       console.log("Song created successfully");
    //     } else {
    //       console.error("Error creating song:", data.error);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error creating song:", error);
    //   });

    console.log("Sending data:", newSong);

    axios.post("http://localhost:80/index.php/music/create", newSong, {withCredentials: true}) .then((response) => {
      if (response.data.success) {
        navigate("/");
      } else {
        console.error(`Song not Created.`);
        console.log(response);
        // Handle registration failure, display an error message, etc.
      }
    })
    .catch((error) => {
      console.error("Error Logging in user:", error);
      // Handle registration error, display an error message, etc.
    });
    return;
  }
  const handleGoBackHome = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h5 style={styles.heading}>Create a New Song</h5>

      <label style={styles.label}>
        Artist:
        <input
          type="text"
          value={newSong.artist}
          onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Song:
        <input
          type="text"
          value={newSong.song}
          onChange={(e) => setNewSong({ ...newSong, song: e.target.value })}
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Rating:
        <input
          type="text"
          value={newSong.rating}
          onChange={(e) => setNewSong({ ...newSong, rating: e.target.value })}
          style={styles.input}
        />
      </label>

      <button style={styles.button} onClick={handleCreateClick}>
        Create Song
      </button>
      <button style={styles.button} onClick={handleGoBackHome}>
        Go Back Home
      </button>

      {openCreateDialog && (
        <div style={styles.dialog}>
          <h3 style={styles.dialogHeading}>Create New Song</h3>
          <p style={styles.dialogText}>
            Add new song?
          </p>
          <ul style={styles.dialogList}>
            <li>Artist: {newSong.artist}</li>
            <li>Song: {newSong.song}</li>
            <li>Rating: {newSong.rating}</li>
          </ul>
          <div style={styles.dialogButtons}>
            <button style={styles.dialogButton} onClick={handleCreateClose}>
              Cancel
            </button>
            <button style={styles.dialogButton} onClick={handleCreateSong}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
  },
  heading: {
    margin: "20px 0",
    fontSize: "28px",
    color: "#333",
    textAlign: "center",
  },
  label: {
    display: "block",
    margin: "10px 0",
    fontSize: "18px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
    transition: "border-color 0.3s ease",
    outline: "none",
  },
  button: {
    margin: "20px 0",
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "14px",
    cursor: "pointer",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    transition: "background-color 0.3s ease",
  },
  dialog: {
    display: "block",
    marginTop: "20px",
  },
  dialogHeading: {
    color: "#3498db",
  },
  dialogText: {
    marginBottom: "10px",
  },
  dialogList: {
    listStyleType: "none",
    padding: "0",
  },
  dialogButtons: {
    marginTop: "10px",
  },
  dialogButton: {
    marginRight: "10px",
    padding: "8px",
    cursor: "pointer",
  },
};

export default CreateView;

