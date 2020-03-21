
/**
 * @class
 */
class Qolor {

  /**
   * @constructor
   * @param r {Number} 0.0 .. 1.0 red value of a color
   * @param g {Number} 0.0 .. 1.0 green value of a color
   * @param b {Number} 0.0 .. 1.0 blue value of a color
   * @param a {Number} 0.0 .. 1.0 alpha value of a color, default 1
   */
  constructor (r, g, b, a = 1) {
    this.r = this._clamp(r, 1);
    this.g = this._clamp(g, 1);
    this.b = this._clamp(b, 1);
    this.a = this._clamp(a, 1);
  }

  /**
   * @param str {String} can be any color dfinition like: 'red', '#0099ff', 'rgb(64, 128, 255)', 'rgba(64, 128, 255, 0.5)'
   */
  static parse (str) {
    if (typeof str === 'string') {
      str = str.toLowerCase();
      str = Qolor.w3cColors[str] || str;

      let m;

      if ((m = str.match(/^#?(\w{2})(\w{2})(\w{2})$/))) {
        return new Qolor(parseInt(m[1], 16)/255, parseInt(m[2], 16)/255, parseInt(m[3], 16)/255);
      }

      if ((m = str.match(/^#?(\w)(\w)(\w)$/))) {
        return new Qolor(parseInt(m[1]+m[1], 16)/255, parseInt(m[2]+m[2], 16)/255, parseInt(m[3]+m[3], 16)/255);
      }

      if ((m = str.match(/rgba?\((\d+)\D+(\d+)\D+(\d+)(\D+([\d.]+))?\)/))) {
        return new Qolor(
          parseFloat(m[1])/255,
          parseFloat(m[2])/255,
          parseFloat(m[3])/255,
          m[4] ? parseFloat(m[5]) : 1
        );
      }
    }

    return new Qolor();
  }

  static fromHSL (h, s, l, a) {
    const qolor = new Qolor().fromHSL(h, s, l);
    qolor.a = a === undefined ? 1 : a;
    return qolor;
  }

  //***************************************************************************

  _hue2rgb(p, q, t) {
    if (t<0) t += 1;
    if (t>1) t -= 1;
    if (t<1/6) return p + (q - p)*6*t;
    if (t<1/2) return q;
    if (t<2/3) return p + (q - p)*(2/3 - t)*6;
    return p;
  }

  _clamp(v, max) {
    if (v === undefined) {
      return;
    }
    return Math.min(max, Math.max(0, v || 0));
  }

  //***************************************************************************

  isValid () {
    return this.r !== undefined && this.g !== undefined && this.b !== undefined;
  }

  toHSL () {
    if (!this.isValid()) {
      return;
    }

    const max = Math.max(this.r, this.g, this.b);
    const min = Math.min(this.r, this.g, this.b);
    const range = max - min;
    const l = (max + min)/2;

    // achromatic
    if (!range) {
      return { h: 0, s: 0, l: l };
    }

    const s = l > 0.5 ? range/(2 - max - min) : range/(max + min);

    let h;
    switch (max) {
      case this.r:
        h = (this.g - this.b)/range + (this.g<this.b ? 6 : 0);
        break;
      case this.g:
        h = (this.b - this.r)/range + 2;
        break;
      case this.b:
        h = (this.r - this.g)/range + 4;
        break;
    }
    h *= 60;

    return { h: h, s: s, l: l };
  }

  fromHSL (h, s, l) {
    // h = this._clamp(h, 360),
    // s = this._clamp(s, 1),
    // l = this._clamp(l, 1),

    // achromatic
    if (s === 0) {
      this.r = this.g = this.b = l;
      return this;
    }

    const q = l<0.5 ? l*(1 + s) : l + s - l*s;
    const p = 2*l - q;

    h /= 360;

    this.r = this._hue2rgb(p, q, h + 1/3);
    this.g = this._hue2rgb(p, q, h);
    this.b = this._hue2rgb(p, q, h - 1/3);

    return this;
  }

  toString () {
    if (!this.isValid()) {
      return;
    }

    if (this.a === 1) {
      return '#' + ((1<<24) + (Math.round(this.r*255)<<16) + (Math.round(this.g*255)<<8) + Math.round(this.b*255)).toString(16).slice(1, 7);
    }
    return `rgba(${Math.round(this.r*255)},${Math.round(this.g*255)},${Math.round(this.b*255)},${this.a.toFixed(2)})`;
  }

  toArray () {
    if (!this.isValid) {
      return;
    }
    return [this.r, this.g, this.b];
  }

  hue (h) {
    const hsl = this.toHSL();
    return this.fromHSL(hsl.h+h, hsl.s, hsl.l);
  }

  saturation (s) {
    const hsl = this.toHSL();
    return this.fromHSL(hsl.h, hsl.s*s, hsl.l);
  }

  lightness (l) {
    const hsl = this.toHSL();
    return this.fromHSL(hsl.h, hsl.s, hsl.l*l);
  }

  clone () {
    return new Qolor(this.r, this.g, this.b, this.a);
  }
}

Qolor.w3cColors = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgrey: '#a9a9a9',
  darkgreen: '#006400',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  grey: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgrey: '#d3d3d3',
  lightgreen: '#90ee90',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32'
};

if (typeof module !== 'undefined') {
  module.exports = Qolor;
}
