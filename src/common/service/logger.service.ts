import { LoggerService } from '@nestjs/common';

export class LogService implements LoggerService {
  getTimestamp() {
    const current = new Date();
    const cDate =
      current.getFullYear() +
      '-' +
      (current.getMonth() + 1) +
      '-' +
      current.getDate();
    const cTime =
      current.getHours() +
      ':' +
      current.getMinutes() +
      ':' +
      current.getSeconds();
    const timeStamp = cDate + ' ' + cTime;
    return timeStamp;
  }
  warn(message: any, context?: string) {}
  verbose?(message: any, context?: string) {}
  log(message: any) {
    console.log(`[LOG] - [${this.getTimestamp()}] : ${message}`);
  }
  error(message: string, trace: string) {
    console.log(
      `[ERROR] - [${this.getTimestamp()}] : ${message} \n [TRACE]: ${trace}`,
    );
  }
  debug(message: string) {
    console.log(`[DEBUG] - [${this.getTimestamp()}] : ${message}`);
  }
}
