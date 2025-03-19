import React, { useEffect, useState } from 'react';
import './style/Register.css';
import email from '../assets/email.png';
import password from '../assets/password.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditRecipe = () => {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();
  const {id} = useParams()

  useEffect(()=>{
    const getData = async()=>{
        await axios.get(`http://localhost:5000/recipe/${id}`)
        .then(response =>{
            let res= response.data
            setRecipeData({
                title: res.title,
                ingredients: res.ingredients.join(","),
                instructions: res.instructions,
                time: res.time
            })
        })
    }
    getData()
  },[])

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


    const userId = JSON.parse(atob(token.split(".")[1])).id;
    const formData = new FormData();
    for (const key in recipeData) {
      formData.append(key, recipeData[key]);
    }
    formData.append("userId", userId);

    await axios.put(`http://localhost:5000/recipe/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(() => navigate("/myrecipe"))
      .catch(error => console.error("Error adding recipe:", error));
  };

  return (
    <>
      <div className='reg-container'>
        <div className='reg-header'>
          <div className='signup'>Edit Recipe</div>
          <div className='reg-underline'></div>
        </div>
        <form onSubmit={onHandleSubmit} className='reg-inputs'>
          <div className='reg-input'>
            <img src={email} alt="" />
            <input type="text" placeholder='title' name='title' onChange={onHandleChange} value={recipeData.title}/>
          </div>

          <div className='reg-input'>
            <img src={email} alt="" />
            <input type="text" placeholder='time' name='time' onChange={onHandleChange} value={recipeData.time}/>
          </div>

          <div className='reg-input'>
            <img src={email} alt="" />
            <textarea type="text" placeholder='ingredients' name='ingredients' rows="5" onChange={onHandleChange} value={recipeData.ingredients}/>
          </div>

          <div className='reg-input'>
            <img src={email} alt="" />
            <textarea type="text" placeholder='instructions' name='instructions' rows="5" onChange={onHandleChange} value={recipeData.instructions}/>
          </div>

          <div className='reg-input'>
            <img src={email} alt="" />
            <input type="file" name='file' onChange={onHandleChange} />
          </div>
          <div className="submit-container">
            <button type="submit" className='submit'>Edit Recipe</button>
          </div>
        </form>
      </div>
      <br /><br /><br /><br />
    </>
  );
};

export default EditRecipe;