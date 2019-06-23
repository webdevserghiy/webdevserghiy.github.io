const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';
function apiSearch(event) {
	event.preventDefault();
	const searchText = document.querySelector('.form-control').value;
	const server = 'https://api.themoviedb.org/3/search/multi?api_key=c0ff64cdede0859442f376546a6f9258&language=ru-RU&query=' + searchText;
	movie.innerHTML = 'Загрузка';
	fetch(server)
		.then(function (value) {
			console.log();
			if (value.status !==200) {
				return Promise.reject(value);
			}
			return value.json();
		})
		.then(function (output) {
			let inner = '';
			output.results.forEach(function (item) {
				let nameItem = item.name || item.title;
				inner += `
				<div class="col-12 col-md-4 col-xl-3 item">
					<img src="${item.poster_path ? urlPoster + item.poster_path : 'http://dummyimage.com/500x750.jpg/729da8/000000&text=НЕТ_ПОСТЕРА!'}" alt="${nameItem}">
					<h5>${nameItem}</h5>
				</div>
				`;
			});
			movie.innerHTML = inner;
		})
		.catch(function(reason) {
			movie.innerHTML = 'УПС! Что-то пошло не так...';
			console.error('error: ' + reason.status);
		});
}

searchForm.addEventListener('submit', apiSearch);