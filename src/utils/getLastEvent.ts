import { MouseEventList } from '../type/constant';

let lastEvent: Event | undefined;
MouseEventList.forEach((eventType) => {
  document.addEventListener(
    eventType,
    (event: Event) => {
      lastEvent = event;
    },
    {
      capture: true, // 是在捕获阶段还是冒泡阶段执行
      passive: true, // 默认不阻止默认事件
    }
  );
});

export default function (): Event | undefined {
  return lastEvent;
}
