import EventWrapper from '../lib/EventWrapper.js';
import BackgroundWrapper from '../lib/BackgroundWrapper.js';
export { default as Calendar } from '../lib/Calendar.js';
export { DateLocalizer } from '../lib/localizer.js';
export { default as momentLocalizer } from '../lib/localizers/moment.js';
export { default as luxonLocalizer } from '../lib/localizers/luxon.js';
export { default as globalizeLocalizer } from '../lib/localizers/globalize.js';
export { default as dateFnsLocalizer } from '../lib/localizers/date-fns.js';
export { default as dayjsLocalizer } from '../lib/localizers/dayjs.js';
export { default as move } from '../lib/utils/move.js';
export { navigate as Navigate, views as Views } from '../lib/utils/constants.js';

var components = {
  eventWrapper: EventWrapper,
  timeSlotWrapper: BackgroundWrapper,
  dateCellWrapper: BackgroundWrapper
};

export { components };
