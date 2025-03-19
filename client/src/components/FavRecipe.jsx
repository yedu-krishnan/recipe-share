import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import './style/Home.css'

const FavRecipes = () => {
  const [favItems, setFavItems] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"))
    setUser(loggedInUser)

    if (loggedInUser) {
      const userFavs = JSON.parse(localStorage.getItem(`fav_${loggedInUser._id}`)) ?? []
      setFavItems(userFavs)
    }
  }, [])


  const unlikeRecipe = (recipeId) => {
    if (!user) return

   
    const updatedFavs = favItems.filter((fav) => fav._id !== recipeId)
    setFavItems(updatedFavs)
    localStorage.setItem(`fav_${user._id}`, JSON.stringify(updatedFavs)) 
  }

  return (
    <section className="blog-section">
      <div className="container">
        <h2>My Favorite Recipes</h2>
        {user ? (
          <div className="blog-list">
            {favItems.length > 0 ? (
              favItems.map((food, index) => (
                <div className="blog-card" key={index}>
                  <img src={`http://localhost:5000/images/${food.coverImage}`} alt={food.title} className="blog-image" />
                  <div className="blog-content">
                    <span className="blog-date">{food.time}</span>
                    <h3 className="blog-title">{food.title}</h3>
                    

                    <div className="icon-container">
                      <Link to={`/recipe/${food._id}`} className="view-button">View Recipe</Link>
                      <FaHeart 
                        className="icon like-icon liked" 
                        onClick={() => unlikeRecipe(food._id)} 
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No favorite recipes yet.</p>
            )}
          </div>
        ) : (
          <p>Please log in to view your favorite recipes.</p>
        )}
      </div>
    </section>
  )
}

export default FavRecipes
