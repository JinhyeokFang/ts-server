import { Transform } from 'stream';

export interface Logger {
  stream(message: string): Transform;
  info(str: string): void;
  error(str: string): void;
}
