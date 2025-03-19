const Recipes = require("../models/recipemodel")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.fieldname 
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })

//get all recipes
const getRecipes = async(req,res)=>{
    const recipes = await Recipes.find()
    return res.json(recipes)
}


//get recipe by id
const getRecipe = async(req,res)=>{
    const recipe = await Recipes.findById(req.params.id)
    res.json(recipe)
}

//add recipe
const addRecipe = async (req, res) => {
    console.log(req.user);
    const { title, ingredients, instructions, time } = req.body;

    if (!title || !ingredients || !instructions) {
        return res.status(400).json({ message: "All fields are required" }); 
    }

    const newRecipe = await Recipes.create({
        title, ingredients, instructions, time, coverImage: req.file.filename,
        createdBy:req.user.id
        
    });

    return res.json(newRecipe);
};


//edit the recipe
const editRecipe = async(req,res)=>{
    const {title,ingredients,instructions,time} = req.body
    let recipe = await Recipes.findById(req.params.id)
    try{
        if(recipe){
            let coverImage = req.file?.filename ? req.file?.filename : recipe.coverImage
            await Recipes.findByIdAndUpdate(req.params.id,{...req.body,coverImage},{new:true})
            res.json({title,ingredients,instructions,time})
        }
    }
    catch(err){
       return res.status(404).json({message:"Recipe not found"})
    }
    
}

const deleteRecipe = async(req,res)=>{
    try {
        await Recipes.deleteOne({_id:req.params.id})
        res.json({message:"Recipe deleted successfully"})
    } catch (err) {
        return res.status(400).json({message:"error deleting item"})
    }
}

module.exports= {getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload}