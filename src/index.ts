import { injectJsError } from './lib/jsError';
import { injectXHR } from './lib/xhr';
import { whiteScreen } from './lib/whiteScreen';
import { timing } from './lib/timing';
import { longTask } from './lib/longTask';
import { pv } from './lib/pv';

injectJsError();
injectXHR();
whiteScreen();
timing();
longTask();
pv();
