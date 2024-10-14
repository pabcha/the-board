import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="bg-black p-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/blog" className="text-white hover:text-gray-400">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white hover:text-gray-400">
              About us
            </Link>
          </li>
          <li>
            <Link href="/profile" className="text-white hover:text-gray-400">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
