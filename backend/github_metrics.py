import httpx
import asyncio
from typing import Dict, Any, List

GITHUB_USERNAME = "brahmatejajampu"
GITHUB_API_URL = f"https://api.github.com/users/{GITHUB_USERNAME}/repos"

async def fetch_github_metrics() -> Dict[str, Any]:
    """
    Fetches real-time metrics for the user's public GitHub repositories.
    Returns aggregated star counts, total repos, and a list of active projects.
    """
    async with httpx.AsyncClient() as client:
        try:
            # Add headers to avoid rate limiting issues where possible, 
            # and specify the API version.
            headers = {"Accept": "application/vnd.github.v3+json"}
            response = await client.get(GITHUB_API_URL, headers=headers, timeout=10.0)
            
            if response.status_code != 200:
                return {"error": f"GitHub API returned status code {response.status_code}", "status": "OFFLINE"}
                
            repos = response.json()
            
            total_stars = sum(repo.get("stargazers_count", 0) for repo in repos)
            total_repos = len(repos)
            
            # Sort repositories by recent updates to highlight active deployment status
            sorted_repos = sorted(repos, key=lambda x: x.get("updated_at", ""), reverse=True)
            
            # Extract the top 3 most recently active repositories
            active_projects = []
            for repo in sorted_repos[:3]:
                active_projects.append({
                    "name": repo.get("name"),
                    "url": repo.get("html_url"),
                    "description": repo.get("description"),
                    "language": repo.get("language"),
                    "stars": repo.get("stargazers_count"),
                    "updated_at": repo.get("updated_at")
                })
                
            return {
                "status": "ONLINE",
                "system_metrics": {
                    "total_repositories": total_repos,
                    "total_stars": total_stars,
                },
                "active_deployments": active_projects
            }
            
        except Exception as e:
            return {"error": str(e), "status": "OFFLINE"}

if __name__ == "__main__":
    # Local test execution
    metrics = asyncio.run(fetch_github_metrics())
    print("GitHub Metrics System Initialized:")
    print(metrics)
