
import Image from "next/image";
import type {
  GitHubProfile,
  GitHubRepository,
} from "@/types/github";

interface UserComparisonProps {
  firstProfile: GitHubProfile;
  secondProfile: GitHubProfile;
  firstRepositories: GitHubRepository[];
  secondRepositories: GitHubRepository[];
}

export default function UserComparison({
  firstProfile,
  secondProfile,
  firstRepositories,
  secondRepositories,
}: UserComparisonProps) {

  // Calculate total stars for both users
  const firstTotalStars = firstRepositories.reduce(
    (total, repo) => total + repo.stargazers_count,
    0
  );

  const secondTotalStars = secondRepositories.reduce(
    (total, repo) => total + repo.stargazers_count,
    0
  );

  // Calculate total forks for both users
  const firstTotalForks = firstRepositories.reduce(
    (total, repo) => total + repo.forks_count,
    0
  );

  const secondTotalForks = secondRepositories.reduce(
    (total, repo) => total + repo.forks_count,
    0
  );

  // Comparison metrics
  const metrics = [
    {
      label: "Followers",
      firstValue: firstProfile.followers,
      secondValue: secondProfile.followers,
    },
    {
      label: "Following",
      firstValue: firstProfile.following,
      secondValue: secondProfile.following,
    },
    {
      label: "Repositories",
      firstValue: firstRepositories.length,
      secondValue: secondRepositories.length,
    },
    {
      label: "Total Stars",
      firstValue: firstTotalStars,
      secondValue: secondTotalStars,
    },
    {
      label: "Total Forks",
      firstValue: firstTotalForks,
      secondValue: secondTotalForks,
    },
  ];

  return (
    <section className="mt-8">

      {/* User Profiles */}
      <div className="grid gap-5 md:grid-cols-2">

        {/* First User */}
        <div className="rounded-xl border bg-gray-50 p-5 text-center">

          <Image
            src={firstProfile.avatar_url}
            alt={`${firstProfile.login}'s avatar`}
            width={80}
            height={80}
            unoptimized
            className="mx-auto h-20 w-20 rounded-full"
          />

          <h3 className="mt-3 text-lg font-bold text-gray-900">
            {firstProfile.login}
          </h3>

          <p className="text-sm text-gray-500">
            First User
          </p>

          <a
            href={firstProfile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-blue-600 hover:underline"
          >
            View Profile
          </a>

        </div>

        {/* Second User */}
        <div className="rounded-xl border bg-gray-50 p-5 text-center">

          <Image
            src={secondProfile.avatar_url}
            alt={`${secondProfile.login}'s avatar`}
            width={80}
            height={80}
            unoptimized
            className="mx-auto h-20 w-20 rounded-full"
          />

          <h3 className="mt-3 text-lg font-bold text-gray-900">
            {secondProfile.login}
          </h3>

          <p className="text-sm text-gray-500">
            Second User
          </p>

          <a
            href={secondProfile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-blue-600 hover:underline"
          >
            View Profile
          </a>

        </div>

      </div>

      {/* Comparison Table */}
      <div className="mt-6 overflow-x-auto">

        <h3 className="mb-4 text-xl font-bold text-gray-900">
          Comparison Results
        </h3>

        <table className="w-full border-collapse text-center">

          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Metric</th>
              <th className="p-3">{firstProfile.login}</th>
              <th className="p-3">{secondProfile.login}</th>
            </tr>
          </thead>

          <tbody>
            {metrics.map((metric) => (
              <tr key={metric.label} className="border-b">

                <td className="p-3 text-left font-medium">
                  {metric.label}
                </td>

                <td className="p-3">
                  {metric.firstValue.toLocaleString()}
                </td>

                <td className="p-3">
                  {metric.secondValue.toLocaleString()}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </section>
  );
}
