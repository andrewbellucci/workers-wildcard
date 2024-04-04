import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export function loader({ request }: LoaderFunctionArgs) { 
  // Get the bordsy subdomain or domain from the request object

  const host = request.headers.get("host");

  // If the host is a subdomain, return a json object with the subdomain
  // If the host is a domain, return a json object with the domain

  if (!host) {
    throw new Response("No host header found", { status: 400 });
  }

  if (host.includes(".mybordsy.com")) {
    return json({
      subdomain: host.split(".")[0],
    });
  }

  return json({
    domain: host,
  })
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();


  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix (with Vite and Cloudflare)</h1>
      {'subdomain' in loaderData ? (
        <p>
          You are on the subdomain: <strong>{loaderData.subdomain}</strong>
        </p>
      ) : (
        <p>
          You are on the domain: <strong>{loaderData.domain}</strong>
        </p>
      )}
    </div>
  );
}
