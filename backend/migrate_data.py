import json
from database import SessionLocal, engine, Base
import models

# Ensure tables are created
Base.metadata.create_all(bind=engine)

def migrate():
    try:
        with open("database.json", "r") as f:
            data = json.load(f)
    except FileNotFoundError:
        print("database.json not found. Nothing to migrate.")
        return

    db = SessionLocal()
    
    # Migrate Projects
    for p in data.get("projects", []):
        db_project = models.Project(
            id=p.get("id"),
            title=p.get("title"),
            status=p.get("status"),
            tags=p.get("tags"),
            github_url=p.get("github_url"),
            video_url=p.get("video_url"),
            description=p.get("description")
        )
        # Check if exists
        if not db.query(models.Project).filter(models.Project.id == db_project.id).first():
            db.add(db_project)
            
    # Migrate Logs
    for l in data.get("logs", []):
        db_log = models.Log(
            id=l.get("id"),
            type=l.get("type"),
            title=l.get("title"),
            organization=l.get("organization"),
            date=l.get("date"),
            location=l.get("location"),
            description=l.get("description")
        )
        if not db.query(models.Log).filter(models.Log.id == db_log.id).first():
            db.add(db_log)
            
    # Migrate Skills
    for s in data.get("skills", []):
        db_skill = models.Skill(name=s)
        if not db.query(models.Skill).filter(models.Skill.name == s).first():
            db.add(db_skill)
            
    db.commit()
    db.close()
    print("Migration completed successfully!")

if __name__ == "__main__":
    migrate()
