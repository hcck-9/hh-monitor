export interface ErrorData {
  kind: 'stability';
  type: 'error' | 'xhr' | 'white';
  errorType?: string;
  message?: string;
  filename?: string;
  position?: string;
  stack?: string;
  selector?: string;
  tagName?: string;
  pathName?: string | URL;
  status?: string;
  duration?: number;
  response?: any;
  params?: any;
  emptyPoints?: string;
  screen?: string;
  viewPoint?: string;
}
