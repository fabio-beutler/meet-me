export default async function ProfilePage() {
  const userData = await fetch('http://localhost:3000/api/me').then((res) => res.json());

  return (
    <div>
      <h1>USER:</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
}
