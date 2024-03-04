import type { Post } from "@prisma/client";
import { db } from "@/db";

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};
// This way we can also create type but not highly recommended.
// export type PostWithData = Awaited<ReturnType<typeof fetchPostsByTopicSlug>>[number]

// export function fetchPostsByTopicSlug(slug:string)  {
export function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: {
      topic: { slug: slug },
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: {
        select: { comments: true },
      },
    },
  });
}

export function fetchPostsBySearchTerm(term: string): Promise<PostWithData[]> {
  return db.post.findMany({
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image:true} },
      _count: {
        select: { comments: true },
      },
    },
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },
  });
}

export function fetchTopsPosts(): Promise<PostWithData[]> {
  return db.post.findMany({
    orderBy: [
      {
        comments: {
          _count: "desc",
        },
      },
    ],
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: {
        select: { comments: true },
      },
    },
    take: 5,
  });
}
