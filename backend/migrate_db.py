import sqlite3

def migrate():
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute('ALTER TABLE projects ADD COLUMN is_published BOOLEAN DEFAULT 1;')
        print("Added is_published to projects.")
    except sqlite3.OperationalError as e:
        print(f"Error altering projects: {e}")
        
    try:
        cursor.execute('ALTER TABLE logs ADD COLUMN is_published BOOLEAN DEFAULT 1;')
        print("Added is_published to logs.")
    except sqlite3.OperationalError as e:
        print(f"Error altering logs: {e}")

    conn.commit()
    conn.close()

if __name__ == "__main__":
    migrate()
