import Blog from '@/presentation/pages/Blog/Blog.vue'
import TagList from '@/presentation/pages/Blog/tagList.vue'
export const BlogConfig = {
  name: 'blog',
  path: 'blog',
  component: Blog,
  redirect: '/blog/list',
  children: [
    {
      name: 'blog-tags-list',
      path: 'tag-list',
      component: TagList,
    },
  ],
}
