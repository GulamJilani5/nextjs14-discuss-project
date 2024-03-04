"use server";

import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  console.log(result);

  if (!result.success) {
    // console.log(reault.error)
    // console.log(result.error.flatten().fieldErrors)
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session || !session?.user) {
    return {
      errors: {
        _form: ["You must be logged in to create a new post"],
      },
    };
  }

  const topic = await db.topic.findFirst({
    // where: { slug :slug},
    where: { slug },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Topic not found"],
      },
    };
  }

  let post: Post;

  try {
    //  just to test if error occurred.
    //  throw new Error("Failed to create post");
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Failed to create post"],
        },
      };
    }
  }

  //TODO: revalidate the topic show page(after creating the new topic)
  revalidatePath(paths.topicShow(slug));

  redirect(paths.postShow(slug, post.id));

  // return {
  //   errors: {},
  // };
}
