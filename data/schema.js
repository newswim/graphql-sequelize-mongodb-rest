const typeDefinitions = `
type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}

type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}

type Query {
  author(firstName: String, lastName: String): Author
  getFortuneCookie: String
}

schema {
  query: Query
}
`;

// args don't have to match with type definitions

export default [typeDefinitions];
