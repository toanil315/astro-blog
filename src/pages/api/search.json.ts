import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export const GET: APIRoute = async ({ url }): Response => {
  const query: srting | null = url.searchParams.get("q");
  console.log(query);

  if (!query) {
    return new Response(JSON.stringify({ error: "No query provided" }), {
      status: 400,
    });
  }

  const allBlogArticles: CollectionEntry<"blog">[] = await getCollection(
    "blog"
  );
  const filteredArticles = query
    ? allBlogArticles.filter((article) =>
        article.data.title.toLowerCase().includes(query.toLowerCase())
      )
    : allBlogArticles;

  return new Response(JSON.stringify(filteredArticles), {
    status: 200,
  });
};
