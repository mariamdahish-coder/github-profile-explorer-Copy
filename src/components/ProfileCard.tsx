
import Image from "next/image";
import type { GitHubProfile } from "@/types/github";

interface ProfileCardProps {
  profile: GitHubProfile;
}

export default function ProfileCard({
  profile,
}: ProfileCardProps) {
  return (
    <section className="mt-10 rounded-xl border bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

        <Image
          src={profile.avatar_url}
          alt={`${profile.login}'s avatar`}
          width={112}
          height={112}
          unoptimized
          className="h-28 w-28 rounded-full"
        />

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {profile.name || profile.login}
          </h2>

          <p className="text-gray-500">
            @{profile.login}
          </p>

          {profile.bio && (
            <p className="mt-2 text-gray-700">
              {profile.bio}
            </p>
          )}

          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-blue-600 hover:underline"
          >
            View GitHub Profile →
          </a>
        </div>

      </div>

      {/* Profile Statistics */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">

        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-2xl font-bold">
            {profile.public_repos}
          </p>
          <p className="text-sm text-gray-500">
            Repositories
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-2xl font-bold">
            {profile.followers.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Followers
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-2xl font-bold">
            {profile.following.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Following
          </p>
        </div>

      </div>
    </section>
  );
}
