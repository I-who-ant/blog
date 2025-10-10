import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  const sorted = posts.toSorted((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'seeback の blog',
    description: '记录日常思考、学习心得与折腾笔记。',
    site: context.site?.toString() ?? 'https://seeback.xyz',
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description || post.data.excerpt || '',
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
    })),
  });
}
