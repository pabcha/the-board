export default function BlogDetails({ params }: {
  params: { blogId: string }
}) {
  return (
    <main>
      <h1>Blog Id {params.blogId} details</h1>
    </main>
  );
}
