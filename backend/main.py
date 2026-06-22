from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models
import schemas
from database import engine, SessionLocal
from github_metrics import fetch_github_metrics
from pydantic import BaseModel

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Robotics Portfolio API",
    description="Backend systems telemetry and CMS routing for Brahma Teja Jampu's portfolio.",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

class AuthRequest(BaseModel):
    password: str

ADMIN_PASS = "admin123"

@app.get("/")
async def root():
    return {"system": "OPERATIONAL", "service": "Robotics Portfolio API v2 (SQLite)"}

@app.post("/api/auth")
async def auth(req: AuthRequest):
    if req.password == ADMIN_PASS:
        return {"status": "SUCCESS", "token": "temp-admin-token-123"}
    raise HTTPException(status_code=401, detail="Invalid passcode")

@app.get("/api/dashboard/overview")
async def get_overview(db: Session = Depends(get_db)):
    active_projects = db.query(models.Project).count()
    total_logs = db.query(models.Log).count()
    return {
        "active_projects": active_projects,
        "total_logs": total_logs,
        "database_status": "ONLINE (SQLite)",
        "last_updated": "Real-time"
    }

# CMS CRUD: Projects
@app.get("/api/projects", response_model=list[schemas.Project])
async def get_projects(is_published: bool = None, db: Session = Depends(get_db)):
    query = db.query(models.Project)
    if is_published is not None:
        query = query.filter(models.Project.is_published == is_published)
    return query.all()

@app.post("/api/projects")
async def add_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    # Compatible with Pydantic v1 & v2
    data = project.dict() if hasattr(project, 'dict') else project.model_dump()
    db_project = models.Project(**data)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return {"status": "SUCCESS"}

@app.delete("/api/projects/{item_id}")
async def delete_project(item_id: str, db: Session = Depends(get_db)):
    db_project = db.query(models.Project).filter(models.Project.id == item_id).first()
    if db_project:
        db.delete(db_project)
        db.commit()
    return {"status": "SUCCESS"}

@app.put("/api/projects/{item_id}")
async def update_project(item_id: str, project: schemas.ProjectUpdate, db: Session = Depends(get_db)):
    db_project = db.query(models.Project).filter(models.Project.id == item_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = project.dict(exclude_unset=True) if hasattr(project, 'dict') else project.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_project, key, value)
        
    db.commit()
    db.refresh(db_project)
    return {"status": "SUCCESS"}

# CMS CRUD: Logs
@app.get("/api/logs", response_model=list[schemas.Log])
async def get_logs(is_published: bool = None, db: Session = Depends(get_db)):
    query = db.query(models.Log)
    if is_published is not None:
        query = query.filter(models.Log.is_published == is_published)
    return query.all()

@app.post("/api/logs")
async def add_log(log: schemas.LogCreate, db: Session = Depends(get_db)):
    data = log.dict() if hasattr(log, 'dict') else log.model_dump()
    db_log = models.Log(**data)
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return {"status": "SUCCESS"}

@app.delete("/api/logs/{item_id}")
async def delete_log(item_id: str, db: Session = Depends(get_db)):
    db_log = db.query(models.Log).filter(models.Log.id == item_id).first()
    if db_log:
        db.delete(db_log)
        db.commit()
    return {"status": "SUCCESS"}

@app.put("/api/logs/{item_id}")
async def update_log(item_id: str, log: schemas.LogUpdate, db: Session = Depends(get_db)):
    db_log = db.query(models.Log).filter(models.Log.id == item_id).first()
    if not db_log:
        raise HTTPException(status_code=404, detail="Log not found")
    
    update_data = log.dict(exclude_unset=True) if hasattr(log, 'dict') else log.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_log, key, value)
        
    db.commit()
    db.refresh(db_log)
    return {"status": "SUCCESS"}

# CMS CRUD: Skills
@app.get("/api/skills")
async def get_skills(db: Session = Depends(get_db)):
    skills = db.query(models.Skill).all()
    return [s.name for s in skills]

@app.post("/api/skills")
async def add_skill(skill: schemas.SkillBase, db: Session = Depends(get_db)):
    if not db.query(models.Skill).filter(models.Skill.name == skill.skill).first():
        db_skill = models.Skill(name=skill.skill)
        db.add(db_skill)
        db.commit()
    return {"status": "SUCCESS"}

@app.delete("/api/skills/{skill_name}")
async def delete_skill(skill_name: str, db: Session = Depends(get_db)):
    db_skill = db.query(models.Skill).filter(models.Skill.name == skill_name).first()
    if db_skill:
        db.delete(db_skill)
        db.commit()
    return {"status": "SUCCESS"}

@app.get("/api/metrics")
async def get_metrics():
    """
    Endpoint to retrieve live GitHub metrics and repository status.
    """
    data = await fetch_github_metrics()
    if data.get("error"):
        raise HTTPException(status_code=500, detail=data["error"])
    return data

