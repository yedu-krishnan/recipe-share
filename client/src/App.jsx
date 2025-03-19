import React from 'react'
import axios from 'axios'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import About from './components/About'
import Contact from './components/Contact'
import Register from './components/Register'
import Login from './components/Login'
import AddRecipe from './components/AddRecipe'
import Myrecipe from './components/Myrecipe'
import EditRecipe from './components/EditRecipe'
import FavRecipe from './components/FavRecipe'
import RecipeDetails from './components/RecipeDetails'


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/addrecipe" element={<AddRecipe/>}/>
      <Route path="/editrecipe/:id" element={<EditRecipe/>}/>
      <Route path="/myrecipe" element={<Myrecipe/>}/>
      <Route path="/favrecipe" element={<FavRecipe/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/recipe/:id" element={<RecipeDetails/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App


