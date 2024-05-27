import Tags from '@/presentation/pages/Tags/Tags.vue'
import TagList from '@/presentation/pages/Tags/List.vue'

export const TagsConfig = {
  name: 'tags',
  path: 'tags',
  component: Tags,
  redirect: '/brands/list',
  children: [
    {
      name: 'tags-list',
      path: 'list',
      component: TagList,
    },
  ],
}
