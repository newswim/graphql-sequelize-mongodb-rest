// define how resolve function are connected to the database

// Give us an ORM without having to install a full SQL instance
import Sequelize from 'sequelize'
import casual from 'casual'
import _ from 'lodash'
import Mongoose from 'mongoose'
import rp from 'request-promise'

// define model
                                // V    V ------ username / password
const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
})

const  AuthorModel = db.define('author', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING},
})

const PostModel = db.define('post', {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING},
})

AuthorModel.hasMany(PostModel)
PostModel.belongsTo(AuthorModel)

/* * * * * * * * * * * * */
//   views in MongoDB   //

const mongo = Mongoose.connect('mongodb://localhost/views')

// Mongoose schema, not to be confused with GraphQL schema
const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number,
})

const View = Mongoose.model('views', ViewSchema) // table inside the db


casual.seed(123) // seed the number generator
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).then((author) => {
      return author.createPost({
        title: `A post by ${author.firstName}`,
        text: casual.sentences(3),
      }).then((post) => {
        return View.update(
          { postId: post.id },
          { views: casual.integer(0, 100) },
          { upsert: true });
      })
    })
  })
})

const Author = db.models.author
const Post = db.models.post

const FortuneCookie = {
  getOne() {
    return rp('http://fortunecookieapi.com/v1/cookie')
      .then((res) => JSON.parse(res))
      .then((res) => {
        console.log(res[0].fortune['message'])
        return res[0].fortune['message']
      })
  }
}

export { Author, Post, View, FortuneCookie }
