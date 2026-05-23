import { createSchema, createYoga } from 'graphql-yoga';
import { supabase } from '@/utils/supabase/client';

const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    avatar_url: String
    created_at: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    user_id: ID!
    title: String!
    content: String!
    created_at: String!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    post_id: ID!
    email: String!
    body: String!
    created_at: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) throw new Error(error.message);
      return data;
    },
    user: async (_: any, { id }: { id: string }) => {
      const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
      if (error) throw new Error(error.message);
      return data;
    },
  },
  User: {
    posts: async (parent: any) => {
      const { data, error } = await supabase.from('posts').select('*').eq('user_id', parent.id);
      if (error) throw new Error(error.message);
      return data;
    },
  },
  Post: {
    comments: async (parent: any) => {
      const { data, error } = await supabase.from('comments').select('*').eq('post_id', parent.id);
      if (error) throw new Error(error.message);
      return data;
    },
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  // Yoga needs to be aware of the Next.js routing
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Request: Request, Response: Response }
});

export async function GET(request: Request, context: any) {
  return yoga.handleRequest(request, context);
}

export async function POST(request: Request, context: any) {
  return yoga.handleRequest(request, context);
}
