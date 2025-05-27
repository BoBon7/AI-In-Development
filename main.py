import sqlite3
from pathlib import Path

# Путь к корню проекта (где лежат .txt-файлы и база данных)
BASE_DIR = Path(__file__).resolve().parent

# Файлы с SQL-запросами
query_files = [
    ("task1-query.txt", "💰 Total sales for March"),
    ("task2-query.txt", "🏆 Top-spending customer"),
    ("task3-query.txt", "📊 Average order value (Jan–Mar)")
]


def run_queries(db_path: str, queries):
    with sqlite3.connect(db_path) as connection:
        cursor = connection.cursor()

        for file_name, description in queries:
            sql_path = BASE_DIR / file_name
            query = sql_path.read_text(encoding='utf-8')

            cursor.execute(query)
            result = cursor.fetchall()

            print(f"\n{description}:\n{result}")


if __name__ == "__main__":
    run_queries("sqlite.db", query_files)
