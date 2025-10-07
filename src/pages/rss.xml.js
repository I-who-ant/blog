import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  const sorted = posts.sort((a, b) => {
    const dateA = new Date(a.data.date || 0).getTime();
    const dateB = new Date(b.data.date || 0).getTime();
    return dateB - dateA;
  });

  return rss({
    title: 'seeback の blog',
    description: '记录日常思考、学习心得与折腾笔记。',
    site: context.site?.toString() ?? 'https://example.com',
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description || post.data.excerpt || '',
      pubDate: post.data.date ? new Date(post.data.date) : undefined,
      link: `/blog/${post.slug}/`,
    })),
  });
}
