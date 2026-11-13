
"use client";

import { useState } from "react";

import ProfileCard from "@/components/ProfileCard";
import RepositoryCard from "@/components/RepositoryCard";
import RepositoryInsights from "@/components/RepositoryInsights";
import UserComparison from "@/components/UserComparison";

import type {
  GitHubProfile,
  GitHubRepository,
  GitHubApiResponse,
} from "@/types/github";

export default function Home() {
  // Main user state
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);

  // Comparison user state
  const [compareUsername, setCompareUsername] = useState("");
  const [compareProfile, setCompareProfile] =
    useState<GitHubProfile | null>(null);
  const [compareRepositories, setCompareRepositories] =
    useState<GitHubRepository[]>([]);

  // UI state
  const [sortBy, setSortBy] = useState("stars");
  const [repoSearch, setRepoSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [compareLoading, setCompareLoading] = useState(false);
  const [error, setError] = useState("");
  const [compareError, setCompareError] = useState("");

  // Filter repositories
  const filteredRepositories = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(repoSearch.toLowerCase().trim())
  );

  // Sort repositories
  const sortedRepositories = [...filteredRepositories].sort((a, b) => {
    if (sortBy === "stars") {
      return b.stargazers_count - a.stargazers_count;
    }

    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "updated") {
      return (
        new Date(b.updated_at).getTime() -
        new Date(a.updated_at).getTime()
      );
    }

    return 0;
  });

  // Search GitHub user
  async function handleSearch() {
    const cleanUsername = username.trim();

    if (!cleanUsername) {
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    setError("");

    setProfile(null);
    setRepositories([]);

    setCompareProfile(null);
    setCompareRepositories([]);
    setCompareUsername("");
    setCompareError("");

    setRepoSearch("");

    try {
      const response = await fetch(
        `/api/github?username=${encodeURIComponent(cleanUsername)}`
      );

      const data: GitHubApiResponse | { error: string } =
        await response.json();

      if (!response.ok) {
        throw new Error(
          "error" in data ? data.error : "Something went wrong."
        );
      }

      if ("error" in data) {
        throw new Error(data.error);
      }

      setProfile(data.profile);
      setRepositories(data.repositories);

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch GitHub data."
      );
    } finally {
      setLoading(false);
    }
  }

  // Compare with another GitHub user
  async function handleCompare() {
    const cleanCompareUsername = compareUsername.trim();

    if (!profile) {
      setCompareError(
        "Please search for the first user before comparing."
      );
      return;
    }

    if (!cleanCompareUsername) {
      setCompareError("Please enter the second GitHub username.");
      return;
    }

    if (
      cleanCompareUsername.toLowerCase() ===
      profile.login.toLowerCase()
    ) {
      setCompareError("Please enter a different GitHub username.");
      return;
    }

    setCompareLoading(true);
    setCompareError("");
    setCompareProfile(null);
    setCompareRepositories([]);

    try {
      const response = await fetch(
        `/api/github?username=${encodeURIComponent(cleanCompareUsername)}`
      );

      const data: GitHubApiResponse | { error: string } =
        await response.json();

      if (!response.ok) {
        throw new Error(
          "error" in data ? data.error : "Unable to compare users."
        );
      }

      if ("error" in data) {
        throw new Error(data.error);
      }

      setCompareProfile(data.profile);
      setCompareRepositories(data.repositories);

    } catch (err) {
      setCompareError(
        err instanceof Error
          ? err.message
          : "Failed to compare GitHub users."
      );
    } finally {
      setCompareLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">

        {/* Page Header */}
        <h1 className="text-3xl font-bold text-gray-900">
          GitHub Profile Explorer
        </h1>

        <p className="mt-2 text-gray-600">
          Explore GitHub profiles and repositories.
        </p>

        {/* Main User Search */}
        <div className="mt-8 flex gap-3">

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Enter GitHub username..."
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="rounded-lg bg-gray-900 px-6 py-3 font-medium text-white hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>

        </div>

        {/* Search Error */}
        {error && (
          <p className="mt-6 rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </p>
        )}

        {/* Loading Message */}
        {loading && (
          <p className="mt-6 text-gray-600">
            Loading GitHub profile...
          </p>
        )}

        {/* Profile Component */}
        {profile && (
          <ProfileCard profile={profile} />
        )}

        {/* Repository Insights Component */}
        {profile && repositories.length > 0 && (
          <RepositoryInsights repositories={repositories} />
        )}

        {/* Compare Users Section */}
        {profile && (
          <section className="mt-10 rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-2xl font-bold text-gray-900">
              Compare GitHub Users
            </h2>

            <p className="mt-2 text-gray-600">
              Enter another GitHub username to compare both profiles.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">

              <input
                type="text"
                value={compareUsername}
                onChange={(e) => setCompareUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCompare();
                }}
                placeholder="Enter another GitHub username..."
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              />

              <button
                onClick={handleCompare}
                disabled={compareLoading}
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {compareLoading ? "Comparing..." : "Compare Users"}
              </button>

            </div>

            {compareError && (
              <p className="mt-4 rounded-lg bg-red-100 p-4 text-red-700">
                {compareError}
              </p>
            )}

            {compareLoading && (
              <p className="mt-4 text-gray-600">
                Loading second GitHub profile...
              </p>
            )}

            {/* Comparison Component */}
            {compareProfile && (
              <UserComparison
                firstProfile={profile}
                secondProfile={compareProfile}
                firstRepositories={repositories}
                secondRepositories={compareRepositories}
              />
            )}

          </section>
        )}

        {/* Repositories Section */}
        {profile && repositories.length > 0 && (
          <section className="mt-10">

            <h2 className="mb-5 text-2xl font-bold text-gray-900">
              Repositories ({sortedRepositories.length} of {repositories.length})
            </h2>

            {/* Search and Sorting */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row">

              <input
                type="text"
                value={repoSearch}
                onChange={(e) => setRepoSearch(e.target.value)}
                placeholder="Search repositories by name..."
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="stars">Most Stars</option>
                <option value="updated">Recently Updated</option>
                <option value="name">Name (A–Z)</option>
              </select>

            </div>

            {/* Repository Cards */}
            {sortedRepositories.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">

                {sortedRepositories.map((repo) => (
                  <RepositoryCard
                    key={repo.id}
                    repository={repo}
                  />
                ))}

              </div>
            ) : (
              <p className="rounded-lg bg-white p-6 text-gray-600">
                No repositories match your search.
              </p>
            )}

          </section>
        )}

        {/* Empty Repositories Message */}
        {profile && repositories.length === 0 && (
          <p className="mt-6 text-gray-600">
            This user has no public repositories.
          </p>
        )}

      </div>
    </main>
  );
}
