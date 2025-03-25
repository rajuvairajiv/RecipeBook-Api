function searchRecipe() {
    const query = document.getElementById("searchbox").value.trim();
    const result = document.getElementById("resultContainer");
    result.innerHTML = '';

    if (query === '') {
        alert("please type your favourite food");
        return;
    }

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.meals) {
                data.meals.forEach(meal => {
                    const mealDiv = document.createElement('div');
                    mealDiv.className = 'meal';
                    mealDiv.innerHTML = `
                     <h2 class='title'>${meal.strMeal}</h2>
                     <img class='images' src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200" />
                     <p class='category'><strong>Category:</strong> ${meal.strCategory}</p>
                     <p class='area'><strong>Area:</strong> ${meal.strArea}</p>
                     <p class='descriptions'><strong>Instructions:</strong> ${meal.strInstructions}</p>
                    `;
                    result.appendChild(mealDiv);  // <- Corrected this line!
                });
            } else {
                result.innerHTML = `<p>No recipes found for "${query}".</p>`;
            }
        })
        .catch(error => {
            console.error(error);
            result.innerHTML = '<p>Something Went Wrong...Please try again later...</p>';
        });
};


function resetRecipe() {
    const result = document.getElementById("resultContainer");
    result.innerHTML = '';
    const query = document.getElementById("searchbox");
    query.value = '';

}
