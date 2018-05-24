(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID a3a4b0dd061a426a72f245e306671ebbd8b479d816891f3a3d313974c239af71'
            }
        }).then(response => response.json()).then(addImage).catch(e => requestError(e, 'image'));
        function requestError(e, part) {
            console.log(e);
            responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
        }
        function addImage(data) {
            let htmlContent = '';
            //  const firstImage = data.results[0];
            const Image = data.results;
            for (const image of Image) {
                responseContainer.insertAdjacentHTML('afterbegin', `<figure>
                <img src="${image.urls.small}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${image.user.name} twitter ${image.user.twitter_username}</figcaption>
            </figure>`);
            }

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=453e3d675dcd4f6e81f71555bdaf990c`)
            .then(response => response.json()).then(addarticle).catch(err => requestError(err, 'image'));
        function addarticle(data) {
            let htmlContent = '';
            const articles = data.response.docs;

            if (data.response && data.response.docs && data.response.docs.length > 1) {

                htmlContent = '<ul>' + articles.map(article =>
                    `<li class='article'><h2><a herf='${article.web_url}'>${article.headline.main}</a></h2>
                        <p>${article.snippet}</br>source :${article.source}</p></li>`
                ).join('') + '</ul>';

            } else {
                htmlContent = ` <div class = 'error-no-articles' > no - data - here </div>`;
            }
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }
        function requestError(err, part) {
            console.log(e);
            responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
        }


    });
})();
