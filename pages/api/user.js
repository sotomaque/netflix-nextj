import { getSession } from 'next-auth/client';

export default async (req, res) => {
  const session = await getSession({ req });

  console.log('session', session);

  if (session) {
    res.send(session.user);
  } else {
    res.send({
      error: 'You must be authenticated to see this route.',
    });
  }
};
