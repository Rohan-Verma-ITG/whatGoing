from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    server_host: str = "0.0.0.0"
    server_port: int = 8000
    mongodb_url: str = "mongodb://admin:admin123@localhost:27017"
    mongo_database: str = "chat_app"
    secret_key: str = "change-this-to-a-long-random-string"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    client_origin: str = "http://localhost:5173"


settings = Settings()
