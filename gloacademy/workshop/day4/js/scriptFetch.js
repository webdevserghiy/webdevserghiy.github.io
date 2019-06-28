const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {

    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=c0ff64cdede0859442f376546a6f9258&language=ru-RU&query=' + searchText;
    movie.innerHTML = 'Загрузка';
    requestApi(server)
        .then(function (result) {
            const output = JSON.parse(result);
            console.log(output);

            let inner = '';

            console.log(output);

            output.results.forEach(function (item) {
                let nameItem = item.name || item.title,
                    dateItem = item.release_date ? item.release_date : "Дата неизвестна";

                inner += `
              <div class="card fixed">
                <div class="card-body">
                <h2>${nameItem}</h2>
                <div class='col-4 col-md-3 col-xl-4'>Дата релиза: </strong>${dateItem}</div>
                </div>
              </div>
            `;

            });

            inner = `<div class="row">
            ${inner}
            </div>
            `;
            movie.innerHTML = inner;



        })
        .catch(function (reason) {
            movie.innerHTML = 'УПС! Что-то пошло не так...';
            console.log('error: ' + reason.status);
        });
}
searchForm.addEventListener('submit', apiSearch);


function requestApi(url) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.open('GET', url);

        request.addEventListener('load', function () {
            if (request.status !== 200) {
                reject({
                    status: request.status
                });
                return;
            }

            resolve(request.response);
        });

        request.addEventListener('error', function () {
            reject({
                status: request.status
            });
        });
        request.send();
    });
}