// Form.jsx
import "../style/form.css";
import React, { useState, useEffect } from "react";
import AlertModal from "../AlertModal.jsx";
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Form = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errResponse, setErrResponse] = useState();
  const [formData, setFormData] = useState({
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    telepon: "",
    whatsapp: "",
    email: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // This gets the id parameter from the URL

  // Fetch user data for update
  useEffect(() => {
    if (id) {
      // If id is present in URL params, fetch user data for update
      fetchUserData(id);
    }
  }, [id]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      setFormData(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Handle form changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const goBack = () => {
    navigate(-1);
  };

  // Validate form from any wrong input
  const validateForm = () => {
    const phonePattern = /^(\+62|62|0)8\d{8,11}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phonePattern.test(formData.whatsapp)) {
      setAlertMessage("Please enter a valid WhatsApp number.");
      setShowAlert(true);
      return false;
    }

    if (!emailPattern.test(formData.email)) {
      setAlertMessage("Please enter a valid email address.");
      setShowAlert(true);
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setErrResponse(false);

    const apiUrl = id ? `http://localhost:3000/user/${id}` : 'http://localhost:3000/user';

    const options = {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const getResponse = await fetch(apiUrl, options);
      const dataResponse = await getResponse.json();
      if (getResponse.ok) {
        setAlertMessage(dataResponse.message);
        setErrResponse(true);
      } else {
        setAlertMessage(dataResponse.message);
      }
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleAlertExit = () => {
    window.location.reload(false);
  };

  return (
    <div>
      <header className="formHeader">
        <button className="backButton" onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="wordHead">
          <h1 className="headItem-1">Huawei Tech Investment</h1>
          <p className="headItem-2">{id ? 'Update User' : 'User Registration'}</p>
        </div>
      </header>
      <div>
        <form id="formSubmit" onSubmit={handleSubmit}>
          <div className="formBody">
            <div className="inputArea">
              <div>
                <h2>Data Personal</h2>
                <div className="inputSection personalBox">
                  <div className="inputSubSection">
                    <label htmlFor="nama">Nama Lengkap</label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      className="inputBox"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="inputSubSection">
                    <label htmlFor="tempat_lahir">Kota Tempat Lahir</label>
                    <input
                      type="text"
                      name="tempat_lahir"
                      value={formData.tempat_lahir}
                      className="inputBox"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inputSubSection">
                    <label htmlFor="tanggal_lahir">Tanggal Lahir</label>
                    <input
                      type="date"
                      name="tanggal_lahir"
                      value={formData.tanggal_lahir}
                      className="inputBox"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inputSubSection">
                    <label htmlFor="jenis_kelamin">Jenis Kelamin</label>
                    <select
                      name="jenis_kelamin"
                      value={formData.jenis_kelamin}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled hidden></option>
                      <option value="laki">Laki-laki</option>
                      <option value="perempuan">Perempuan</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <h2>Kontak</h2>
                <div className="inputSection contactBox">
                  <div className="inputSubSection">
                    <label htmlFor="telepon">Nomor Telepon</label>
                    <input
                      type="text"
                      id="telepon"
                      name="telepon"
                      value={formData.telepon}
                      className="inputBox"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inputSubSection">
                    <label htmlFor="whatsapp">Nomor WhatsApp</label>
                    <input
                      type="text"
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      className="inputBox"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="inputSubSection">
                    <label htmlFor="email">Alamat Email</label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      className="inputBox"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="buttonArea">
              <button type="submit" className="submitButton">
                {id ? 'Update' : 'Daftar'}
              </button>
              <AlertModal
                open={showAlert}
                onClose={handleAlertClose}
                message={errResponse}
                alertMessage={alertMessage}
                onExited={handleAlertExit}
                id={id ? true : false}
              />
              <p className="warning">
              {id ? '* Pastikan data yang dimasukan benar sebelum menekan tombol update' : '* Pastikan data yang dimasukan benar sebelum menekan tombol daftar'}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
