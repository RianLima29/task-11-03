import chalk from 'chalk';

export enum ELogType {
  error = 'error',
  warning = 'warning',
  success = 'success',
}

type ILog = {
  (msg: string, type?: ELogType): void;
  (msg: { prefix: string; msg: string }, type?: ELogType): void;
};

/**
 * Logs a message with the specified type.
 * @param msg - The message to be logged.
 * @param type - The type of the log message. Defaults to "success".
 */
export const log: ILog = (msg, type) => {
  let _msg = msg;

  if (!type) type = ELogType.success;

  if (typeof msg === 'object') {
    _msg = `[${msg.prefix}]: ${msg.msg}`;
  }
  switch (type) {
    case 'error':
      console.log(chalk.red(_msg));
      break;
    case 'warning':
      console.log(chalk.yellow(_msg));
      break;
    case 'success':
      console.log(chalk.green(_msg));
      break;
    default:
      console.log(msg);
      break;
  }
};
