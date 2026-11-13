
import type { GitHubRepository } from "@/types/github";

interface RepositoryInsightsProps {
  repositories: GitHubRepository[];
}

export default function RepositoryInsights({
  repositories,
}: RepositoryInsightsProps) {

  // Calculate total stars
  const totalStars = repositories.reduce(
    (total, repo) => total + repo.stargazers_count,
    0
  );

  // Calculate total forks
  const totalForks = repositories.reduce(
    (total, repo) => total + repo.forks_count,
    0
  );

  // Find the most popular repository
  const topRepository = [...repositories].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  )[0];

  // Find the most recently updated repository
  const latestRepository = [...repositories].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() -
      new Date(a.updated_at).getTime()
  )[0];

  // Count repositories by programming language
  const languageStats = repositories.reduce<Record<string, number>>(
    (stats, repo) => {
      const language = repo.language || "Not specified";

      stats[language] = (stats[language] || 0) + 1;

      return stats;
    },
    {}
  );

  // Sort languages by repository count
  const sortedLanguages = Object.entries(languageStats).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <section className="mt-10">

      <h2 className="mb-5 text-2xl font-bold text-gray-900">
        Repository Insights
      </h2>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Stars
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            ⭐ {totalStars.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Forks
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            🍴 {totalForks.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Repositories
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {repositories.length}
          </p>
        </div>

      </div>

      {/* Top and Latest Repositories */}
      <div className="mt-5 grid gap-4 md:grid-cols-2">

        {topRepository && (
          <div className="rounded-xl border bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-gray-500">
              Most Popular Repository
            </p>

            <a
              href={topRepository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-lg font-semibold text-blue-600 hover:underline"
            >
              {topRepository.name}
            </a>

            <p className="mt-2 text-gray-600">
              ⭐ {topRepository.stargazers_count.toLocaleString()} Stars
            </p>

          </div>
        )}

        {latestRepository && (
          <div className="rounded-xl border bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-gray-500">
              Recently Updated Repository
            </p>

            <a
              href={latestRepository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-lg font-semibold text-blue-600 hover:underline"
            >
              {latestRepository.name}
            </a>

            <p className="mt-2 text-gray-600">
              Updated:{" "}
              {new Date(
                latestRepository.updated_at
              ).toLocaleDateString()}
            </p>

          </div>
        )}

      </div>

      {/* Programming Languages */}
      <div className="mt-5 rounded-xl border bg-white p-6 shadow-sm">

        <h3 className="text-xl font-bold text-gray-900">
          Programming Languages
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Number of repositories using each language.
        </p>

        <div className="mt-5 space-y-4">

          {sortedLanguages.map(([language, count]) => {
            const percentage =
              (count / repositories.length) * 100;

            return (
              <div key={language}>

                <div className="mb-2 flex justify-between text-sm">

                  <span className="font-medium text-gray-700">
                    {language}
                  </span>

                  <span className="text-gray-500">
                    {count}{" "}
                    {count === 1 ? "repository" : "repositories"}
                  </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-100">

                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${percentage}%` }}
                  />

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}
