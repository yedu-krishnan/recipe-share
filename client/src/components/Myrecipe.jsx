import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaEdit, FaTrash } from 'react-icons/fa'

import { useNavigate, Link } from "react-router-dom";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('') 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          navigate("/login");
          return;
        }

        const res = await axios.get("http://localhost:5000/recipe");
        const userRecipes = res.data.filter((recipe) => recipe.createdBy === user._id);
        setRecipes(userRecipes);
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    };

    fetchUserRecipes();
  }, [navigate]);

  const handleDelete = async(id) =>{
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if(!confirmDelete) return;

    try{
      await axios.delete(`http://localhost:5000/recipe/${id}`)
      alert("Recipe deleted successfully!");
      window.location.reload();
    }catch(err){
      console.error("Error deleting recipe:", err);
      alert("Failed to delete")
    }
  }

  const filteredFoods = recipes.filter((food) =>
    food.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
    <div>
        <input 
          type="text" 
          placeholder="Search" 
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <section className="blog-section">
        <div className="container">
          <div className="blog-list">
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food, index) => (
                <div className="blog-card" key={index}>
                  <img src={`http://localhost:5000/images/${food.coverImage}`} alt={food.title} className="blog-image" />
                  <div className="blog-content">
                    <span className="blog-date">{food.time}</span>
                    <h3 className="blog-title">{food.title}</h3>

                    <div className="icon-container">
                      <FaHeart 
                        className={`icon like-icon ${food.liked ? 'liked' : ''}`} 
                        onClick={() => handleLike(food.id)} 
                      />
                      <Link to={`/editrecipe/${food._id}`}><FaEdit className="icon edit-icon" onClick={() => handleEdit(food.id)} /></Link>
                      <FaTrash className="icon delete-icon" onClick={() => handleDelete(food._id)} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No recipes found</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyRecipes;
