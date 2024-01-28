import type { ErrorData } from '../type/sendErrorData';

export function injectXHR() {
  let XMLHttpRequest = window.XMLHttpRequest;
  let oldOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (
    method: string,
    url: string | URL,
    async?: boolean
  ): void {
    // @ts-ignore
    if (!url.match(/logstores/) && !url.match(/sockjs/)) {
      this.loginData = { method, url, async };
    }
    return oldOpen.apply(this, arguments);
  };

  let oldSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (
    body?: Document | XMLHttpRequestBodyInit | null | undefined
  ): void {
    if (this.loginData) {
      let startTime = Date.now();
      let handler = (type: string) => (event: Event) => {
        let duration = Date.now() - startTime;
        let status = this.status;
        let statusText = this.statusText;
        const sendErrorData: ErrorData = {
          kind: 'stability',
          type: 'xhr',
          info: {
            errorType: type,
            pathName: this.loginData.url,
            status: status + '-' + statusText,
            duration,
            response: this.response ? JSON.parse(this.response) : '', // 响应体
            params: body || '', // 入参
          },
        };
        console.log(sendErrorData);
      };
      this.addEventListener('load', handler('load'), false);
      this.addEventListener('error', handler, false);
      this.addEventListener('abort', handler, false);
    }
    return oldSend.apply(this, arguments);
  };
}
