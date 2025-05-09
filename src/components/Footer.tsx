const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-base text-gray-500 dark:text-gray-300">
            © {new Date().getFullYear()} Chau Kien Luong. All rights reserved.
          </p>
          <div className="mt-4">
            <a
              href="#"
              className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mx-4"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mx-4"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 