import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const NotesUploadPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [notes, setNotes] = useState([]);
  const [userId, setUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fonction pour ajouter une note
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/api/notes", data);

      if (response.status === 200) {
        setSuccessMessage("La note a été ajoutée avec succès.");
        reset();
      }
    } catch (error) {
      setErrorMessage("Une erreur s'est produite lors de l'ajout de la note.");
    }
  };

  // Récupérer les notes d'un étudiant
  const fetchNotes = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/notes/${userId}`);
      setNotes(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des notes:", error);
      setErrorMessage("Impossible de récupérer les notes.");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotes(userId);
    }
  }, [userId]);

  return (
    <div>
      <h1>Gestion des Notes</h1>

      {/* Formulaire pour ajouter une note */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>User ID</label>
          <input
            type="number"
            {...register("userId", { required: true })}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div>
          <label>Note</label>
          <input type="number" step="0.01" {...register("note", { required: true })} />
        </div>

        <div>
          <label>Subject</label>
          <input type="text" {...register("subject", { required: true })} />
        </div>

        <button type="submit">Ajouter la note</button>
      </form>

      {/* Affichage des messages */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* Liste des notes */}
      {userId && (
        <div>
          <h2>Notes de l'étudiant {userId}</h2>
          <ul>
            {notes.map((note) => (
              <li key={note.id}>
                {note.subject}: {note.note} - {note.created_at}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotesUploadPage;
