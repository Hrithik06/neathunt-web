### Handling routes in prod

`vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/:path*",
      "destination": "/index.html"
    }
  ]
}
```

"source": "/:path\*" matches any incoming URL path (the asterisk is a wildcard).

"destination": "/index.html" tells Vercel to rewrite the request to the index.html file, ensuring your React application loads and the React Router handles the specific route client-side.
