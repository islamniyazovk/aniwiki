## Запуск проекта с использованием Docker и Docker Compose

Для быстрого развертывания проекта с использованием Docker, выполните следующие шаги:

### 1. Клонировать репозиторий

Если у вас еще нет локальной копии проекта, клонируйте репозиторий:

```bash
git clone https://github.com/islamniyazovk/aniwiki.git
cd aniwiki
```

### 2. Создать файл `.env`

В корне проекта создайте файл `.env` с необходимыми переменными окружения. Пример содержания:

```env
BACKEND_PORT=8000
FRONTEND_PORT=80
```

### 3. Установить Docker и Docker Compose

Если у вас еще не установлены Docker и Docker Compose, выполните установку, следуя [официальной документации Docker](https://docs.docker.com/get-docker/) и [Docker Compose](https://docs.docker.com/compose/install/).

### 4. Сборка и запуск контейнеров

Для запуска проекта выполните команду:

```bash
docker-compose up --build
```

Эта команда выполнит следующие действия:
- Соберет Docker-образы для backend и frontend.
- Поднимет контейнеры для сервера backend и фронтенда.
- Наложит необходимые порты (backend: 8000, frontend: 80).

### 5. Открытие приложения

- Фронтенд будет доступен по адресу: [http://localhost:80](http://localhost:80)
- Backend API будет доступен по адресу: [http://localhost:8000](http://localhost:8000)

### 6. Остановка контейнеров

Для остановки контейнеров выполните команду:

```bash
docker-compose down
``` 

ИЛИ 

CTRL + C

### Примечания:
- Убедитесь, что в `.env` указаны правильные порты.
- Если вы хотите изменить порты или другие параметры, отредактируйте соответствующие переменные в `.env` файле, а также в файлах Dockerfile.backend, Dockerfile.frontend, nginx.conf, docker-compose.yml