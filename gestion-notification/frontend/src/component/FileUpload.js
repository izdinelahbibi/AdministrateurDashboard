import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [matiere, setMatiere] = useState('');
    const [classeId, setClasseId] = useState('');
    const [classes, setClasses] = useState([]);

    // Load classes from the API
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:3001/classes');
                setClasses(response.data);
            } catch (error) {
                console.error('Error fetching classes:', error);
                alert('Could not load classes.');
            }
        };
        fetchClasses();
    }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile || !classeId || !matiere) {
            alert('Please fill in all fields and select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('matiere', matiere);  // Added matiere field
        formData.append('classe_id', classeId);

        try {
            const response = await axios.post('http://localhost:3001/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Error during file upload:', error);
            alert('An error occurred during the upload.');
        }
    };

    const styles = {
        form: {
            maxWidth: '500px',
            margin: '50px auto',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        h2: {
            textAlign: 'center',
            fontSize: '1.5em',
            marginBottom: '20px',
            color: '#333',
        },
        div: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            fontSize: '1rem',
            marginBottom: '5px',
            color: '#555',
        },
        input: {
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
            transition: 'border-color 0.3s ease',
        },
        inputFocus: {
            borderColor: '#007bff',
            outline: 'none',
        },
        button: {
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        select: {
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
        }
    };

    return (
        <div>
            <h2 style={styles.h2}>Upload de fichier</h2>
            <form onSubmit={handleUpload} style={styles.form}>
                <div style={styles.div}>
                    <label style={styles.label}>Matière :</label>
                    <input
                        type="text"
                        value={matiere}
                        onChange={(e) => setMatiere(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.div}>
                    <label style={styles.label}>Classe :</label>
                    <select
                        value={classeId}
                        onChange={(e) => setClasseId(e.target.value)}
                        required
                        style={styles.select}
                    >
                        <option value="">-- Sélectionnez une classe --</option>
                        {classes.map((classe) => (
                            <option key={classe.name} value={classe.name}>
                                {classe.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={styles.div}>
                    <label style={styles.label}>Fichier :</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        required
                        style={styles.input}
                    />
                </div>
                <button
                    type="submit"
                    style={styles.button}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Uploader
                </button>
            </form>
        </div>
    );
};

export default FileUpload;
