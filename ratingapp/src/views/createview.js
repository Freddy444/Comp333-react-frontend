import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateView() {
  const navigate = useNavigate(); // Use useNavigate for navigation

  // State to store the new song data
  const [newSong, setNewSong] = useState({
    artist: "",
    song: "",
    rating: "",
  });

  // State to control the visibility of the create dialog
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  // Handler to open the create dialog
  const handleCreateClick = () => {
    setOpenCreateDialog(true);
  };

  const handleCreateClose = () => {
    console.log("Create dialog closed");
    setOpenCreateDialog(false);
  };

  // Handler to create a new song
  const handleCreateSong = async () => {
    // Send a request to create the new song
    fetch("http://localhost:80/index.php/music/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSong),
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Create Song Response:", data);
        if (data.success) {
          console.log("Song created successfully");
        } else {
          console.error("Error creating song:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error creating song:", error);
      });
  };

  const handleGoBackHome = () => {
    navigate("/"); // Use the push method to navigate to the home route
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
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
  },
  heading: {
    margin: "20px 0",
  },
  label: {
    display: "block",
    margin: "10px 0",
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "5px 0",
  },
  button: {
    margin: "20px 0",
    backgroundColor: "blue",
    color: "white",
    padding: "10px",
    cursor: "pointer",
  },
  dialog: {
    display: "block",
    marginTop: "20px",
  },
  dialogHeading: {
    color: "blue",
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
