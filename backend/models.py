from sqlalchemy import Column, String, Boolean
from database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Project(Base):
    __tablename__ = "projects"
    id = Column(String, primary_key=True, index=True, default=generate_uuid)
    title = Column(String, index=True)
    status = Column(String)
    tags = Column(String)
    github_url = Column(String, nullable=True)
    video_url = Column(String, nullable=True)
    description = Column(String)
    is_published = Column(Boolean, default=True)

class Log(Base):
    __tablename__ = "logs"
    id = Column(String, primary_key=True, index=True, default=generate_uuid)
    type = Column(String)
    title = Column(String)
    organization = Column(String)
    date = Column(String)
    location = Column(String)
    description = Column(String)
    is_published = Column(Boolean, default=True)

class Skill(Base):
    __tablename__ = "skills"
    name = Column(String, primary_key=True, index=True)

class IdentityConfig(Base):
    __tablename__ = "identity_config"
    id = Column(String, primary_key=True, default="default")
    name = Column(String, default="Brahma Teja Jampu")
    title = Column(String, default="Autonomy & Systems Engineer")
    logo_text = Column(String, default="B.TEJA")
    profile_image_url = Column(String, default="")

class HeroConfig(Base):
    __tablename__ = "hero_config"
    id = Column(String, primary_key=True, default="default")
    title = Column(String, default="Engineering the Future of Autonomy.")
    subtitle = Column(String, default="Robotics enthusiast and Founder.")
    action_text = Column(String, default="Access Modules")

class AboutConfig(Base):
    __tablename__ = "about_config"
    id = Column(String, primary_key=True, default="default")
    text = Column(String, default="I am passionate about applying my skills to create innovative solutions in robotics and automation.")
    resume_url = Column(String, default="")

class ContactConfig(Base):
    __tablename__ = "contact_config"
    id = Column(String, primary_key=True, default="default")
    email = Column(String, default="jbteja1512@gmail.com")
    phone = Column(String, default="+91 8185865120")
    location = Column(String, default="Erlangen, Germany")

class SocialLink(Base):
    __tablename__ = "social_links"
    id = Column(String, primary_key=True, index=True, default=generate_uuid)
    platform = Column(String)  # e.g., LinkedIn, GitHub, Twitter
    url = Column(String)
    icon = Column(String) # lucide icon name
