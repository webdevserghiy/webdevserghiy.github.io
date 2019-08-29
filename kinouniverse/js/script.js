const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';
const noPoster = 'http://dummyimage.com/500x750.jpg/F3F1ED/000000&text=НЕТ_ПОСТЕРА!';
const apiKey = 'c0ff64cdede0859442f376546a6f9258';


function apiSearch(event) {
	event.preventDefault();
	const searchText = document.querySelector('.form-control').value;
	if (searchText.trim().length === 0) {
		movie.innerHTML = '<h2 class="col-12 text-center text-danger">Поле поиска не должно быть пустым</h2>';
		return;
	}
	movie.innerHTML = '<div class="spinner"></div>';
	fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=ru-RU&query=${searchText}`)
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
				<div class="col-7 col-md-4 col-xl-3 item">
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
		url = `https://api.themoviedb.org/3/movie/${this.dataset.id}?api_key=${apiKey}&language=ru`;
	} else if (this.dataset.type === 'tv') {
		url = `https://api.themoviedb.org/3/tv/${this.dataset.id}?api_key=${apiKey}&language=ru`;
	} else {
		movie.innerHTML = '<h2 class="col-12 text-center text-info">Произошла ошибка, повторите позже...</h2>';
	}
	let imdbID = '';
		
	fetch(url)
		.then(function (value) {
			if (value.status !== 200) {
				return Promise.reject(new Error (value.status));
			}
			return value.json();
		})
		.then( (output) => {
			
			getImdbRating(output.imdb_id);
			
			movie.innerHTML = `
			<h4 class="col-12 text-center text-info film-info-title">${output.name || output.title}</h4>
			<div class="col-4">
				<img class="film-info-img" src="${output.poster_path ? urlPoster + output.poster_path : noPoster}" alt="${output.name || output.title}">
				${(output.homepage) ? `<p><a href="${output.homepage}" target="_blank">Официальная страница</a></p>` : ''}	
				${(output.imdb_id) ? `<p><a href="https://imdb.com/title/${output.imdb_id}" target="_blank">Страница на IMDB.com</a></p>` : ''}

			</div>

			<div class="col-8">
				<p>Рейтинг: ${output.vote_average}</p>
				<p id="imdb-rating"></p>
				<p>Статус: ${output.status}</p>
				<p>Премьера: ${output.release_date || output.first_air_date}</p>
								
				${(output.last_episode_to_air) ? `<p>${output.number_of_seasons} сезон ${output.last_episode_to_air.episode_number} серий вышло</p>` : ''}

				<p>Описание: ${output.overview}</p>
				<br>
				<div class="youtube"></div>
					
				

			</div>
			`;
			
			
			
		getVideo(this.dataset.type, this.dataset.id);
		
		})
		.catch(function (reason) {
			movie.innerHTML = 'УПС! Что-то пошло не так...';
			console.error('error: ' + reason.status);
		});

}

document.addEventListener('DOMContentLoaded', function () {
	fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=ru`)
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
			<div class="col-7 col-md-4 col-xl-3 item">
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
		
});

function getVideo(type, id){
	let youtube = movie.querySelector('.youtube');

	fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}&language=ru`)
		.then(function (value) {
			if (value.status !== 200) {
				return Promise.reject(new Error (value.status));
			}
			return value.json();
		})
		.then((output) => {
			let videoFrame = '<h5 class="col-12 text-info">Трейлеры</h5>';

			if(output.results.length === 0) {
				videoFrame = '<h5 class="col-12 text-muted">К сожалению видеоролики отсутствуют...</h5>';
			}

			output.results.forEach((item) => {
				videoFrame += `
					<iframe width="560" height="315" src="https://www.youtube.com/embed/${item.key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				`;
			});
			youtube.innerHTML = videoFrame;
		})
		.catch((reason) => {
			youtube.innerHTML = 'Видео отсутствует...';
			console.error('error: ' + reason.status);
		});
}

function getImdbRating (imdbId) {
	let rate='';
	fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?i="+imdbId+"&r=json", 
		{
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
			"x-rapidapi-key": "95a7814e65mshfeb03bff61718e2p1a5595jsnd249fc060107"
		}
		})
		.then(function (value) {
			console.log();
			if (value.status !== 200) {
				return Promise.reject(value);
			}
			// console.log(value.json());
			return value.json();
			})
		.then((output) => {
			let imdbR = document.getElementById('imdb-rating');
			if (output.imdbRating == 0 || output.imdbRating === undefined) {
				imdbR.style.display = 'none';
			}
			imdbR.innerHTML = `Рейтинг <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/New-imdb-logo.png" style="width: 45px;">: ${output.imdbRating}`;
			})
		.catch(err => {
			console.log(err);
			});
}