# CMS CRUD: Dynamic Configs
@app.get("/api/config/identity", response_model=schemas.IdentityConfig)
async def get_identity_config(db: Session = Depends(get_db)):
    config = db.query(models.IdentityConfig).first()
    if not config:
        config = models.IdentityConfig()
        db.add(config)
        db.commit()
        db.refresh(config)
    return config

@app.put("/api/config/identity")
async def update_identity_config(config_update: schemas.IdentityConfigUpdate, db: Session = Depends(get_db)):
    config = db.query(models.IdentityConfig).first()
    if not config:
        config = models.IdentityConfig()
        db.add(config)
    update_data = config_update.dict(exclude_unset=True) if hasattr(config_update, 'dict') else config_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(config, key, value)
    db.commit()
    return {"status": "SUCCESS"}

@app.get("/api/config/hero", response_model=schemas.HeroConfig)
async def get_hero_config(db: Session = Depends(get_db)):
    config = db.query(models.HeroConfig).first()
    if not config:
        config = models.HeroConfig()
        db.add(config)
        db.commit()
        db.refresh(config)
    return config

@app.put("/api/config/hero")
async def update_hero_config(config_update: schemas.HeroConfigUpdate, db: Session = Depends(get_db)):
    config = db.query(models.HeroConfig).first()
    if not config:
        config = models.HeroConfig()
        db.add(config)
    update_data = config_update.dict(exclude_unset=True) if hasattr(config_update, 'dict') else config_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(config, key, value)
    db.commit()
    return {"status": "SUCCESS"}

@app.get("/api/config/about", response_model=schemas.AboutConfig)
async def get_about_config(db: Session = Depends(get_db)):
    config = db.query(models.AboutConfig).first()
    if not config:
        config = models.AboutConfig()
        db.add(config)
        db.commit()
        db.refresh(config)
    return config

@app.put("/api/config/about")
async def update_about_config(config_update: schemas.AboutConfigUpdate, db: Session = Depends(get_db)):
    config = db.query(models.AboutConfig).first()
    if not config:
        config = models.AboutConfig()
        db.add(config)
    update_data = config_update.dict(exclude_unset=True) if hasattr(config_update, 'dict') else config_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(config, key, value)
    db.commit()
    return {"status": "SUCCESS"}

@app.get("/api/config/contact", response_model=schemas.ContactConfig)
async def get_contact_config(db: Session = Depends(get_db)):
    config = db.query(models.ContactConfig).first()
    if not config:
        config = models.ContactConfig()
        db.add(config)
        db.commit()
        db.refresh(config)
    return config

@app.put("/api/config/contact")
async def update_contact_config(config_update: schemas.ContactConfigUpdate, db: Session = Depends(get_db)):
    config = db.query(models.ContactConfig).first()
    if not config:
        config = models.ContactConfig()
        db.add(config)
    update_data = config_update.dict(exclude_unset=True) if hasattr(config_update, 'dict') else config_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(config, key, value)
    db.commit()
    return {"status": "SUCCESS"}

# CMS CRUD: Social Links
@app.get("/api/social_links", response_model=list[schemas.SocialLink])
async def get_social_links(db: Session = Depends(get_db)):
    return db.query(models.SocialLink).all()

@app.post("/api/social_links")
async def add_social_link(link: schemas.SocialLinkCreate, db: Session = Depends(get_db)):
    data = link.dict() if hasattr(link, 'dict') else link.model_dump()
    db_link = models.SocialLink(**data)
    db.add(db_link)
    db.commit()
    db.refresh(db_link)
    return {"status": "SUCCESS"}

@app.delete("/api/social_links/{item_id}")
async def delete_social_link(item_id: str, db: Session = Depends(get_db)):
    db_link = db.query(models.SocialLink).filter(models.SocialLink.id == item_id).first()
    if db_link:
        db.delete(db_link)
        db.commit()
    return {"status": "SUCCESS"}

@app.put("/api/social_links/{item_id}")
async def update_social_link(item_id: str, link: schemas.SocialLinkUpdate, db: Session = Depends(get_db)):
    db_link = db.query(models.SocialLink).filter(models.SocialLink.id == item_id).first()
    if not db_link:
        raise HTTPException(status_code=404, detail="Social Link not found")
    update_data = link.dict(exclude_unset=True) if hasattr(link, 'dict') else link.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_link, key, value)
    db.commit()
    db.refresh(db_link)
    return {"status": "SUCCESS"}


@app.post("/api/contact")
async def process_contact(form: ContactForm):
    """
    Endpoint to process incoming contact form submissions.
    """
    print(f"COMMUNICATION LINK ESTABLISHED:")
    print(f"SENDER: {form.name} <{form.email}>")
    print(f"PAYLOAD: {form.message}")
    
    return {"status": "SUCCESS", "message": "Message payload processed and routed successfully."}
