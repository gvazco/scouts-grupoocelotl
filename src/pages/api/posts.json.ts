import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const response = await fetch(`${import.meta.env.WPGRAPHQL_URL}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query AllPosts {
        posts(first: 1000) {
          nodes {
            databaseId
            featuredImage {
              node {
                sourceUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            title
            uri
            excerpt
            content
            tags {
              nodes {
                name
              }
            }
          }
        }
      }
      `,
    }),
  });
  const { data } = await response.json();
  return new Response(JSON.stringify({ posts: data.posts.nodes }));
};
