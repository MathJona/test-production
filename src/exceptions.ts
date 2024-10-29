import { HttpStatus } from "./utils/enums";

export class Exception {
  name: string;
  errorCode: number;
  message: string;
  constructor(name: string, message: string, errorCode?: number) {
    this.name = name;
    this.message = message;
    this.errorCode = errorCode || HttpStatus.UNKNOWN_ERROR;
  }
}
