from enum import Enum


class ProjectType(str, Enum):
    """Project type options."""
    WEB_APP = "web_app"
    API = "api"
    DATA_ANALYSIS = "data_analysis"
    DOCUMENTATION = "documentation"
    DATABASE = "database"
    GENERAL = "general"


class ProjectStatus(str, Enum):
    """Project status options."""
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"
    ARCHIVED = "archived"


# Project type metadata for UI
PROJECT_TYPE_METADATA = {
    ProjectType.WEB_APP: {
        "label": "Web Application",
        "description": "Full-stack web application with frontend and backend",
        "icon": "🌐",
        "suggested_agents": ["Frontend Developer", "Backend Developer", "UI Designer"]
    },
    ProjectType.API: {
        "label": "API Development",
        "description": "RESTful or GraphQL API service",
        "icon": "🔌",
        "suggested_agents": ["Backend Developer", "API Architect"]
    },
    ProjectType.DATA_ANALYSIS: {
        "label": "Data Analysis",
        "description": "Data science, analytics, or ML project",
        "icon": "📊",
        "suggested_agents": ["Data Scientist", "Python Developer"]
    },
    ProjectType.DOCUMENTATION: {
        "label": "Documentation",
        "description": "Technical documentation or content writing",
        "icon": "📝",
        "suggested_agents": ["Technical Writer", "Documentation Specialist"]
    },
    ProjectType.DATABASE: {
        "label": "Database Design",
        "description": "Database schema, queries, and optimization",
        "icon": "🗄️",
        "suggested_agents": ["Database Expert", "SQL Specialist"]
    },
    ProjectType.GENERAL: {
        "label": "General Project",
        "description": "Custom project with flexible workflow",
        "icon": "📁",
        "suggested_agents": ["General Assistant"]
    }
}


# Status metadata for UI
PROJECT_STATUS_METADATA = {
    ProjectStatus.ACTIVE: {
        "label": "Active",
        "color": "green",
        "icon": "🟢"
    },
    ProjectStatus.PAUSED: {
        "label": "Paused",
        "color": "yellow",
        "icon": "⏸️"
    },
    ProjectStatus.COMPLETED: {
        "label": "Completed",
        "color": "blue",
        "icon": "✅"
    },
    ProjectStatus.ARCHIVED: {
        "label": "Archived",
        "color": "gray",
        "icon": "📦"
    }
}
