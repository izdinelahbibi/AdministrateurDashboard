import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaUpload, FaFileAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import FileUpload from './FileUpload';
import NotesUploadPage from './NotesUploadPage';
import ProfileSettings from './ProfilSetting';
import ListeEtudiant from './ListeEtudiant';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activePage, setActivePage] = useState('');
    const [classes, setClasses] = useState([]);
    const [admin] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    // Toggle sidebar
    const toggleSidebar = () => setIsOpen(!isOpen);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/');
    };

    // Fetch classes from API
    const fetchClasses = async () => {
        try {
            const response = await fetch('http://localhost:3001/classes');
            const data = await response.json();
            if (Array.isArray(data)) {
                setClasses(data);
            } else {
                console.error('Les données récupérées ne sont pas un tableau:', data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des classes:', error);
        }
    };

    // Handle page change
    const handlePageChange = (page) => {
        setActivePage(page);
        if (page === 'upload') fetchClasses(); // Load classes only for the 'upload' page
    };

    // Sidebar navigation
    const sidebarOptions = [
        { key: 'users', label: "Liste d'Étudiants", icon: <FaUser />, component: <ListeEtudiant classes={classes} /> },
        { key: 'upload', label: 'Upload Cours / Emploi', icon: <FaUpload />, component: <FileUpload /> },
        { key: 'notesUpload', label: 'Upload Notes', icon: <FaFileAlt />, component: <NotesUploadPage /> },
        { key: 'profileSettings', label: 'Profil Administrateur', icon: <FaCog />, component: <ProfileSettings admin={admin} /> },
    ];

    return (
        <div className="dashboard">
            {/* Navbar */}
            <div className="navbar">
                <span className="menu-icon" onClick={toggleSidebar}>&#9776;</span>
                <h1>Admin Dashboard</h1>
            </div>

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <h2>Panneau d'administration</h2>
                <ul>
                    {sidebarOptions.map(({ key, label, icon }) => (
                        <li key={key} onClick={() => handlePageChange(key)}>
                            {icon} {label}
                        </li>
                    ))}
                    <li onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>
                        <FaSignOutAlt /> Logout
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {activePage === '' && (
                    <div>
                        <h1>Bienvenue dans le tableau de bord admin</h1>
                        <p>Sélectionnez une option dans le menu latéral pour commencer.</p>
                    </div>
                )}
                {sidebarOptions.map(({ key, component }) =>
                    activePage === key ? <React.Fragment key={key}>{component}</React.Fragment> : null
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
