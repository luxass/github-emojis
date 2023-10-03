import {
  get, getRaw,
} from "github-emojis";
import { badRequest, notFound } from "~/server/utils/response";

export default defineEventHandler((event) => {
  if (!event.context.params) {
    return badRequest(event);
  }
  const name = event.context.params.name;

  if (!name) {
    return badRequest(event);
  }

  const emoji = get(name);
  if (!emoji) {
    return notFound(event);
  }

  return {
    name,
    emoji,
    url: getRaw(name),
  };
});
