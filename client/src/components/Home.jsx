import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import foodbanner from '../assets/foodbanner.png'
import './style/Home.css'

const Home = () => {
  const [foods, setFoods] = useState([])
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(null)
  const [favItems, setFavItems] = useState([])
  const navigate = useNavigate() 

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"))
    setUser(loggedInUser)

    if (loggedInUser) {
      const userFavs = JSON.parse(localStorage.getItem(`fav_${loggedInUser._id}`)) ?? []
      setFavItems(userFavs)
    }
  }, [])

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/recipe')
        setFoods(response.data)
      } catch (error) {
        console.error('Error fetching recipes:', error)
      }
    }

    fetchRecipes()
  }, [])

  const favRecipe = (food) => {
    if (!user) {
      alert("You need to log in to like recipes!")
      return
    }

    let updatedFavs = [...favItems]
    if (favItems.some((fav) => fav._id === food._id)) {
      updatedFavs = favItems.filter((fav) => fav._id !== food._id)
    } else {
      updatedFavs.push(food)
    }

    setFavItems(updatedFavs)
    localStorage.setItem(`fav_${user._id}`, JSON.stringify(updatedFavs))
  }

  const filteredFoods = foods.filter((food) =>
    food.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className='banner'>
        <img src={foodbanner} alt="Food Banner" className='food-banner' />
      </div>

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
             
                    <h3 
                      className="blog-title"
                      onClick={() => navigate(`/recipe/${food._id}`)}
                      style={{ cursor: "pointer"}}
                    >
                      {food.title}
                    </h3>

                    <div className="icon-container">
                      <FaHeart 
                        className={`icon like-icon ${favItems.some((fav) => fav._id === food._id) ? 'liked' : ''}`} 
                        onClick={() => favRecipe(food)} 
                      />
                      <button className='seerecipe'  onClick={() => navigate(`/recipe/${food._id}`)}>View Recipe</button>
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
  )
}

export default Home
