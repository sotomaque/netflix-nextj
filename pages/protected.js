import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';

export default function Page() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected');
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <>
        <div>Access Denied</div>
      </>
    );
  }

  // If session exists, display content
  return (
    <div>
      <h1>Protected Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
