import formatTime from '../utils/formatTime';
import getLastEvent from '../utils/getLastEvent';
import getSelector from '../utils/getSelector';
import type { ErrorData } from '../type/sendErrorData';
import { monitoringSystemInfo } from '../type/constant';

export function longTask() {
  new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.duration > 100) {
        let lastEvent = getLastEvent();
        // 使用 requestIdleCallback 延迟执行发送数据的操作
        requestIdleCallback(() => {
          const sendErrorData: ErrorData = {
            ...monitoringSystemInfo,
            kind: 'experience',
            type: 'longTask',
            info: {
              eventType: lastEvent?.type,
              startTime: formatTime(entry.startTime),
              duration: formatTime(entry.duration),
              selector: lastEvent
                ? // @ts-ignore
                  getSelector(lastEvent.path || lastEvent.target)
                : '',
            },
          };
          console.log(sendErrorData);
        });
      }
    });
  }).observe({ entryTypes: ['longtask'] });
}
