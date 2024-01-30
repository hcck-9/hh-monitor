import type { ErrorData } from '../type/sendErrorData';
import { monitoringSystemInfo } from '../type/constant';

export function pv() {
  // @ts-ignore
  var connection = navigator.connection;
  const sendData: ErrorData = {
    ...monitoringSystemInfo,
    kind: 'business',
    type: 'pv',
    info: {
      effectiveType: connection.effectiveType,
      rtt: connection.rtt,
      screen: `${window.screen.width}x${window.screen.height}`,
    },
  };
  console.log(sendData);
  let startTime = Date.now();
  window.addEventListener(
    'unload',
    () => {
      let stayTime = Date.now() - startTime;
      const sendData2 = {
        kind: 'business',
        type: 'stayTime',
        stayTime,
      };
      console.log(sendData2);
    },
    false
  );
}
