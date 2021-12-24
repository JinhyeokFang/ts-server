export interface Encryption {
  compare(str: string, encryptedStr: string): Promise<boolean>;
  hash(str: string): Promise<string>;
}
