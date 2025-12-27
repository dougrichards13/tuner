"""
Database migration script to add new columns to projects table.
Run this once to upgrade existing database.
"""
import sqlite3
from pathlib import Path

def migrate_database():
    """Add new columns to projects table."""
    db_path = Path("../data/ai_platform.db")
    
    if not db_path.exists():
        print(f"Database not found at {db_path}")
        print("Run setup_db.py first to create the database.")
        return
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Check if columns already exist
        cursor.execute("PRAGMA table_info(projects)")
        columns = [col[1] for col in cursor.fetchall()]
        
        # Add project_type if not exists
        if 'project_type' not in columns:
            print("Adding project_type column...")
            cursor.execute("ALTER TABLE projects ADD COLUMN project_type TEXT DEFAULT 'general'")
            conn.commit()
            print("✓ Added project_type column")
        else:
            print("✓ project_type column already exists")
        
        # Add status if not exists
        if 'status' not in columns:
            print("Adding status column...")
            cursor.execute("ALTER TABLE projects ADD COLUMN status TEXT DEFAULT 'active'")
            conn.commit()
            print("✓ Added status column")
        else:
            print("✓ status column already exists")
        
        # Add last_accessed if not exists
        if 'last_accessed' not in columns:
            print("Adding last_accessed column...")
            cursor.execute("ALTER TABLE projects ADD COLUMN last_accessed TIMESTAMP")
            # Set last_accessed to created_at for existing projects
            cursor.execute("UPDATE projects SET last_accessed = created_at WHERE last_accessed IS NULL")
            conn.commit()
            print("✓ Added last_accessed column")
        else:
            print("✓ last_accessed column already exists")
        
        print("\n✅ Database migration completed successfully!")
        
    except Exception as e:
        print(f"\n❌ Error during migration: {e}")
        conn.rollback()
    finally:
        conn.close()


if __name__ == "__main__":
    print("Starting database migration...\n")
    migrate_database()
