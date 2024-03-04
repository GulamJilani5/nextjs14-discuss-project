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
export default function TopicCreateForm() {
  const [formState, action] = useFormState(actions.createTopic, {
    errors: {},
  });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create A Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h1 className="text-lg">Create a Topic</h1>
            <Input
              name="name"
              placeholder="name"
              label="name"
              labelPlacement="outside"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              placeholder="description"
              label="description"
              labelPlacement="outside"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="p-2 bg-red-100 border border-red-200 rounded">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}

            <FormButton>Save</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
