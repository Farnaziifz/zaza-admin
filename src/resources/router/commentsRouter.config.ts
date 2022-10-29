import Comments from '@/presentation/pages/Comments/Comments.vue'
import CommnetList from '@/presentation/pages/Comments/CommentList.vue'
import CommentDetails from '../../presentation/pages/Comments/commentDetails.vue'

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
    {
      name: 'comment-detail',
      path: 'details/:id/:oId',
      component: CommentDetails,
    },
  ],
}
