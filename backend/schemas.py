from pydantic import BaseModel
from typing import Optional

class ProjectBase(BaseModel):
    title: str
    status: str
    tags: str
    github_url: Optional[str] = None
    video_url: Optional[str] = None
    description: str
    is_published: bool = True

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    status: Optional[str] = None
    tags: Optional[str] = None
    github_url: Optional[str] = None
    video_url: Optional[str] = None
    description: Optional[str] = None
    is_published: Optional[bool] = None

class Project(ProjectBase):
    id: str
    class Config:
        from_attributes = True

class LogBase(BaseModel):
    type: str
    title: str
    organization: str
    date: str
    location: str
    description: str
    is_published: bool = True

class LogCreate(LogBase):
    pass

class LogUpdate(BaseModel):
    type: Optional[str] = None
    title: Optional[str] = None
    organization: Optional[str] = None
    date: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    is_published: Optional[bool] = None

class Log(LogBase):
    id: str
    class Config:
        from_attributes = True

class SkillBase(BaseModel):
    skill: str

class Skill(SkillBase):
    class Config:
        from_attributes = True

class IdentityConfigBase(BaseModel):
    name: str
    title: str
    logo_text: str
    profile_image_url: str

class IdentityConfigUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    logo_text: Optional[str] = None
    profile_image_url: Optional[str] = None

class IdentityConfig(IdentityConfigBase):
    id: str
    class Config:
        from_attributes = True

class HeroConfigBase(BaseModel):
    title: str
    subtitle: str
    action_text: str

class HeroConfigUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    action_text: Optional[str] = None

class HeroConfig(HeroConfigBase):
    id: str
    class Config:
        from_attributes = True

class AboutConfigBase(BaseModel):
    text: str
    resume_url: str

class AboutConfigUpdate(BaseModel):
    text: Optional[str] = None
    resume_url: Optional[str] = None

class AboutConfig(AboutConfigBase):
    id: str
    class Config:
        from_attributes = True

class ContactConfigBase(BaseModel):
    email: str
    phone: str
    location: str

class ContactConfigUpdate(BaseModel):
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None

class ContactConfig(ContactConfigBase):
    id: str
    class Config:
        from_attributes = True

class SocialLinkBase(BaseModel):
    platform: str
    url: str
    icon: str

class SocialLinkCreate(SocialLinkBase):
    pass

class SocialLinkUpdate(BaseModel):
    platform: Optional[str] = None
    url: Optional[str] = None
    icon: Optional[str] = None

class SocialLink(SocialLinkBase):
    id: str
    class Config:
        from_attributes = True
