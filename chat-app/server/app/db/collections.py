from app.db.database import get_database


def users_collection():
    return get_database().get_collection("users")


def messages_collection():
    return get_database().get_collection("messages")
