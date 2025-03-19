import React from 'react'
import './style/About.css'

const About = () => {
    const blogs = [
        {
          date: "Mar 10, 2024",
          title: "5 Easy One-Pot Meals for Busy Weeknights",
          image: "https://images.pexels.com/photos/708488/pexels-photo-708488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          description: "Discover quick and delicious one-pot meals to make your weeknight dinners hassle-free!",
        },
        {
          date: "Feb 28, 2024",
          title: "Baking Tips: How to Make the Perfect Cake Every Time",
          image: "https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          description: "Learn expert baking tips to ensure your cakes turn out moist, fluffy, and absolutely delicious!",
        },
        {
          date: "Jan 15, 2024",
          title: "10 Must-Try International Dishes You Can Cook at Home",
          image: "https://images.pexels.com/photos/5562924/pexels-photo-5562924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          description: "Explore flavors from around the world with these easy-to-follow international recipes!",
        },
      ];
    
      return (
        <section className="blog-section">
          <div className="container">
            <div className="header">
              <span className="subtitle">Cook Craze</span>
              <h2>Delicious Recipes & Cooking Tips</h2>
              <p>
                Explore a variety of mouth-watering recipes and expert cooking tips to enhance your culinary skills.
              </p>
            </div>
            <div className="blog-list">
              {blogs.map((blog, index) => (
                <div className="blog-card" key={index}>
                  <img src={blog.image} alt="blog" className="blog-image" />
                  <div className="blog-content">
                    <span className="blog-date">{blog.date}</span>
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-description">{blog.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
  };

export default About
