import getLastEvent from '../utils/getLastEvent';
import getSelectorsFromPathsOrTarget from '../utils/getSelector';
import type { ErrorData } from '../type/sendErrorData';

export function injectJsError() {
  // 监听全局未捕获的错误
  window.addEventListener(
    'error',
    (event) => {
      console.log('error-----------------------', event);
      // 获取到最后一个交互事件
      let lastEvent = getLastEvent();
      // 1、资源加载错误-----------
      // @ts-ignore
      if (event.target && (event.target.src || event.target.href)) {
        const sendErrorData: ErrorData = {
          // 监控指标的大类，稳定性
          kind: 'stability',
          // 小类型，这是一个错误
          type: 'error',
          errorType: 'resourceError',
          // @ts-ignore
          filename: event.target.src || event.target.href,
          // @ts-ignore
          tagName: event.target.tagName,
          selector: getSelectorsFromPathsOrTarget(event.target),
        };
        console.log(sendErrorData);
      } else {
        // 2、js执行错误-----------
        const sendErrorData: ErrorData = {
          kind: 'stability',
          type: 'error',
          errorType: 'jsError',
          // 报错信息
          message: event.message,
          // 哪个文件报错了
          filename: event.filename,
          // 报错的行列位置
          position: `${event.lineno}:${event.colno}`,
          stack: getLines(event.error.stack),
          // 代表最后一个操作的元素
          selector: lastEvent
            ? // @ts-ignore
              getSelectorsFromPathsOrTarget(lastEvent.path)
            : '',
        };
        console.log(sendErrorData);
      }
    },
    true
  );
  // 3、promise异常---------------
  window.addEventListener(
    'unhandledrejection',
    (event) => {
      console.log('unhandledrejection-------- ', event);
      // 获取到最后一个交互事件
      let lastEvent = getLastEvent();
      let message: string = '';
      let filename: string = '';
      let line: number = 0;
      let column: number = 0;
      let stack: string = '';
      let reason: string | object = event.reason;
      if (typeof reason === 'string') {
        message = reason;
      } else if (typeof reason === 'object') {
        // @ts-ignore
        message = reason.message;
        // @ts-ignore
        if (reason.stack) {
          // @ts-ignore
          let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
          filename = matchResult[1];
          line = matchResult[2];
          column = matchResult[3];
        }
        // @ts-ignore
        stack = getLines(reason.stack);
      }
      const sendErrorData: ErrorData = {
        kind: 'stability',
        type: 'error',
        errorType: 'promiseError',
        message,
        filename,
        position: `${line}:${column}`,
        stack,
        selector: lastEvent
          ? // @ts-ignore
            getSelectorsFromPathsOrTarget(lastEvent.path)
          : '',
      };
      console.log(sendErrorData);
    },
    true
  );
}

function getLines(stack: string): string {
  return stack
    .split('\n')
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ''))
    .join('^');
}
