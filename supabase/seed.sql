-- Insert 5 users
INSERT INTO public.users (id, name, email, avatar_url) VALUES
('b0e271a2-5813-4903-8822-26242cd28362', 'Alice Smith', 'alice@example.com', 'https://i.pravatar.cc/150?u=alice'),
('c5f87b32-9c1a-4712-ba29-87a32ab9f547', 'Bob Jones', 'bob@example.com', 'https://i.pravatar.cc/150?u=bob'),
('d1a297b1-4091-4d7a-8f85-321a5b89a8c1', 'Charlie Brown', 'charlie@example.com', 'https://i.pravatar.cc/150?u=charlie'),
('e3b567a1-2856-4c3d-bc87-19a5b67a8b92', 'Diana Prince', 'diana@example.com', 'https://i.pravatar.cc/150?u=diana'),
('f8c92b45-1748-4a9c-ad98-4675bc1a8f93', 'Evan Wright', 'evan@example.com', 'https://i.pravatar.cc/150?u=evan');

-- Insert 15 posts (3 per user)
INSERT INTO public.posts (id, user_id, title, content) VALUES
-- Alice's posts
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'b0e271a2-5813-4903-8822-26242cd28362', 'My First Post', 'This is the content of my very first post on this platform.'),
('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'b0e271a2-5813-4903-8822-26242cd28362', 'Learning Next.js', 'Next.js App Router is quite an interesting paradigm shift.'),
('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'b0e271a2-5813-4903-8822-26242cd28362', 'Supabase is awesome', 'PostgreSQL in the cloud makes things so much easier.'),
-- Bob's posts
('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', 'c5f87b32-9c1a-4712-ba29-87a32ab9f547', 'GraphQL vs REST', 'Which one is better? It really depends on the use case.'),
('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', 'c5f87b32-9c1a-4712-ba29-87a32ab9f547', 'Tailwind CSS Tips', 'Utility classes save a lot of time once you get used to them.'),
('f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', 'c5f87b32-9c1a-4712-ba29-87a32ab9f547', 'Overfetching Problem', 'REST APIs often return more data than the client needs.'),
-- Charlie's posts
('a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d', 'd1a297b1-4091-4d7a-8f85-321a5b89a8c1', 'Underfetching and N+1', 'Sequential requests can kill your app performance.'),
('b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e', 'd1a297b1-4091-4d7a-8f85-321a5b89a8c1', 'Database Seed Scripts', 'Always write seed scripts to make testing easier.'),
('c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f', 'd1a297b1-4091-4d7a-8f85-321a5b89a8c1', 'Deploying to Vercel', 'Vercel makes deploying Next.js apps a breeze.'),
-- Diana's posts
('d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a', 'e3b567a1-2856-4c3d-bc87-19a5b67a8b92', 'React Server Components', 'RSC allows you to fetch data on the server efficiently.'),
('e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b', 'e3b567a1-2856-4c3d-bc87-19a5b67a8b92', 'State Management', 'Do we still need Redux? Or is React Context enough?'),
('f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c', 'e3b567a1-2856-4c3d-bc87-19a5b67a8b92', 'API Routes in Next.js', 'Route Handlers are powerful for building fullstack apps.'),
-- Evan's posts
('a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d', 'f8c92b45-1748-4a9c-ad98-4675bc1a8f93', 'Building a Dashboard', 'Dashboards are complex because they load lots of data.'),
('b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e', 'f8c92b45-1748-4a9c-ad98-4675bc1a8f93', 'GraphQL Yoga', 'A fully-featured GraphQL Server with focus on easy setup.'),
('c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f', 'f8c92b45-1748-4a9c-ad98-4675bc1a8f93', 'Final Thoughts', 'Both REST and GraphQL have their place in modern development.');

-- Insert 50 comments (approx 3-4 per post)
-- Post 1 Comments
INSERT INTO public.comments (post_id, email, body) VALUES
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'fan1@test.com', 'Great first post!'),
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'fan2@test.com', 'Welcome to the platform.'),
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'fan3@test.com', 'Looking forward to more.'),
-- Post 2 Comments
('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'dev1@test.com', 'App Router is definitely the future.'),
('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'dev2@test.com', 'I still prefer the pages router.'),
('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'dev3@test.com', 'Thanks for the insight.'),
-- Post 3 Comments
('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'dbfan@test.com', 'Supabase RLS is very powerful.'),
('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'user1@test.com', 'How does it compare to Firebase?'),
('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'user2@test.com', 'I love Postgres.'),
('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'user3@test.com', 'Agreed!'),
-- Post 4 Comments
('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', 'api1@test.com', 'GraphQL solves overfetching.'),
('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', 'api2@test.com', 'But caching is harder with GraphQL.'),
('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', 'api3@test.com', 'Depends on your caching strategy.'),
-- Post 5 Comments
('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', 'css1@test.com', 'Tailwind made CSS fun again.'),
('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', 'css2@test.com', 'My HTML is so cluttered now though.'),
('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', 'css3@test.com', 'Use @apply for reusable classes.'),
('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', 'css4@test.com', 'Exactly!'),
-- Post 6 Comments
('f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', 'perf1@test.com', 'Mobile users suffer the most from overfetching.'),
('f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', 'perf2@test.com', 'Always optimize payloads.'),
-- Post 7 Comments
('a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d', 'dev@test.com', 'N+1 is a silent killer.'),
('a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d', 'dev2@test.com', 'DataLoader can fix this in GraphQL.'),
('a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d', 'dev3@test.com', 'Yes, batching is key.'),
-- Post 8 Comments
('b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e', 'qa1@test.com', 'Automated testing requires good seeds.'),
('b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e', 'qa2@test.com', 'True!'),
('b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e', 'qa3@test.com', 'Faker.js is great for this.'),
-- Post 9 Comments
('c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f', 'ops1@test.com', 'Vercel is magic.'),
('c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f', 'ops2@test.com', 'Can get expensive though.'),
('c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f', 'ops3@test.com', 'Worth it for the DX.'),
('c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f', 'ops4@test.com', '100%'),
-- Post 10 Comments
('d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a', 'react1@test.com', 'RSC changes everything.'),
('d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a', 'react2@test.com', 'Still wrapping my head around it.'),
('d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a', 'react3@test.com', 'It reduces JS bundle size significantly.'),
-- Post 11 Comments
('e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b', 'state1@test.com', 'Zustand is my go-to now.'),
('e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b', 'state2@test.com', 'Context is enough for simple things.'),
('e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b', 'state3@test.com', 'Redux still has its place in large apps.'),
('e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b', 'state4@test.com', 'Jotai is also nice.'),
-- Post 12 Comments
('f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c', 'api@test.com', 'Edge functions are great too.'),
('f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c', 'api2@test.com', 'Route handlers are much better than old API routes.'),
('f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c', 'api3@test.com', 'Agreed.'),
-- Post 13 Comments
('a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d', 'ui1@test.com', 'Data fetching strategy is key here.'),
('a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d', 'ui2@test.com', 'Parallel routes in Next.js help with dashboards.'),
('a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d', 'ui3@test.com', 'Suspense boundaries too.'),
-- Post 14 Comments
('b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e', 'gql1@test.com', 'Yoga is very easy to use.'),
('b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e', 'gql2@test.com', 'Built on standard Web Request/Response.'),
('b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e', 'gql3@test.com', 'Love it.'),
('b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e', 'gql4@test.com', 'Same here.'),
-- Post 15 Comments
('c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f', 'fin1@test.com', 'Right tool for the right job.'),
('c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f', 'fin2@test.com', 'Well said.'),
('c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f', 'fin3@test.com', 'Thanks for the comparison.');
