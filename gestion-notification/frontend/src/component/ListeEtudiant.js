import React, { useState, useEffect } from 'react';
 
const ListeEtudiant = () => {
    const [users, setUsers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [newUser, setNewUser] = useState({ firstname: '', lastname: '', email: '', password: '', class: '' });
    const [loading, setLoading] = useState(false); // Pour gérer l'état de chargement

    // Fonction pour récupérer les utilisateurs
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/users');
            const data = await response.json();
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                console.error('Erreur : les données retournées ne sont pas un tableau', data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour récupérer les classes
    const fetchClasses = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/classes');
            const data = await response.json();
            setClasses(data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour ajouter un utilisateur
    const handleAddUser = async () => {
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });
            if (response.ok) {
                fetchUsers();  // Recharger la liste des utilisateurs
                setNewUser({ firstname: '', lastname: '', email: '', password: '', class: '' });
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    // Fonction pour supprimer un utilisateur
    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3001/users/${userId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchUsers();  // Recharger la liste des utilisateurs après suppression
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Fonction pour modifier un utilisateur
    const handleEditUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${currentUser.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentUser)
            });
            if (response.ok) {
                fetchUsers();  // Recharger la liste des utilisateurs après modification
                setCurrentUser(null);  // Réinitialiser l'utilisateur actuel
            }
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    // Chargement des utilisateurs et des classes au démarrage
    useEffect(() => {
        fetchUsers();
        fetchClasses();
    }, []);

    // Styles pour rendre le contenu scrollable
    const styles = {
        container: {
            maxHeight: '80vh', // Limiter la hauteur de la page à 80% de la hauteur de la fenêtre
            overflowY: 'auto', // Ajouter un défilement vertical si nécessaire
            padding: '20px',
            scrollBehavior: 'smooth', // Ajouter un effet de défilement doux
        },
        loading: {
            textAlign: 'center',
            fontSize: '20px',
            color: 'gray',
        },
        tableContainer: {
            marginTop: '20px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        tableHeader: {
            backgroundColor: '#f4f4f4',
        },
        tableCell: {
            border: '1px solid #ddd',
            padding: '8px',
        },
        button: {
            backgroundColor: '#007BFF',
            color: 'white',
            padding: '5px 10px',
            border: 'none',
            cursor: 'pointer',
            marginRight: '5px',
        },
        input: {
            marginBottom: '10px',
            padding: '8px',
            width: '200px',
            marginRight: '10px',
        },
        select: {
            padding: '8px',
            marginBottom: '10px',
            marginRight: '10px',
        },
    };




    if (loading) return <div style={styles.loading}>Chargement des données...</div>;

    return (
        <div style={styles.container}>
            <h2>Liste des Étudiants par Classe</h2>

            {classes.map((cls) => (
                <div key={cls.id} style={styles.tableContainer}>
                    <h3>Classe: {cls.name}</h3>
                    <table style={styles.table}>
                        <thead style={styles.tableHeader}>
                            <tr>
                                <th style={styles.tableCell}>Nom</th>
                                <th style={styles.tableCell}>Email</th>
                                <th style={styles.tableCell}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users
                                .filter((user) => user.class === cls.name)
                                .map((user) => (
                                    <tr key={user.id}>
                                        <td style={styles.tableCell}>{user.firstname} {user.lastname}</td>
                                        <td style={styles.tableCell}>{user.email}</td>
                                        <td style={styles.tableCell}>
                                            <button style={styles.button} onClick={() => setCurrentUser(user)}>Editer</button>
                                            <button style={styles.button} onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            ))}

            <h3>Ajouter un Nouvel Utilisateur</h3>
            <input
                type="text"
                placeholder="Prénom"
                style={styles.input}
                value={newUser.firstname}
                onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })}
            />
            <input
                type="text"
                placeholder="Nom"
                style={styles.input}
                value={newUser.lastname}
                onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                style={styles.input}
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Mot de Passe"
                style={styles.input}
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <select
                style={styles.select}
                value={newUser.class}
                onChange={(e) => setNewUser({ ...newUser, class: e.target.value })}
            >
                <option value="">Sélectionner une classe</option>
                {classes.map((cls) => (
                    <option key={cls.id} value={cls.name}>
                        {cls.name}
                    </option>
                ))}
            </select>
            <button style={styles.button} onClick={handleAddUser}>Ajouter</button>

            {currentUser && (
                <div>
                    <h3>Modifier l'Utilisateur</h3>
                    <input
                        type="text"
                        value={currentUser.firstname}
                        onChange={(e) => setCurrentUser({ ...currentUser, firstname: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        value={currentUser.lastname}
                        onChange={(e) => setCurrentUser({ ...currentUser, lastname: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="email"
                        value={currentUser.email}
                        onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Nouveau Mot de Passe"
                        value={currentUser.password || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                        style={styles.input}
                    />
                    <button style={styles.button} onClick={handleEditUser}>Mettre à jour</button>
                </div>
            )}
        </div>
    );
};

export default ListeEtudiant;
