/* eslint-disable @typescript-eslint/no-explicit-any */

const FIREBASE_DB_URL = process.env.FIREBASE_DB_URL;

if (!FIREBASE_DB_URL) {
  throw new Error("FIREBASE_DB_URL is not defined");
}

export async function configLog({
  request,
  params,
  body,
}: {
  request: Request;
  params: { "*": string };
  body: Record<string, any>;
}) {
  const data = body;
  const method = request.method;

  const res = await fetch(`${FIREBASE_DB_URL}/${params["*"]}.json`, {
    method: method,
    body: JSON.stringify(data),
  });
  const resText = await res.json();
  return {
    status: res.status,
    body: resText,
  };
}

export default configLog;
