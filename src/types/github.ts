
export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
}

export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
}

export interface GitHubApiResponse {
  profile: GitHubProfile;
  repositories: GitHubRepository[];
}

export interface GitHubApiError {
  error: string;
}
