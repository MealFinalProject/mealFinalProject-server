const axios = require('axios');
const router = require("express").Router();

// API
const API_ID = process.env.API_ID
const API_KEY = process.env.API_KEY

// Helpers
const getId = (inputArray) => {
    return inputArray.map(element => {
        const index = element.recipe.uri.lastIndexOf("_") + 1
        const id = element.recipe.uri.substr(index)
        element.recipe.id = id;
        return element
    })
}
const splitMealType = (objectRecipe) => {
    const splitted = []
    objectRecipe.mealType.forEach(type => {
        type.split("/").forEach(element => splitted.push(element))
    })
    const uniqSplitted = [... new Set(splitted)]
    return uniqSplitted
}

const searchRecipes = async (search) => {
    const axiosCall = await axios(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${API_ID}&app_key=${API_KEY}`
    );
    if(axiosCall.status !== 200) return {status: 400, data: { errorMessage: "Bad API response" }}
    const apiInfo = axiosCall.data.hits;

    // Get ID and push it in the object
    const recipesInfo = getId(apiInfo)
    return {status: 200, data: recipesInfo}
}

const searchOneRecipe = async (id) => {
    const axiosCall = await axios(
        `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${API_ID}&app_key=${API_KEY}`
    );
    if(axiosCall.status !== 200) return {status: 400, data: { errorMessage: "Bad API response" }}
    const recipeInfo = axiosCall.data; 
    //Add id to api response
    recipeInfo.recipe.id = id    
    // Split mealType into different categories
    recipeInfo.recipe.mealType = splitMealType(recipeInfo.recipe)
    return {status: 200, data: recipeInfo}
}

const searchRecipesByCategory = async (category) => {
    const axiosCall = await axios(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=${API_ID}&app_key=${API_KEY}&cuisineType=${category}&random=true`
    );
    if(axiosCall.status !== 200) return {status: 400, data: { errorMessage: "Bad API response" }}
    const apiInfo = axiosCall.data.hits; 
    // Get ID and push it in the object
    const recipesInfo = getId(apiInfo)
    return {status: 200, data: recipesInfo}
}

const searchRecipesByDaytime = async (daytime) => {
    const axiosCall = await axios(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=${API_ID}&app_key=${API_KEY}&&mealType=${daytime}&random=true`
     );
    if(axiosCall.status !== 200) return {status: 400, data: { errorMessage: "Bad API response" }}
    const apiInfo = axiosCall.data.hits; 
    // Get ID and push it in the object
    const recipesInfo = getId(apiInfo)
    return {status: 200, data: recipesInfo}
}

const searchRecipesByExecutionTime = async (time) => {
    const axiosCall = await axios(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=${API_ID}&app_key=${API_KEY}&time=${time}&random=true`
    );
    if(axiosCall.status !== 200) return {status: 400, data: { errorMessage: "Bad API response" }}
    const apiInfo = axiosCall.data.hits; 
    // Get ID and push it in the object
    const recipesInfo = getId(apiInfo)
    return {status: 200, data: recipesInfo}
}

const searchCocktails = async () => {
    const axiosCall = await axios(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=${API_ID}&app_key=${API_KEY}&health=alcohol-cocktail&random=true`
    );
    if(axiosCall.status !== 200) return {status: 400, data: { errorMessage: "Bad API response" }}
    const apiInfo = axiosCall.data.hits; 
    // Get ID and push it in the object
    const recipesInfo = getId(apiInfo)
    return {status: 200, data: recipesInfo}
}

module.exports = {searchRecipes, searchOneRecipe, searchRecipesByCategory, searchRecipesByDaytime, searchRecipesByExecutionTime, searchCocktails};