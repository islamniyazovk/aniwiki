const animeDetail = document.getElementById('anime-detail');
const loader = document.getElementById('loader');

const getAnimeId = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
};

const fetchAnimeDetail = async (id) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const data = await response.json();
    return data.data;
};

const renderAnimeDetail = (anime) => {
    animeDetail.innerHTML = `
        <a class="back-btn" href="index.html">⬅️ Назад</a>
        <div class="detail-card">
            <h2>${anime.title}</h2>
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <p>${anime.synopsis || 'Описание отсутствует.'}</p>
            <p><strong>Эпизоды:</strong> ${anime.episodes || 'Неизвестно'}</p>
            <p><strong>Статус:</strong> ${anime.status}</p>
            <p><strong>Рейтинг:</strong> ${anime.score || 'Нет оценки'}</p>
        </div>
    `;
};

const loadAnimeDetail = async () => {
    const id = getAnimeId();
    if (id) {
        loader.style.display = 'block';
        animeDetail.style.display = 'none';

        const anime = await fetchAnimeDetail(id);
        renderAnimeDetail(anime);

        loader.style.display = 'none';
        animeDetail.style.display = 'block';
    }
};

document.addEventListener('DOMContentLoaded', loadAnimeDetail);
