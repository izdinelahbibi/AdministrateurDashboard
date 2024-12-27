import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import du hook useParams

const ProfilSetting = () => {
  const { id } = useParams(); // Récupère l'id du profil depuis l'URL

  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction fetchAdminData incluse dans useEffect
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/admin/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAdminData({
            name: data.name,
            email: data.email,
            password: data.password,
          });
        } else {
          throw new Error('Erreur lors de la récupération des données');
        }
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des données');
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [id]); // Dépend de id (qui provient de useParams)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/admin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });

      if (response.ok) {
        alert('Les informations ont été mises à jour');
      } else {
        alert('Erreur lors de la mise à jour des informations');
      }
    } catch (err) {
      alert('Erreur lors de la mise à jour des informations');
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Modifier les informations du profil</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom</label>
          <input
            type="text"
            name="name"
            value={adminData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={adminData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={adminData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default ProfilSetting;
