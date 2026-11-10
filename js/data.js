// The story is one timeline from 0 to DURATION. Scrolling moves a time value t along it,
// and every table below says what the scene looks like at a given t.

export const DURATION = 70;

export const CHAPTERS = [
  { key: 'ch1', start: 0 },
  { key: 'ch2', start: 8, nav: 'location' },
  { key: 'ch3', start: 18, nav: 'construction' },
  { key: 'ch4', start: 30 },
  { key: 'ch5', start: 38 },
  { key: 'ch6', start: 46 },
  { key: 'ch7', start: 56 },
];

// Camera: [t, targetX, targetY, targetZ, distance, elevation°, azimuth°, relative]
// Azimuth 0 looks from the south (north is −z). relative = 1 means the target is in
// apartment coordinates, so it follows whichever floor the visitor picked.
export const CAMERA = [
  [0, 0, 24, -16, 420, 13, 32, 0],
  [4, 0, 24, -16, 300, 11, 18, 0],
  [7.4, 0, 22, -16, 225, 9, 6, 0],
  [10.6, 70, 0, -40, 1120, 50, 14, 0],
  [16.8, 70, 0, -40, 1010, 47, -6, 0],
  [19.6, 0, 20, -16, 290, 24, -32, 0],
  [24, 0, 22, -16, 250, 19, 4, 0],
  [28.6, 0, 24, -16, 238, 17, 36, 0],
  [31.6, 0, 12, -6, 112, 15, 16, 0],
  [35, 0, 6, 22, 128, 25, -8, 0],
  [37.4, 0, 6, 22, 122, 24, -16, 0],
  [39.6, 0, 30, -56, 140, 7, 9, 0],
  [45.6, 0, 30, -56, 140, 7, 9, 0],
  [48.6, 7.5, 0, -3, 70, 54, 24, 1],
  [51, 7.5, 0, -2.9, 25, 64, 16, 1],
  [55.4, 7.5, 0, -2.9, 24, 60, -14, 1],
  [57.6, 7.5, 0, -2.9, 23.5, 66, 0, 1],
  [62, 7.5, 0, -2.9, 23.5, 66, 0, 1],
  [63.2, 2.85, 1.5, 6, 9, 62, 180, 1],
  [64.1, 2.85, -5.5, 30, 29.9, 13.9, 180, 1],
  [65.2, 2.85, -6, 30, 32.5, 13.8, 180, 1],
  [70, 2.85, -6, 30, 32.5, 13.8, 180, 1],
];

// Story clock: [t, hour]. Hours past 24 are the next day, so the sky runs forward
// through the night into the morning instead of rewinding.
export const SUN = [
  [0, 20.15], [7.4, 20.4], [10.6, 33.6], [18, 34.5], [29, 37.2], [37, 39.4], [45, 39.7], [56, 39.6], [70, 39.6],
];

export const BUILD = [[0, 1], [18.2, 1], [19.8, 0], [28.8, 1], [70, 1]];      // construction progress 0..1
export const LIFT = [[0, 0], [46.4, 0], [48.6, 1], [70, 1]];                  // upper floors lifted away
export const PICK = [[0, 0], [38.6, 0], [39.6, 1], [45.8, 1], [46.8, 0], [70, 0]]; // floor highlight
export const ROUTES = [[0, 0], [10.6, 0], [14, 1], [70, 1]];                  // walking routes drawn
export const POIS = [[0, 0], [9.6, 0], [10.8, 1], [16.9, 1], [17.9, 0], [70, 0]];  // location pins
export const SUNCTL = [[0, 0], [56.2, 0], [57.6, 1], [70, 1]];                // visitor controls the sun
export const WINDOW = [[0, 0], [63.2, 0], [65.2, 1], [70, 1]];                // view from the window

// Label fade windows: [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd]
export const LABEL_TIMES = {
  poi: [10.2, 11.4, 16.6, 17.6],
  amenity: [31.6, 32.6, 37.2, 38],
  room: [50.2, 51.2, 62.4, 63],
  view: [64.9, 65.4, 80, 81],
};

