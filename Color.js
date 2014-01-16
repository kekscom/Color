var Color = (function() {

  var
    Max = Math.max, Min = Math.min,
    R, G, B, A, HSL;

  function toHSL() {
    var
      r = R/255,
      g = G/255,
      b = B/255,
      max = Max(r, g, b), min = Min(r, g, b),
      h, s, l = (max+min) / 2,
      d = max-min;

    if (!d) {
      h = s = 0; // achromatic
    } else {
      d = max-min;
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

    R = hue2rgb(p, q, HSL.h + 1/3);
    G = hue2rgb(p, q, HSL.h      );
    B = hue2rgb(p, q, HSL.h - 1/3);

    R*255 <<0,
    G*255 <<0,
    B*255 <<0,
  }

  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q-p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q-p) * (2/3 - t) * 6;
    return p;
  }

  function maxValue(val, max) {
    return Min(max, Max(0, val));
  }

  /*
   * str can be in any of these:
   * #0099ffAA #09fA
   * #0099ff #09f
   * 0099ffAA 09fA
   * 0099ff 09f
   * rgb(64, 128, 255) rgba(64, 128, 255, 0.5)
   */
  function Color(str) {
    var m;
    str += '';
    if (m = str.match(/^#?(\w{2})(\w{2})(\w{2})(\w{2})?$/)) {
      R = parseInt(m[1], 16),
      G = parseInt(m[2], 16),
      B = parseInt(m[3], 16),
      A = m[4] ? parseInt(m[4], 16) / 255 : 1
    }

    if (m = str.match(/rgba?\((\d+)\D+(\d+)\D+(\d+)(\D+([\d.]+))?\)/)) {
      R = parseInt(m[1], 10),
      G = parseInt(m[2], 10),
      B = parseInt(m[3], 10),
      A = m[4] ? parseFloat(m[5]) : 1
    }
  };

  var proto = Color.prototype;

  proto.hue = function(h) {
    if (!HSL) toHSL();
    if (h !== undefined) {
      HSL.h = maxValue(h, 360);
    }
    return HSL.h;
  };
  
  proto.saturation = function(s) {
    if (!HSL) toHSL();
    if (s !== undefined) {
      HSL.s = maxValue(s, 1);
    }
    return HSL.s;
  };

  proto.lightness = function(l) {
    if (!HSL) toHSL();
    if (l !== undefined) {
      HSL.l = maxValue(l, 1);
    }
    return HSL.l;
  };

  proto.alpha = function(a) {
    if (a !== undefined) {
      A = maxValue(a, 360);
    }
    return A;
  };

  proto.toString = function() {
    if (HSL) toRGB();
    if (A === 1) {
      return '#' + ((1 <<24) + (R <<16) + (G <<8) + B).toString(16).slice(1, 7);
    }
    return 'rgba(' + [R <<0, G <<0, B <<0, A.toFixed(2)].join(',') + ')';
  };
  
  return Color;

}());
