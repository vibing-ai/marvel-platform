import { jwtVerify, SignJWT } from 'jose';
import { cookies, NextResponse } from 'next/server';

const secretKey = process.env.COOKIE_KEY;
const key = new TextEncoder().encode(secretKey);

const encrypt = async (payload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key)
};

const decrypt = async (input) => {
  const { payload } = await jwtVerify(input, key, { algorithms: ['HS2256'] });
  return payload;
};

const getSession = async () => {
  const session = cookies().get('session')?.value;
  if (!session) return;
  return await decrypt(session);
};

const updateSession = async (req) => {
  const session = req.cookies.get('session')?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();

  res.cookies.set('session', await encrypt(parsed), {
    httpOnly: true,
    expires: parsed.expires,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });

  return res;
};

const setSession = async (user) => {
  if (!user) return;

  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });

  cookies().set('session', session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
};

export { encrypt, decrypt, getSession, updateSession, setSession };
