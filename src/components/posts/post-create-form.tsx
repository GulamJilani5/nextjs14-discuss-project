"use client";

import { useFormState } from "react-dom";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

import * as actions from "@/actions";
import FormButton from "../common/form-button";

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action] = useFormState(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    }
  );

  // ***** We can pass another argument to server action this way as well
  // but one more approach is to directly pass to the action of useFormState().
  // binding 'createPost' method to 'null' (generally 'this' or any specific obejct mentioned) object with
  // 'slug' as argument to the 'createPost' method
  // const action = actions.createPost.bind(null, slug);

  return (
    <Popover>
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3>Create a Post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="bg-red-100 border border-red-200 p-2 rounded">
                {formState.errors._form.join(", ")}
              </div>
            ) : null}
            <FormButton>Create a Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
