import "../style/list.css";
import React, { useEffect, useState } from 'react';
import AlertModal from "../AlertModal.jsx";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const List = () => {

    const [users, setUsers] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [errResponse, setErrResponse] = useState();
    const navigate = useNavigate();

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Fetch users from API
    const fetchUsers = () => {
        fetch('http://localhost:3000/user')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    };

    // Navigate to previous page
    const goBack = () => {
        navigate(-1);
    };

    // Delete user
    const handleDelete = async (id) => {
        try {
            const getResponse = await fetch(`http://localhost:3000/user/${id}`, { method: 'DELETE' });
            const dataResponse = await getResponse.json();
            if (getResponse.ok) {
                fetchUsers(); // Re-fetch users after deleting user
            } else {
                setAlertMessage(dataResponse.message);
            }
        } catch (error) {
            setAlertMessage(error.message);
            setShowAlert(true);
        }
    };

    // Update user
    const handleUpdate = (id) => {
        navigate(`/form/${id}`);
    };

    // Alert modal
    const handleAlertClose = () => {
        setShowAlert(false);
    };

    // Exit modal
    const handleAlertExit = () => {
        fetchUsers();  // Re-fetch users after closing the alert
    };

    return (
        <div>
            <header className="formHeader">
                <button className="backButton" onClick={goBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className="wordHead">
                    <h1 className="headItem-1">Huawei Tech Investment</h1>
                    <p className="headItem-2">User List</p>
                </div>
            </header>
            <div className="containerList">
                <div className="userList">
                    {users.map(user => (
                        <div key={user._id} className="userItem">
                            <span>{user.nama}</span>
                            <button className="editButton" onClick={() => handleUpdate(user._id)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="deleteButton" onClick={() => handleDelete(user._id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <AlertModal
                open={showAlert}
                onClose={handleAlertClose}
                message={errResponse}
                alertMessage={alertMessage}
                onExited={handleAlertExit}
            />
        </div>
    );
};

export default List;
