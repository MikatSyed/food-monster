
//load api
const handleSearch = (event) =>{ 
    
    console.log("clicked");
    const  searchItem = document.getElementById('search-item');
    const name = searchItem.value;
    let errorMessage = "";
    event.preventDefault();
  
    
//Search Meal by first letter
    if(name.length === 1 || name.length == ""){
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`
        fetch(url)
        .then(res => res.json())
            .then(data => 
                displayMeals(data.meals))

       .catch(()=> {
            alert("Please search by a name");
            });                  
        }

        // Search meal by name
        if(name.length > 1){
            const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
            fetch(url)
            .then(res => res.json())
                .then(data => 
                    displayMeals(data.meals))
                   
    
                    .catch(()=> {
                        const searchResult = document.getElementById('search-result')
                        errorMessage += 
                          `
                          <div class=" container errorBox">
                          <h3 class="searchResult text-danger">Search result not found</h3>
                          </div>
                          `
                          searchResult.innerHTML = errorMessage
    
                    });                   
            }
}




//get meal by search
const displayMeals = (meals) =>{ 
   
    
    const mealDiv = document.getElementById('display-meals');
    mealDiv.innerHTML = "";
    meals.forEach(meal => {
        const{strMeal,strMealThumb} = meal;
       const mealInfo = `
       <div class="meal"  onclick="mealDetails('${meal.idMeal}')" >
       <img src="${strMealThumb}">
       <h3 class="meal-name">${strMeal}</h3>
       </div>
       ` 
       mealDiv.innerHTML += mealInfo;
       
         
    });
    
    //display total number of meal as found
const searchCount = meals.length;
const searchResult = document.getElementById('search-result');
const searchValue = document.getElementById('search-item').value;
console.log(searchValue);
const searchCountResult = 
`<div class=" container errorBox">
<p class="searchResult">${searchCount} recipe result for "${searchValue}"</p>
</div>`
searchResult.innerHTML = searchCountResult;

//search input value default
document.getElementById('search-item').value = ' ';

}



//meal details by id
const mealDetails = id =>{
  
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=> res.json())
    .then(data =>{
        displayElement(data.meals[0]);
        console.log("details is loading");

       

    })

}
//single meal details
const displayElement = element =>{
    console.log(element);
    const mealDetailDiv = document.getElementById('display-details');
    const{strMeal,strMealThumb,strMeasure1,strMeasure2,strMeasure3,strMeasure4,strMeasure5,strMeasure6,strMeasure7,strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5,strIngredient6,strIngredient7} = element;
    mealDetailDiv.innerHTML = ' ';
    const mealDetail = `
    <div id="mealDetails" class="meal-details align">
    <img src="${element.strMealThumb}">
    <h3 class="meal-name">${element.strMeal}</h3>
        <h5 class="ml-4">Ingredients</h5>
    <ul type="square" class="text-secondary">
    <li>${strMeasure1} ${strIngredient1}</li>
    <li>${strMeasure2} ${strIngredient2}</li>
    <li>${strMeasure3} ${strIngredient3}</li>
    <li>${strMeasure4} ${strIngredient4}</li>
    <li>${strMeasure5} ${strIngredient6}</li>
    <li>${strMeasure6} ${strIngredient7}</li>
    <li>${strMeasure7} ${strIngredient7}</li>
    </ul>
    </div>

    `
    mealDetailDiv.innerHTML += mealDetail; 
    

}

//use keyboard to search
window.addEventListener('keydown', (key) => {
    if (key.key === "Enter") {
        handleSearch();
    }
})

