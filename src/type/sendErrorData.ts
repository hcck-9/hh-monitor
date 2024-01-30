/**
 * @errorType 错误小类型
 * @filename 错误所在文件的名称
 * @tagName 发生错误的 HTML 元素标签名
 * @selector 错误发生时的元素选择器
 * @message 错误信息
 * @position 错误的行列位置
 * @stack 错误的调用栈信息
 */

interface Resource_JS_PromiseErrorData {
  errorType: 'resourceError' | 'jsError' | 'promiseError';
  filename: string;
  tagName?: string;
  selector: string;
  message?: string;
  position?: string;
  stack?: string;
}

/**
 * @errorType 错误小类型
 * @pathName 请求路径
 * @status HTTP 状态码和状态文本
 * @duration 请求持续时间
 * @response 响应体，如果有的话进行 JSON 解析
 * @params 请求参数
 */
interface xhrErrorData {
  errorType: string;
  pathName: string | URL;
  status: string;
  duration: number;
  response: any;
  params: any;
}

/**
 * @emptyPoints 空白页面元素个数
 * @screen 屏幕尺寸
 * @viewPoint 视口尺寸
 * @selector 错误发生时的元素选择器
 */
interface whiteScreenData {
  emptyPoints: number;
  screen: string;
  viewPoint: string;
  selector: string;
}

/**
 * @connectTime TCP连接耗时
 * @ttfbTime 首字节到达时间
 * @responseTime response响应耗时
 * @parseDOMTime DOM解析渲染的时间
 * @domContentLoadedTime DOMContentLoaded事件回调耗时
 * @timeToInteractive 首次可交互时间
 * @loadTime 完整的加载时间
 */
interface ExperienceData {
  connectTime: number;
  ttfbTime: number;
  responseTime: number;
  parseDOMTime: number;
  domContentLoadedTime: number;
  timeToInteractive: number;
  loadTime: number;
}

/**
 * @firstPaint 首次绘制时间
 * @firstContentPaint 首次内容绘制时间
 * @firstMeaningfulPaint 首次有意义的绘制时间
 * @largestContentfulPaint 最大内容绘制时间
 */
interface PaintExperienceData {
  firstPaint: string | number | undefined;
  firstContentPaint: string | number | undefined;
  firstMeaningfulPaint: string | number | undefined;
  largestContentfulPaint: string | number | undefined;
}

// 定义一个具体的 ExperienceData 类型，表示长任务相关的性能统计数据
/**
 * @eventType 长任务对应的事件类型
 * @startTime 长任务开始时间
 * @duration 长任务持续时间
 * @selector 长任务发生时的元素选择器
 */
interface LongTaskExperienceData {
  eventType: string | undefined;
  startTime: number;
  duration: number;
  selector: string;
}

/**
 * @effectiveType 网络环境
 * @rtt 往返时间
 * @screen 设备分辨率
 */
interface pvBusinessData {
  effectiveType: string;
  rtt: number;
  screen: string;
}

/**
 * @title 监控系统标题
 * @url 访问地址
 * @timestamp 访问时间戳
 * @userAgent 访问的浏览器
 * @kind 监控指标的大类
 * @type 错误类型
 */
export interface ErrorData {
  title: string;
  timestamp: number;
  userAgent: string;
  kind: 'stability' | 'experience' | 'business';
  type:
    | 'error'
    | 'xhr'
    | 'white'
    | 'timing'
    | 'paint'
    | 'longTask'
    | 'pv'
    | 'stayTime';
  info:
    | Resource_JS_PromiseErrorData
    | xhrErrorData
    | whiteScreenData
    | ExperienceData
    | PaintExperienceData
    | LongTaskExperienceData
    | pvBusinessData;
  stayTime?: number;
}
