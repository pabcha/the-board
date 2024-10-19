'use client'
import { useUser } from '@clerk/nextjs'

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        Hello, {user?.username} welcome to Clerk
      </div>
    </div>
  );
}
