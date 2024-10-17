const getData = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  return await res.json();
}

export default async function About() {
  const data = await getData();
  return (
    <main>
      <h1>About</h1>
      <ul className="list-disc">
        {data.results.map((element: any) => (<li key={element.id}>{element.name}</li>))}
      </ul>
    </main>
  );
}
