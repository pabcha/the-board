import Link from "next/link";

export default function Blog() {
  return (
    <main>
      <h1>Blog</h1>
      <ul>
        <li><Link href="blog/10">Articulo 10</Link></li>
        <li><Link href="blog/257">Articulo 257</Link></li>
        <li><Link href="blog/68">Articulo 68</Link></li>
      </ul>
    </main>
  );
}
