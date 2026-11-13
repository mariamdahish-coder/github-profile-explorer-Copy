
import type {
  GitHubProfile,
  GitHubRepository,
  GitHubApiResponse,
} from "@/types/github";

// Custom error for GitHub API requests
export class GitHubApiRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "GitHubApiRequestError";
    this.status = status;
  }
}

// Fetch all public repositories using pagination
async function fetchAllRepositories(
  username: string
): Promise<GitHubRepository[]> {
  const allRepositories: GitHubRepository[] = [];
  let page = 1;

  while (true) {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&page=${page}&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new GitHubApiRequestError(
        "Failed to fetch repositories from GitHub",
        502
      );
    }

    const repositories: GitHubRepository[] = await response.json();

    allRepositories.push(...repositories);

    if (repositories.length < 100) {
      break;
    }

    page++;
  }

  return allRepositories;
}

// Fetch GitHub profile and repositories
export async function fetchGitHubData(
  username: string
): Promise<GitHubApiResponse> {

  const profileResponse = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    }
  );

  if (profileResponse.status === 404) {
    throw new GitHubApiRequestError(
      "GitHub user not found",
      404
    );
  }

  if (!profileResponse.ok) {
    throw new GitHubApiRequestError(
      "Failed to fetch GitHub profile",
      502
    );
  }

  const profile: GitHubProfile = await profileResponse.json();

  const repositories = await fetchAllRepositories(username);

  return {
    profile,
    repositories,
  };
}
