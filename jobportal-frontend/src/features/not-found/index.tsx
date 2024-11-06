import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-2 text-xl">
      <h1 className="text-5xl font-bold">404 Not Found</h1>
      <h2>The page you are looking for doesn't exist</h2>
      <p>
        Back to{' '}
        <Link to="/" className="text-secondary-500 hover:border-b-secondary-500 font-bold hover:border-b-2">
          Home
        </Link>{' '}
        page
      </p>
    </main>
  );
}
