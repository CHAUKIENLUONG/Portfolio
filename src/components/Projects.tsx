// Add this interface at the top of the file
interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live: string;
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: 'Project One',
      description: 'A full-stack web application built with React, Node.js, and MongoDB.',
      image: 'img/warehouse.png',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/CHAUKIENLUONG/client-warehouse-management-web.git',
      live: '#',
    },
    {
      title: 'Project Two',
      description: 'An e-commerce platform with real-time inventory management.',
      image: 'img/cinema.png',
      technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
      github: 'https://github.com/CHAUKIENLUONG/B-talk.git',
      live: '#',
    },
    {
      title: 'Project Three',
      description: 'A social media dashboard with analytics and reporting features.',
      image: 'https://via.placeholder.com/500x300',
      technologies: ['React', 'GraphQL', 'PostgreSQL', 'Docker'],
      github: '#',
      live: '#',
    },
  ]

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 
            data-aos="fade-up"
            className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
          >
            My Projects
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-4 text-lg text-gray-500 dark:text-gray-300"
          >
            Here are some of my recent works
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.title}
              data-aos="fade-up"
              data-aos-delay={300 + index * 200}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-300">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects 