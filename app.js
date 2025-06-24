let getDiv = document.getElementById('getDiv');
let searchInput = document.getElementById('news');
let searchButton = document.getElementById('getnews');

searchButton.addEventListener('click', () => {
  
  getDiv.innerHTML = '';


   fetch(`https://newsapi.org/v2/everything?q=${searchInput.value}&
    from=2025-05-24&sortBy=publishedAt&apiKey=dae2f2e4c7d5436fb2313e25e6a657b9`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.articles.length === 0) {
        getDiv.innerHTML = '<p>No articles found.</p>';
        return;
      }
      data.articles.forEach(article => {
        getDiv.innerHTML += `
          <div class="card m-4" style="width: 18rem;">
            <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
            <div class="card-body bg-info">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.description || 'No description available.'}</p>
              <a href="${article.url}" class="btn btn-primary bg-danger" target="_blank">Read more</a>
            </div>
          </div>`;
      });
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      getDiv.innerHTML = '<p>Error loading articles. Please try again later.</p>';
    });
});
