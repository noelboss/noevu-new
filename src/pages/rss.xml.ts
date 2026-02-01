import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const blogEntries = await getCollection('blog');

  const items = blogEntries
    .map((entry) => ({
      title: entry.data.title,
      pubDate: new Date(entry.data.publishedAt),
      description: entry.data.excerpt,
      link: `/blog/${entry.data.slug || entry.id.replace(/\.md$/, '')}/`,
      categories: entry.data.categories || [],
    }))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Noevu Blog - Webdesign & Digitale Strategien',
    description: 'Tipps, Insights und News rund um Webdesign, Squarespace und AI für Schweizer KMU.',
    site: context.site || 'https://noevu.ch',
    items,
    customData: `<language>de-ch</language>`,
  });
};
