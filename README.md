# GitHub Profile Explorer

A web application built with **Next.js and TypeScript** that allows users to explore GitHub profiles, browse public repositories, analyze repository statistics, and compare two GitHub users.

## Features

### 1. GitHub Profile Search
- Search for any GitHub user by username.
- Display profile avatar, name, username, and bio.
- Show followers, following, and public repository count.
- Provide a direct link to the GitHub profile.

### 2. Repository Explorer
- Fetch and display all public repositories.
- Show repository name, description, programming language, and default branch.
- Display stars, forks, and open issues.
- Show the last updated date.
- Search repositories by name.
- Sort repositories by stars, last updated date, or name.

### 3. Repository Insights
- Calculate total stars and forks across repositories.
- Display the total number of repositories.
- Identify the most popular repository.
- Identify the most recently updated repository.
- Visualize programming language distribution.

### 4. Compare GitHub Users
- Compare two GitHub profiles.
- Compare followers, following, and repository counts.
- Compare total stars and forks.

### 5. Error Handling
- Handle empty username input.
- Display an error when a GitHub user does not exist.
- Handle API request failures.

## Technologies Used

- **Next.js** – React framework and application routing.
- **React** – Building interactive user interfaces.
- **TypeScript** – Type safety and maintainable code.
- **GitHub REST API** – Fetching public profile and repository data.
- **Tailwind CSS** – Styling and responsive layouts.

## Project Structure

```text
github-profile-explorer/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── github/
│   │   │       └── route.ts
│   │   └── page.tsx
│   ├── components/
│   │   ├── ProfileCard.tsx
│   │   ├── RepositoryCard.tsx
│   │   ├── RepositoryInsights.tsx
│   │   └── UserComparison.tsx
│   ├── lib/
│   │   └── github.ts
│   └── types/
│       └── github.ts
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mariamdahish-coder/github-profile-explorer-Copy.git
```

2. Navigate to the project directory:

```bash
cd github-profile-explorer-Copy
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and visit:

```text
http://localhost:3000
```

## API Integration

The application integrates with the GitHub REST API to retrieve public user profiles and repositories.

A Next.js API route handles requests from the frontend:

```text
GET /api/github?username={username}
```

The API retrieves:
- GitHub user profile information.
- All public repositories using pagination.

No additional API key is required for basic public GitHub API access.

## Future Improvements

- AI-powered repository summaries.
- Additional repository analytics.
- Deployment and live demo.

## Author

**Mariam Mahmoud Ahmed Dahish**

GitHub: [@mariamdahish-coder](https://github.com/mariamdahish-coder)
