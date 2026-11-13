
import { NextRequest, NextResponse } from "next/server";
import {
  fetchGitHubData,
  GitHubApiRequestError,
} from "@/lib/github";

export async function GET(request: NextRequest) {
  try {
    // Get username from the request URL
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    // Validate username
    if (!username || !username.trim()) {
      return NextResponse.json(
        { error: "GitHub username is required" },
        { status: 400 }
      );
    }

    // Fetch GitHub profile and repositories
    const data = await fetchGitHubData(username.trim());

    // Return data to the frontend
    return NextResponse.json(data);

  } catch (error) {
    console.error("GitHub API Error:", error);

    // Handle known GitHub API errors
    if (error instanceof GitHubApiRequestError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
