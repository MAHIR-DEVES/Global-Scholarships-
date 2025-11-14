import { Mail, Twitter, Linkedin, Globe } from "lucide-react";

export function AuthorCard({ author }) {
  return (
    <div className="mt-12 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <h3 className="mb-6 text-2xl font-bold text-gray-900">
        About the Author
      </h3>
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        {/* Author Avatar */}
        <div className="h-24 w-24 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
            <span className="text-3xl font-bold text-gray-700">
              {author.name[0]}
            </span>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-1 text-center md:text-left">
          <h4 className="mb-2 text-xl font-bold text-gray-900">
            {author.name}
          </h4>
          <p className="mb-4 text-gray-600">
            Scholarship expert and education consultant with over 10 years of
            experience helping students achieve their academic dreams.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-3 md:justify-start">
            <a
              href={`mailto:${author.email}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-all hover:bg-blue-600 hover:text-white"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-all hover:bg-blue-400 hover:text-white">
              <Twitter className="h-4 w-4" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-all hover:bg-blue-700 hover:text-white">
              <Linkedin className="h-4 w-4" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-all hover:bg-green-600 hover:text-white">
              <Globe className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
