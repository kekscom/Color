var Color = (function() {

  var
    MODE = 'hex',
    R, G, B, A, HSL;

  function toHSL() {
    var
      r = R/255,
      g = G/255,
      b = B/255,
      max = Math.max(r, g, b), min = Math.min(r, g, b),
      h, s, l = (max+min) / 2,
      d = max-min;

    if (!d) {
      h = s = 0; // achromatic
    } else {
      s = l > 0.5 ? d / (2-max-min) : d / (max+min);
      switch (max) {
        case r: h = (g-b) / d + (g < b ? 6 : 0); break;
        case g: h = (b-r) / d + 2; break;
        case b: h = (r-g) / d + 4; break;
      }
      h /= 6;
    }

    HSL = { h:h*360, s:s, l:l };
  };

  function toRGB() {
    if (HSL.s === 0) {
      R = G = B = HSL.l; // achromatic
      return;
    }

    var
      q = HSL.l < 0.5 ? HSL.l * (1+HSL.s) : HSL.l + HSL.s - HSL.l*HSL.s,
      p = 2 * HSL.l-q;
      HSL.h /= 360;

    R = hue2rgb(p, q, HSL.h + 1/3) * 255 <<0;
    G = hue2rgb(p, q, HSL.h      ) * 255 <<0;
    B = hue2rgb(p, q, HSL.h - 1/3) * 255 <<0;
  }

  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q-p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q-p) * (2/3 - t) * 6;
    return p;
  }

  function limit(val, max) {
    return Math.min(max, Math.max(0, val));
  }

  /*
   * str can be in any of these:
   * #0099ff #0099ffAA #09f #09fA
   * rgb(64, 128, 255) rgba(64, 128, 255, 0.5)
   */
  function Color(str) {
    var m;
    str += '';
    if (m = str.match(/^#(\w{2})(\w{2})(\w{2})(\w{2})?$/)) {
      R = parseInt(m[1], 16);
      G = parseInt(m[2], 16);
      B = parseInt(m[3], 16);
      A = m[4] ? parseInt(m[4], 16) / 255 : 1;
    }

    if (m = str.match(/rgba?\((\d+)\D+(\d+)\D+(\d+)(\D+([\d.]+))?\)/)) {
      MODE = 'rgb'
      R = parseInt(m[1], 10);
      G = parseInt(m[2], 10);
      B = parseInt(m[3], 10);
      A = m[4] ? parseFloat(m[5]) : 1;
    }
  };

  var proto = Color.prototype;

  proto.hue = function(h) {
    if (!HSL) toHSL();
    HSL.h = limit(HSL.h*h, 360);
    return this;
  };

  proto.saturation = function(s) {
    if (!HSL) toHSL();
    HSL.s = limit(HSL.s*s, 1);
    return this;
  };

  proto.lightness = function(l) {
    if (!HSL) toHSL();
    HSL.l = limit(HSL.l*l, 1);
    return this;
  };

  proto.alpha = function(a) {
    A = limit(A*a, 1);
    return this;
  };

  proto.toString = function() {
    if (HSL) toRGB();
    if (MODE === 'hex') {
      return '#' + ((1 <<24) + (R <<16) + (G <<8) + B).toString(16).slice(1, 7) + (A < 1 ? (A*256<<0).toString(16) : '');
    }
    return 'rgba(' + [R <<0, G <<0, B <<0, A.toFixed(2)].join(',') + ')';
  };
  
  return Color;

}());
