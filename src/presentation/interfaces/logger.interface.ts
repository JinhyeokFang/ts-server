import { Transform } from "stream";

export default interface Logger {
  stream(message: string): Transform;
  info(str: string): void;
  error(str: string): void;
}