// Construction schedule: progress 0..1 maps to Q3 2025 .. Q4 2027.
export const BUILD_START = 2025.5, BUILD_SPAN = 2.4;
export const TODAY = 2026.85; // Q4 2026
export const BUILD_STAGES = [[0, 'build.s0'], [0.1, 'build.s1'], [0.62, 'build.s2'], [0.86, 'build.s3'], [0.985, 'build.s4']];

// Tower A floor picker. Floor index 0 is the ground floor (shops), so index i is shown as floor i + 1.
export const PICK_MIN = 1, PICK_MAX = 15, FLOOR_DEFAULT = 8, TOWER_A_FLOORS = 16;
export const FLATS = [
  { r: 1, a: 42.3 }, { r: 2, a: 64.8 }, { r: 3, a: 94.5, tour: true }, { r: 2, a: 64.8 },
  { r: 1, a: 42.3 }, { r: 2, a: 64.8 }, { r: 3, a: 94.5 }, { r: 4, a: 118.6 },
];

function hash(n) { n = (n ^ 61) ^ (n >>> 16); n = n + (n << 3); n = n ^ (n >>> 4); n = Math.imul(n, 0x27d4eb2d); n = n ^ (n >>> 15); return (n >>> 0) / 4294967296; }

export function flatStatus(floor, k) {
  if (k === 2) return floor % 5 === 1 ? 'sold' : 'free';
  const u = hash(floor * 131 + k * 17 + 7);
  const sold = 0.55 - floor * 0.022;
  return u < sold ? 'sold' : u < sold + 0.12 ? 'res' : 'free';
}

// Price per m² in so'm by floor index, rising with height.
export const ppmFor = (floor) => 13.9e6 + (floor - 1) * 0.15e6;

// Layout cards and calculator. Plans are rooms as [x, depth, width, depthSize] in metres.
export const LAYOUTS = [
  { r: 1, a: 42.3, w: 7.2, d: 6.3, loggia: [0, -1.4, 4.0, 1.4],
    rooms: [[0, 0, 4.0, 4.4], [4.0, 0, 3.2, 3.3], [4.0, 3.3, 3.2, 3.0], [0, 4.4, 2.2, 1.9], [2.2, 4.4, 1.8, 1.9]] },
  { r: 2, a: 64.8, w: 10.2, d: 6.6, loggia: [0, -1.5, 5.6, 1.5],
    rooms: [[0, 0, 5.6, 4.6], [5.6, 0, 4.6, 3.7], [5.6, 3.7, 4.6, 1.2], [5.6, 4.9, 2.4, 1.7], [8.0, 4.9, 2.2, 1.7], [0, 4.6, 5.6, 2.0]] },
  { r: 3, a: 94.5, w: 15, d: 6.3, loggia: [0, -1.5, 11, 1.5], tour: true,
    rooms: [[0, 0, 6.6, 6.3], [6.6, 0, 4.4, 3.5], [11, 0, 4, 3.5], [6.6, 3.5, 8.4, 1.2], [6.6, 4.7, 2.4, 1.6], [9, 4.7, 2.6, 1.6], [11.6, 4.7, 3.4, 1.6]] },
  { r: 4, a: 118.6, w: 18, d: 7.0, loggia: [0, -1.5, 12, 1.5],
    rooms: [[0, 0, 7.2, 7.0], [7.2, 0, 4.4, 3.8], [11.6, 0, 3.4, 3.8], [15, 0, 3, 3.8], [7.2, 3.8, 10.8, 1.2], [7.2, 5.0, 2.6, 2.0], [9.8, 5.0, 3.0, 2.0], [12.8, 5.0, 2.6, 2.0], [15.4, 5.0, 2.6, 2.0]] },
];

export const track = (tab, t) => {
  if (t <= tab[0][0]) return tab[0][1];
  for (let i = 1; i < tab.length; i++) {
    const b = tab[i];
    if (t <= b[0]) {
      const a = tab[i - 1];
      const u = (t - a[0]) / ((b[0] - a[0]) || 1);
      return a[1] + (b[1] - a[1]) * u * u * (3 - 2 * u);
    }
  }
  return tab[tab.length - 1][1];
};
