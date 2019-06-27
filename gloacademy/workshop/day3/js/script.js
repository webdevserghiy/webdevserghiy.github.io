const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';
const noPoster = 'http://dummyimage.com/500x750.jpg/F3F1ED/000000&text=НЕТ_ПОСТЕРА!';

function apiSearch(event) {
	event.preventDefault();
	const searchText = document.querySelector('.form-control').value;
	if (searchText.trim().length === 0) {
		movie.innerHTML = '<h2 class="col-12 text-center text-danger">Поле поиска не должно быть пустым</h2>';
		return;
	}
	movie.innerHTML = '<div class="spinner"></div>';
	fetch('https://api.themoviedb.org/3/search/multi?api_key=c0ff64cdede0859442f376546a6f9258&language=ru-RU&query=' + searchText)
		.then(function (value) {
			console.log();
			if (value.status !== 200) {
				return Promise.reject(value);
			}
			return value.json();
		})
		.then(function (output) {
			let inner = '';
			if (output.results.length === 0) {
				inner = '<h2 class="col-12 text-center text-info">По Вашему запросу ничего не найдено...</h2>';
			}
			output.results.forEach(function (item) {
				let nameItem = item.name || item.title;
				let dataInfo = '';
				if (item.media_type !== 'person') {
					dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;
				}
				inner += `
				<div class="col-12 col-md-4 col-xl-3 item">
				<div class="film-card">
					<img class="img-poster" src="${item.poster_path ? urlPoster + item.poster_path : noPoster}" alt="${nameItem}" ${dataInfo}>
					<p class="h5 align-bottom film-name">${nameItem}</p>
				</div>
			</div>
				`;
			});
			movie.innerHTML = inner;

			addEventMedia();

		})
		.catch(function (reason) {
			movie.innerHTML = 'УПС! Что-то пошло не так...';
			console.error('error: ' + reason.status);
		});
}

searchForm.addEventListener('submit', apiSearch);

function addEventMedia() {
	const media = movie.querySelectorAll('img[data-id]');
	media.forEach(function (elem) {
		elem.style.cursor = 'pointer';
		elem.addEventListener('click', showFullInfo);
	});
}

function showFullInfo() {
	let url = '';
	if(this.dataset.type === 'movie'){
		url = `https://api.themoviedb.org/3/movie/${this.dataset.id}?api_key=c0ff64cdede0859442f376546a6f9258&language=ru`;
	} else if (this.dataset.type === 'tv') {
		url = `https://api.themoviedb.org/3/tv/${this.dataset.id}?api_key=c0ff64cdede0859442f376546a6f9258&language=ru`;
	} else {
		movie.innerHTML = '<h2 class="col-12 text-center text-info">Произошла ошибка, повторите позже...</h2>';
	}
	// this.dataset.id
	console.log('this.dataset.id: ', this.dataset.id);
	// url
	console.log('url: ', url);
	
	fetch(url)
		.then(function (value) {
			console.log();
			if (value.status !== 200) {
				return Promise.reject(value);
			}
			return value.json();
		})
		.then(function (output) {
			console.log(output);
			console.log('output.homepage: ', output.homepage);
			movie.innerHTML = 
			`
			<h4 class="col-12 text-center text-info">${output.name || output.title}</h4>
			<div class="col-4">
				<img class="img" src="${output.poster_path ? urlPoster + output.poster_path : noPoster}" alt="${output.name || output.title}">
				${(output.homepage) ? `<p><a href="${output.homepage}" target="_blank">Официальная страница</a></p>` : ''}	
				${(output.imdb_id) ? `<p><a href="https://imdb.com/title/${output.imdb_id}" target="_blank">Страница на IMDB.com</a></p>` : ''}

			</div>
			<div class="col-8">
				<p>Рейтинг: ${output.vote_average}</p>
				<p>Статус: ${output.status}</p>
				<p>Премьера: ${output.release_date || output.first_air_date}</p>
								
				${(output.last_episode_to_air) ? `<p>${output.number_of_seasons} сезон ${output.last_episode_to_air.episode_number} серий вышло</p>` : ''}

				<p>Описание: ${output.overview}</p>

			</div>
			`;
		})
		.catch(function (reason) {
			movie.innerHTML = 'УПС! Что-то пошло не так...';
			console.error('error: ' + reason.status);
		});
}

document.addEventListener('DOMContentLoaded', function () {
	fetch('https://api.themoviedb.org/3/trending/all/day?api_key=c0ff64cdede0859442f376546a6f9258&language=ru')
		.then(function (value) {
			console.log();
			if (value.status !== 200) {
				return Promise.reject(value);
			}
			return value.json();
		})
		.then(function (output) {
			let inner = '<h2 class="col-12 text-center text-info">Популярные за неделю</h2>';
			if (output.results.length === 0) {
				inner = '<h2 class="col-12 text-center text-info">По Вашему запросу ничего не найдено...</h2>';
			}
			output.results.forEach(function (item) {
				let nameItem = item.name || item.title;
				let mediaType = item.title ? 'movie' : 'tv';
				let dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;
				inner += `
			<div class="col-12 col-md-4 col-xl-3 item">
				<div class="film-card">
					<img class="img-poster" src="${item.poster_path ? urlPoster + item.poster_path : noPoster}" alt="${nameItem}" ${dataInfo}>
					<p class="h5 film-name">${nameItem}</p>
				</div>
			</div>
			`;
			});
			movie.innerHTML = inner;

			addEventMedia();

		})
		.catch(function (reason) {
			movie.innerHTML = 'УПС! Что-то пошло не так...';
			console.error('error: ' + reason.status);
		});
})