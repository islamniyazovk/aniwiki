const animeList = document.getElementById('anime-list');
const pagination = document.getElementById('pagination');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');
const loader = document.getElementById('loader');

let currentPage = 1;
let currentQuery = '';

const fetchAnime = async (page = 1, query = '') => {
    const url = query
        ? `https://api.jikan.moe/v4/anime?q=${query}&page=${page}`
        : `https://api.jikan.moe/v4/top/anime?page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const renderAnime = (data) => {
    animeList.innerHTML = '';

    data.data.forEach(anime => {
        const card = document.createElement('div');
        card.className = 'anime-card';
        card.innerHTML = `
            <a href="anime.html?id=${anime.mal_id}">
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                <h3>${anime.title}</h3>
            </a>
        `;
        animeList.appendChild(card);
    });
};

const renderPagination = (data) => {
    pagination.innerHTML = '';

    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'btn';
        prevBtn.textContent = 'Назад';
        prevBtn.onclick = () => changePage(currentPage - 1);
        pagination.appendChild(prevBtn);
    }

    if (data.pagination.has_next_page) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn';
        nextBtn.textContent = 'Вперёд';
        nextBtn.onclick = () => changePage(currentPage + 1);
        pagination.appendChild(nextBtn);
    }
};

const changePage = (page) => {
    currentPage = page;
    loadAnime();
};

const loadAnime = async () => {
    loader.style.display = 'block';
    animeList.style.display = 'none';
    pagination.style.display = 'none';

    const data = await fetchAnime(currentPage, currentQuery);

    renderAnime(data);
    renderPagination(data);

    loader.style.display = 'none';
    animeList.style.display = 'grid';
    pagination.style.display = 'block';
};

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    currentQuery = searchInput.value.trim();
    currentPage = 1;
    loadAnime();
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '🌙' : '🌞';
});

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '🌙';
} else {
    themeToggle.textContent = '🌞';
}

loadAnime();
