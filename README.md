# Simple Homelab Reachability Test Frontend

This is a simple Homelab Reachability Test Frontend.

## Deployment

Clone this repository and deploy on public web hosting platforms such as [Cloudflare Pages](https://pages.dev), or [Vercel](https://vercel.com), or [AWS Amplify](https://aws.amazon.com/amplify/). Deploying this to local environment is discouraged, since this should be available even if the local environment is unavailable. This is a lightweight and static-file only web service, so there will almost zero deployment cost.

## Environment Variables

- `VITE_SERVER_NAME`: Server Name
- `VITE_REACHABILITY_SERVER_PUBLIC_DOMAIN`
  This should be set if the [Homelab Reachability Test Server](https://github.com/maxswjeon/homelab-server) has valid and registered domain. This will check the server is accessable by domain that is registered on the public DNS.
- `VITE_REACHABILITY_SERVER_PRIVATE_DOMAIN`
  This should be set if the [Homelab Reachability Test Server](https://github.com/maxswjeon/homelab-server)
  1. uses internal DNS servers and want to check its setup
  2. has no valid and registered domain, so uses internal CA and internal DNS
- `VITE_REACHABILITY_SERVER_PORT`
  This is the port of the [Homelab Reachability Test Server](https://github.com/maxswjeon/homelab-server)
- `VITE_REACHABILITY_SERVER_PATH`
  If there is a reverse proxy server in front of it, and the [Homelab Reachability Test Server](https://github.com/maxswjeon/homelab-server) is available by a prefix, set this variable.
- `VIET_REACHABILITY_SERVER_TIMEOUT`
  The timeout in milliseconds to wait for an response from [Homelab Reachability Test Server](https://github.com/maxswjeon/homelab-server)

## See also

[Homelab Reachability Test Server](https://github.com/maxswjeon/homelab-server)
