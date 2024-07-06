import { randomBytes, scrypt, scryptSync } from "crypto";
//import { promisify } from "util";
//const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buff = (await scryptSync(password, salt, 64)) as Buffer;
    return `${buff.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hash, salt] = storedPassword.split(".");
    const buff = (await scryptSync(suppliedPassword, salt, 64)) as Buffer;
    return hash === buff.toString("hex");
  }
}
