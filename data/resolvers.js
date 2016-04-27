import { Author, Post, View, FortuneCookie } from './connectors'

const resolvers = {
  Query: {
    author(_, args) {     // first arg is a passed value
      return Author.find({ where : args })
    },
    getFortuneCookie(){
      return FortuneCookie.getOne()
    }
  },
  Author: {
    posts(author) {
      return author.getPosts()
    },
  },
  Post: {
    author(post) {
      return post.getAuthor()
    },
    views(post) {
      return View.findOne({ postId: post.id }).then( (view) => view.views )
    }
  },
}

export default resolvers
