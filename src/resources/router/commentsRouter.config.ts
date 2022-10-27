import Comments from '@/presentation/pages/Comments/Comments.vue'
import CommnetList from '@/presentation/pages/Comments/CommentList.vue'

export const commentConfig = {
  name: 'comments',
  path: 'comments',
  component: Comments,
  redirect: '/comments/list',
  children: [
    {
      name: 'comment-list',
      path: 'list',
      component: CommnetList,
    },
  ],
}
