import Blog from '@/presentation/pages/Blog/Blog.vue'
import TagList from '@/presentation/pages/Blog/tagList.vue'
import AddTag from '@/presentation/pages/Blog/addTag.vue'
import BlogList from '@/presentation/pages/Blog/BlogList.vue'

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
    {
      name: 'blog-tags-add',
      path: 'tag-add',
      component: AddTag,
    },
    {
      name: 'blog-list',
      path: 'list',
      component: BlogList,
    },
  ],
}
