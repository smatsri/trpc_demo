import { initTRPC } from "@trpc/server";
import { z } from 'zod';
import superjson from "superjson";

interface Success<T> {
  status: 'success';
  data: T;
}

interface Fail {
  status: 'error';
  message: string;
}

type Result<T> = Success<T> | Fail;

const Success = <T>(data: T): Result<T> => {
  return { status: 'success', data };
}

const Fail = (message: string): Result<never> => {
  return { status: 'error', message };
}

const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  getUsers: t.procedure.query(async ({ ctx }) => {
    return userList;
  }),
  updateUser: t.procedure
    .input(z.object({
      id: z.string(),
      name: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const user = userList.find(x => x.id === input.id);
      if (user) {
        user.name = input.name;
        return Success(user);
      }
      return Fail('user not found');
    })
});

export type AppRouter = typeof appRouter;

interface User {
  id: string;
  name: string;
  email: string;
}

const userList: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@gmail.com",
  },
  {
    id: "2",
    name: "Abraham Smith",
    email: "abrahamsmith@gmail.com",
  },
  {
    id: "3",
    name: "Barbie Tracy",
    email: "barbietracy@gmail.com",
  },
  {
    id: "4",
    name: "John Payday",
    email: "johnpayday@gmail.com",
  },
  {
    id: "5",
    name: "Remember My Name",
    email: "remembermyname@gmail.com",
  },
  {
    id: "6",
    name: "Go to School",
    email: "gotoschool@gmail.com",
  },
  {
    id: "7",
    name: "Fish Fruit",
    email: "fishfruit@gmail.com",
  },
  {
    id: "8",
    name: "Don't try",
    email: "donttry@gmail.com",
  },
  {
    id: "9",
    name: "Producer Feed",
    email: "producerfeed@gmail.com",
  },
  {
    id: "10",
    name: "Panic So",
    email: "panicso@gmail.com",
  },
];