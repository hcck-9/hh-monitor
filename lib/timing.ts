import onload from '../utils/onload';
import formatTime from '../utils/formatTime';
import type { ErrorData } from '../type/sendErrorData';

export function timing() {
  let FMP, LCP;
  // 观察页面中有意义的元素
  new PerformanceObserver((entryList, observer) => {
    const perfEntries = entryList.getEntries();
    FMP = perfEntries[0];
    observer.disconnect();
  }).observe({ entryTypes: ['element'] });

  // 观察页面中最大的元素
  new PerformanceObserver((entryList, observer) => {
    const perfEntries = entryList.getEntries();
    LCP = perfEntries[perfEntries.length - 1];
    observer.disconnect();
  }).observe({ entryTypes: ['largest-contentful-paint'] });
  onload(function () {
    setTimeout(() => {
      const [performanceData] = performance.getEntriesByType('navigation');
      const sendData: ErrorData = {
        kind: 'experience',
        type: 'timing',
        info: {
          // TCP连接耗时
          connectTime:
            // @ts-ignore
            performanceData.connectEnd - performanceData.connectStart,
          // 首字节到达时间
          ttfbTime:
            // @ts-ignore
            performanceData.responseStart - performanceData.requestStart,
          // response响应耗时
          responseTime:
            // @ts-ignore
            performanceData.responseEnd - performanceData.responseStart,
          // DOM解析渲染的时间
          parseDOMTime:
            // @ts-ignore
            performanceData.loadEventStart - performanceData.domLoading,
          // DOMContentLoaded事件回调耗时
          domContentLoadedTime:
            // @ts-ignore
            performanceData.domContentLoadedEventEnd -
            // @ts-ignore
            performanceData.domContentLoadedEventStart,
          // 首次可交互时间
          timeToInteractive:
            // @ts-ignore
            performanceData.domInteractive - performanceData.fetchStart,
          // 完整的加载时间
          loadTime:
            // @ts-ignore
            performanceData.loadEventStart - performanceData.fetchStart,
        },
      };
      // 发送性能指标
      let FP = performance.getEntriesByName('first-paint')[0];
      let FCP = performance.getEntriesByName('first-contentful-paint')[0];
      console.log('FP', FP);
      console.log('FCP', FCP);
      console.log('FMP', FMP);
      console.log('LCP', LCP);
      const data: ErrorData = {
        kind: 'experience',
        type: 'paint',
        info: {
          firstPaint: FP ? formatTime(FP.startTime) : 0,
          firstContentPaint: FCP ? formatTime(FCP.startTime) : 0,
          firstMeaningfulPaint: FMP ? formatTime(FMP.startTime) : 0,
          largestContentfulPaint: LCP
            ? formatTime(LCP.renderTime || LCP.loadTime)
            : 0,
        },
      };
    }, 3000);
  });
}
