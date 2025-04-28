import aiohttp

class AnimeAPI:
    url = "https://api.jikan.moe/v4"
    
    async def get_animes(self, page=None, anime_title=None):
        async with aiohttp.ClientSession() as session:
            url = self.url + "/anime"
            has_page = False

            if page:
                url += f"?page={page}"
                has_page = True

            if anime_title:
                if has_page:
                    url += f"&&q={anime_title}"
                else:
                    url += f"?q={anime_title}"

            async with session.get(url) as response:
                data = await response.json()
                return data
            
    async def get_anime(self, anime_id):
        async with aiohttp.ClientSession() as session:
            url = self.url + f"/anime/{anime_id}"

            async with session.get(url) as response:
                data = await response.json()
                return data