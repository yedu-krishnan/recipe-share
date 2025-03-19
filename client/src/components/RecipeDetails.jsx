import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style/RecipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipe/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);

    fetchRecipe();
  }, [id]);

  const handleAddComment = async () => {
    if (!user) {
      alert("You need to log in to comment!");
      return;
    }

    if (newComment.trim() === "") return;

    const commentData = {
      recipeId: id,
      text: newComment,
      createdBy: user._id,
      username: user.username,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/comments",
        commentData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId, commentUserId) => {
    if (!user || user._id !== commentUserId) {
      alert("You can only delete your own comments!");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (!recipe) {
    return <p>Loading recipe...</p>;
  }

  return (
    <div className="recipe-details">
      <img
        src={`http://localhost:5000/images/${recipe.coverImage}`}
        alt={recipe.title}
        className="recipe-image"
      />
      <h1>{recipe.title}</h1>
      <p>
        <strong>Time:</strong> {recipe.time}
      </p>
      <h2>Ingredients</h2>
      <ol>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
      <h2>Instructions</h2>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetails;
