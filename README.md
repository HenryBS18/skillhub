# SkillHub

## System Requirements
- Docker

## Step By Step Run The Application
1. Clone this repo
    ```sh
    git clone https://github.com/HenryBS18/skillhub.git 
    ```

2. Create file **.env** in root dir, and copy this
    ```
    MYSQL_ROOT_PASSWORD=example
    MYSQL_DATABASE=skillhub
    ```

3. Create file **.env.production** in skillhub-backend, and copy this
    ```
    DATABASE_URL="mysql://root:example@db:3306/skillhub"
    DB_HOST=db
    DB_USER=root
    DB_PASS=example
    DB_NAME=skillhub
    DB_PORT=3306
    ```

4. Create file **.env.production** in skillhub-frontend, and copy this
    ```
    VITE_API_BASE_INTERNAL_URL=http://backend:3000/api
    VITE_API_BASE_URL=http://localhost:3000/api
    PORT=5000
    ```

5. Run the app
    ```sh
    docker compose up -d --build
    ```