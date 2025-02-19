const mongoose = require('mongoose')
const chalk = require('chalk')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')
// Import of the data from './data.json'
const data = require('./data')

const DB = 'recipe-app'

// Connection to the database "recipe-app"
const connectToMongo = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${DB}`, {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
      // useFindAndModify: false
    })
    console.log(chalk.bgBlue('Connected to Mongo'))
  }
  catch (err) {
    console.log(chalk.bgRed('Error:', err))
  }
}

connectToMongo()

//Iteration 2
const createRecipe = async() => {
  try{
    const recipe = await Recipe.create({
      title: 'Hamburger',
      level: 'Easy Peasy',
      ingredients: ['Hamburger bread', 'Beef', 'Lettuce', 'Tomato', 'Sauces', 'Cheddar cheese'],
      cuisine: 'Fast food',
      dishType: 'main_course',
      image: 'https://www.aspicyperspective.com/wp-content/uploads/2020/05/Best-Hamburger-Patty-Recipe-17-768x1152.jpg',
      duration: 15
    })
    console.log(chalk.bgBlue('Recipe title:', recipe.title))
  }
  catch(err){
    console.log(chalk.bgRed('Error:', err))
  }
}

// createRecipe()

//Iteration 3
const insertAllRecipes = async() => {
  try{
    const allRecipes = await Recipe.insertMany(data) 
    allRecipes.forEach((recipe) => {
      console.log(chalk.bgBlue('Recipe title:', recipe.title))
    })
  }
  catch(err){
    console.log(chalk.bgRed('Error:', err))
  }
}

// insertAllRecipes()

//Iteration 4
const updateOneRecipe = async() => {
  try{
    await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
    console.log(chalk.bgBlue('Updated succesfully'))
  }
  catch(err){
    console.log(chalk.bgRed('Error:', err))
  }
}

// updateOneRecipe()

//Iteration 5
const deleteOneRecipe = async() => {
  try{
    await Recipe.deleteOne({title: 'Carrot Cake'})
    console.log(chalk.bgBlue('Deleted succesfully'))
  }
  catch(err){
    console.log(chalk.bgRed('Error:', err))
  }
}

// deleteOneRecipe()

//Iteration 6
const closeConnection = async() => {
  try{
    await mongoose.connection.close()
    console.log(chalk.bgBlue('Connection closed succesfully'))
  }
  catch(err){
    console.log(chalk.bgRed('Error:', err))
  }
}

closeConnection()
