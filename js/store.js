// The visitor's current choice, shared by the 3D story, the calculator and the booking form.
// floor: tower A floor index (shown as floor + 1); flat: index into FLATS on that floor;
// layout: index into LAYOUTS for the calculator.
import { FLOOR_DEFAULT } from './data.js';

export const store = { floor: FLOOR_DEFAULT, flat: 2, layout: 2 };

export function setStore(patch) {
  Object.assign(store, patch);
  window.dispatchEvent(new CustomEvent('storechange', { detail: patch }));
}
