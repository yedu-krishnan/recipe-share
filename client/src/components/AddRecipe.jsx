import React, { useState } from 'react';
import './style/Register.css';
import email from '../assets/email.png';
import password from '../assets/password.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    let val = (e.target.name === "ingredients") ? e.target.value.split(",") : (e.target.name === "file") ? e.target.files[0] : e.target.value;
    setRecipeData(pre => ({ ...pre, [e.target.name]: val }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); 
      return;
    }

    // Decode JWT to get user ID
    const userId = JSON.parse(atob(token.split(".")[1])).id;
    const formData = new FormData();
    for (const key in recipeData) {
      formData.append(key, recipeData[key]);
    }
    formData.append("userId", userId);

    await axios.post('http://localhost:5000/recipe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(() => navigate("/"))
      .catch(error => console.error("Error adding recipe:", error));
  };

  return (
    <>
      <div className='reg-container'>
        <div className='reg-header'>
          <div className='signup'>Add Recipe</div>
          <div className='reg-underline'></div>
        </div>
        <form onSubmit={onHandleSubmit} className='reg-inputs'>
          <div className='reg-input'>
            <img src={email} alt="" />
            <input type="text" placeholder='title' name='title' onChange={onHandleChange} />
          </div>

          <div className='reg-input'>
            <img src={email} alt="" />
            <input type="text" placeholder='time' name='time' onChange={onHandleChange} />
          </div>

          <div className='reg-input'>
            <img src={email} alt="" />
            <textarea type="text" placeholder='ingredients' name='ingredients' rows="5" onChange={onHandleChange} />
          </div>

          <div className='reg-input'>
            <img src={email} alt="" />
            <textarea type="text" placeholder='instructions' name='instructions' rows="5" onChange={onHandleChange} />
          </div>

          <div className='reg-input'>
            <img src={email} alt="" />
            <input type="file" name='file' onChange={onHandleChange} />
          </div>
          <div className="submit-container">
            <button type="submit" className='submit'>Add Recipe</button>
          </div>
        </form>
      </div>
      <br /><br /><br /><br />
    </>
  );
};

export default AddRecipe;