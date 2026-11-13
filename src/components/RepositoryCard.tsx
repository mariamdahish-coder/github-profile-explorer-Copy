
import type { GitHubRepository } from "@/types/github";

interface RepositoryCardProps {
  repository: GitHubRepository;
}

export default function RepositoryCard({
  repository,
}: RepositoryCardProps) {
  return (
    <article className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">

      {/* Repository Name */}
      <a
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-semibold text-blue-600 hover:underline"
      >
        {repository.name}
      </a>

      {/* Repository Description */}
      <p className="mt-2 text-sm text-gray-600">
        {repository.description || "No description available."}
      </p>

      {/* Repository Statistics */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
        <span>
          ⭐ {repository.stargazers_count} Stars
        </span>

        <span>
          🍴 {repository.forks_count} Forks
        </span>

        <span>
          Issues: {repository.open_issues_count}
        </span>
      </div>

      {/* Additional Information */}
      <div className="mt-4 border-t border-gray-100 pt-3 text-sm text-gray-500">

        <p>
          <strong>Language:</strong>{" "}
          {repository.language || "Not specified"}
        </p>

        <p className="mt-1">
          <strong>Default Branch:</strong>{" "}
          {repository.default_branch}
        </p>

        <p className="mt-1">
          <strong>Last Updated:</strong>{" "}
          {new Date(repository.updated_at).toLocaleDateString()}
        </p>

      </div>
    </article>
  );
}
