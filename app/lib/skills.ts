export type SvglRoute = string | { light: string; dark: string };

export type Skill = {
  name: string;
  url: string;
  category: string;
  svgl?: SvglRoute;
  emoji?: string;
};

export const skills: Skill[] = [
  {
    name: "JavaScript",
    svgl: "/skills/javascript.svg",
    url: "https://developer.mozilla.org/es/docs/Web/JavaScript",
    category: "Frontend",
  },
  {
    name: "TypeScript",
    svgl: "/skills/typescript.svg",
    url: "https://www.typescriptlang.org/",
    category: "Frontend",
  },
  {
    name: "HTML",
    svgl: "/skills/html5.svg",
    url: "https://developer.mozilla.org/es/docs/Web/HTML",
    category: "Frontend",
  },
  {
    name: "CSS",
    svgl: "/skills/css.svg",
    url: "https://developer.mozilla.org/es/docs/Web/CSS",
    category: "Frontend",
  },
  {
    name: "ReactJS",
    svgl: {
      light: "/skills/react_light.svg",
      dark: "/skills/react_dark.svg",
    },
    url: "https://react.dev/",
    category: "Frontend",
  },
  {
    name: "Next Js",
    svgl: "/skills/nextjs_icon_dark.svg",
    url: "https://nextjs.org/",
    category: "Frontend",
  },
  {
    name: "Astro",
    svgl: {
      light: "/skills/astro-icon-light.svg",
      dark: "/skills/astro-icon-dark.svg",
    },
    url: "https://astro.build/",
    category: "Frontend",
  },
  {
    name: "Vite",
    svgl: "/skills/vite.svg",
    url: "https://vitejs.dev/",
    category: "Frontend",
  },
  {
    name: "TailwindCSS",
    svgl: "/skills/tailwindcss.svg",
    url: "https://tailwindcss.com/",
    category: "Frontend",
  },
  {
    name: "Bootstrap CSS",
    svgl: "/skills/bootstrap.svg",
    url: "https://getbootstrap.com/",
    category: "Frontend",
  },
  {
    name: "Node.js",
    svgl: "/skills/nodejs.svg",
    url: "https://nodejs.org/",
    category: "Backend",
  },
  {
    name: "NestJS",
    svgl: "/skills/nestjs.svg",
    url: "https://nestjs.com/",
    category: "Backend",
  },
  {
    name: "Java",
    svgl: "/skills/java.svg",
    url: "https://www.java.com/",
    category: "Backend",
  },
  {
    name: "Python",
    svgl: "/skills/python.svg",
    url: "https://www.python.org/",
    category: "Backend",
  },
  {
    name: "Spring Boot",
    svgl: "/skills/spring.svg",
    url: "https://spring.io/projects/spring-boot",
    category: "Backend",
  },
  {
    name: "Django",
    svgl: "/skills/django.svg",
    url: "https://www.djangoproject.com/",
    category: "Backend",
  },
  {
    name: "Flask",
    svgl: {
      light: "/skills/flask-light.svg",
      dark: "/skills/flask-dark.svg",
    },
    url: "https://flask.palletsprojects.com/",
    category: "Backend",
  },
  {
    name: "FastAPI",
    svgl: "/skills/fastapi.svg",
    url: "https://fastapi.tiangolo.com/",
    category: "Backend",
  },
  {
    name: "Hibernate",
    emoji: "🐘",
    url: "https://hibernate.org/",
    category: "Backend",
  },
  {
    name: "PostgreSQL",
    svgl: "/skills/postgresql.svg",
    url: "https://www.postgresql.org/",
    category: "Database",
  },
  {
    name: "MySQL",
    svgl: {
      light: "/skills/mysql-icon-light.svg",
      dark: "/skills/mysql-icon-dark.svg",
    },
    url: "https://www.mysql.com/",
    category: "Database",
  },
  {
    name: "SQLite",
    svgl: "/skills/sqlite.svg",
    url: "https://www.sqlite.org/",
    category: "Database",
  },
  {
    name: "MongoDB",
    svgl: {
      light: "/skills/mongodb-icon-light.svg",
      dark: "/skills/mongodb-icon-dark.svg",
    },
    url: "https://www.mongodb.com/",
    category: "Database",
  },
  {
    name: "Docker",
    svgl: "/skills/docker.svg",
    url: "https://www.docker.com/",
    category: "DevOps & Tools",
  },
  {
    name: "AWS",
    svgl: {
      light: "/skills/aws_light.svg",
      dark: "/skills/aws_dark.svg",
    },
    url: "https://aws.amazon.com/",
    category: "DevOps & Tools",
  },
  {
    name: "Git",
    svgl: "/skills/git.svg",
    url: "https://git-scm.com/",
    category: "DevOps & Tools",
  },
  {
    name: "Github",
    svgl: {
      light: "/skills/github_light.svg",
      dark: "/skills/github_dark.svg",
    },
    url: "https://github.com/",
    category: "DevOps & Tools",
  },
  {
    name: "GitLab",
    svgl: "/skills/gitlab.svg",
    url: "https://gitlab.com/",
    category: "DevOps & Tools",
  },
  {
    name: "BASH",
    svgl: {
      light: "/skills/bash.svg",
      dark: "/skills/bash_dark.svg",
    },
    url: "https://www.gnu.org/software/bash/",
    category: "DevOps & Tools",
  },
  {
    name: "GraphQL",
    svgl: "/skills/graphql.svg",
    url: "https://graphql.org/",
    category: "DevOps & Tools",
  },
];
