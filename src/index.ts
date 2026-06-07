import { Elysia, t } from 'elysia';
import { db } from './db';
import { users } from './db/schema';

const app = new Elysia()
  .get('/health', () => ({ status: 'ok', uptime: process.uptime() }))
  .get('/users', async () => {
    try {
      const allUsers = await db.query.users.findMany();
      return allUsers;
    } catch (error) {
      console.error(error);
      return { error: 'Failed to fetch users from database' };
    }
  })
  .post('/users', async ({ body, set }) => {
    try {
      const { name, email } = body;
      const [newUser] = await db.insert(users).values({ name, email }).returning();
      set.status = 201;
      return newUser;
    } catch (error: any) {
      console.error(error);
      set.status = 400;
      return { error: error.message || 'Failed to create user' };
    }
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: 'email' }),
    })
  })
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
