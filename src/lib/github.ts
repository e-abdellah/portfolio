export type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics?: string[];
  technologies?: string[];
};

const USERNAME = "AbdellahElh";
const EXCLUDE = new Set([
  "project",
  "pwd-manager-backend", // Exclude sub-repos of the monorepo
  "pwd-manager-frontend",
  "bachelor-thesis",
  "portfolio",
]);

function byName(name: string) {
  return (r: Repo) => r.name.toLowerCase() === name.toLowerCase();
}

export async function fetchRepos(): Promise<Repo[]> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };

    // Add GitHub token if available (for higher rate limits)
    const token = import.meta.env.GITHUB_TOKEN;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
      { headers }
    );

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`GitHub API Error: ${res.status} - ${errorBody}`);
      throw new Error(`GitHub API: ${res.status}`);
    }

    const repos: Repo[] = await res.json();

    // Filter out excluded
    let filtered = repos.filter((r) => !EXCLUDE.has(r.name.toLowerCase()));

    // Enhanced project data with proper names, descriptions, and technologies
    const enhancedRepos = filtered.map((repo) => {
      const enhanced = { ...repo };

      switch (repo.name.toLowerCase()) {
        case "pwd-manager":
          enhanced.name = "Password Manager (Full Stack)";
          enhanced.description =
            "A web-based password manager featuring face authentication instead of traditional master passwords. Built with modern security practices and accessibility in mind, this full-stack application provides secure password storage with biometric authentication and and served as the proof of concept for evaluating my bachelor’s thesis";
          enhanced.technologies = [
            "TypeScript",
            "Node.js",
            "Express",
            "React",
            "Prisma",
            "PostgreSQL",
            "Face API",
            "JWT",
            "Bcrypt",
          ];
          enhanced.topics = [
            "password-manager",
            "face-authentication",
            "security",
            "biometric",
            "full-stack",
            "typescript",
          ];
          break;

        case "pwd-manager-backend":
          enhanced.name = "Password Manager API";
          enhanced.description =
            "RESTful API backend for the password manager application. Built with Node.js, Express, and TypeScript, featuring secure password encryption, user authentication, and comprehensive API endpoints for managing user credentials and biometric authentication data.";
          enhanced.technologies = [
            "Node.js",
            "Express",
            "TypeScript",
            "Prisma",
            "PostgreSQL",
            "JWT",
            "Bcrypt",
            "CORS",
          ];
          enhanced.topics = [
            "api",
            "backend",
            "authentication",
            "security",
            "nodejs",
            "express",
          ];
          break;

        case "pwd-manager-frontend":
          enhanced.name = "Password Manager Web App";
          enhanced.description =
            "Modern React-based frontend for the password manager with face authentication. Features an intuitive UI for password management, secure vault operations, and seamless biometric authentication integration. Built with accessibility and user experience as top priorities.";
          enhanced.technologies = [
            "React",
            "TypeScript",
            "CSS3",
            "HTML5",
            "Face API",
            "Axios",
            "React Router",
          ];
          enhanced.topics = [
            "react",
            "frontend",
            "face-authentication",
            "password-manager",
            "accessibility",
          ];
          break;

        case "lumiere-web":
          enhanced.name = "Lumière Cinema Chain Website";
          enhanced.description =
            "A web platform for Lumière, Belgium's leading cinema chain. This full-featured website provides movie listings, showtimes, ticket booking, and cinema information. Built entirely with .NET framework for both frontend and backend, delivering a seamless movie-going experience.";
          enhanced.technologies = [
            ".NET Framework",
            "C#",
            "ASP.NET",
            "Entity Framework",
            "SQL Server",
            "Razor",
            "CSS3",
            "JavaScript",
          ];
          enhanced.topics = [
            "dotnet",
            "cinema",
            "booking-system",
            "entertainment",
            "web-application",
          ];
          break;

        case "lumiere-app":
          enhanced.name = "Lumière Mobile App";
          enhanced.description =
            "Android mobile application for the Lumière cinema chain. Browse movies, check showtimes, manage favorites, and book tickets from your phone. Built with Kotlin and modern Android architecture for a smooth, responsive experience.";
          enhanced.technologies = [
            "Kotlin",
            "Android",
            "Jetpack Compose",
            "MVVM",
            "Coroutines",
            "Flow",
            "Retrofit",
            "Room",
            "Hilt",
          ];
          enhanced.topics = [
            "android",
            "kotlin",
            "cinema",
            "booking",
            "mobile",
            "jetpack-compose",
          ];
          break;

        case "olympic_games":
          enhanced.name = "Olympic Games Management System";
          enhanced.description =
            "A Java-based application for managing Olympic Games events, athletes, and competitions. Features event scheduling, athlete registration, results tracking, and comprehensive reporting. Demonstrates object-oriented programming principles and database management in Java.";
          enhanced.technologies = [
            "Java",
            "Spring",
            "JavaFX",
            "FXML",
            "Mockito",
            "JDBC",
            "MySQL",
            "Maven",
            "JUnit",
          ];
          enhanced.topics = [
            "java",
            "olympics",
            "sports-management",
            "database",
            "desktop-application",
          ];
          break;

        case "bachelor-thesis":
          enhanced.name = "Bachelor Thesis - Computer Science";
          enhanced.description =
            "Academic research thesis exploring advanced topics in computer science and software engineering. Written in LaTeX with comprehensive research, analysis, and technical documentation. Demonstrates academic writing skills and deep technical knowledge in the chosen research area.";
          enhanced.technologies = [
            "LaTeX",
            "BibTeX",
            "Academic Research",
            "Technical Writing",
          ];
          enhanced.topics = [
            "thesis",
            "academic",
            "research",
            "computer-science",
            "latex",
          ];
          break;

        case "abdellah-portfolio-astro":
          enhanced.name = "Personal Portfolio Website";
          enhanced.description =
            "A modern, fast, and responsive portfolio website built with Astro framework. Features automatic GitHub integration, project showcases, certificate displays, and optimized performance. Showcases web development skills with cutting-edge technologies and clean design principles.";
          enhanced.technologies = [
            "Astro",
            "TypeScript",
            "Tailwind CSS",
            "GitHub API",
            "Responsive Design",
          ];
          enhanced.topics = [
            "portfolio",
            "astro",
            "tailwind",
            "responsive",
            "web-development",
          ];
          break;
      }

      return enhanced;
    });

    // Merge Appointment-app-front & Appointment-app-back if they exist
    const front =
      enhancedRepos.find(byName("appointment-app-front")) ||
      enhancedRepos.find(byName("appointment-app-frontend"));
    const back =
      enhancedRepos.find(byName("appointment-app-back")) ||
      enhancedRepos.find(byName("appointment-app-backend"));

    let finalRepos = enhancedRepos;

    if (front || back) {
      // Remove the individuals
      finalRepos = enhancedRepos.filter(
        (r) => ![front?.name, back?.name].includes(r.name)
      );

      finalRepos.unshift({
        name: "Medical Appointment Booking Platform",
        description:
          "A full-stack medical appointment booking platform featuring patient registration, doctor scheduling, and administrative management. Built with modern web technologies to streamline healthcare appointment processes with secure authentication and real-time availability updates.",
        html_url:
          front?.html_url || back?.html_url || `https://github.com/${USERNAME}`,
        homepage: front?.homepage || back?.homepage || null,
        stargazers_count: Math.max(
          front?.stargazers_count || 0,
          back?.stargazers_count || 0
        ),
        language: front?.language || back?.language || "TypeScript",
        topics: [
          "react",
          "node",
          "express",
          "booking",
          "healthcare",
          "medical",
          "appointment",
        ],
        technologies: [
          "React",
          "Node.js",
          "Express",
          "TypeScript",
          "MongoDB",
          "JWT",
          "Material-UI",
          "API Integration",
        ],
      });
    }

    // Inject manual projects that may not exist on GitHub
    const hasBachelorThesis = finalRepos.some(
      (r) =>
        r.name.toLowerCase() === "bachelor thesis - computer science" ||
        r.name.toLowerCase() === "bachelor-thesis" ||
        r.topics?.includes("thesis")
    );

    // Sort by stars then name
    finalRepos.sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count || a.name.localeCompare(b.name)
    );

    // Ensure pwd-manager (monorepo) appears first if present
    const pwdIdx = finalRepos.findIndex((r) =>
      r.html_url?.toLowerCase().includes("/pwd-manager")
    );
    if (pwdIdx > 0) {
      const [pwd] = finalRepos.splice(pwdIdx, 1);
      finalRepos.unshift(pwd);
    }
    return finalRepos;
  } catch (err) {
    console.error(err);
    return [];
  }
}
