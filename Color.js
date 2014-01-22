var Color = (function() {

  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q-p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q-p) * (2/3 - t) * 6;
    return p;
  }

  function limit(v, max) {
    return Math.min(max, Math.max(0, v));
  }

  /*
   * str can be in any of these:
   * #0099ff #0099ffAA #09f #09fA
   * rgb(64, 128, 255) rgba(64, 128, 255, 0.5)
   */
  function Color(str) {
    var
      r = 0, g = 0, b = 0,
      a = 1,
      m;

    str += '';
    if ((m = str.match(/^#(\w{2})(\w{2})(\w{2})(\w{2})?$/))) {
      this.hex = true;
      r = parseInt(m[1], 16);
      g = parseInt(m[2], 16);
      b = parseInt(m[3], 16);
      a = m[4] ? parseInt(m[4], 16) / 255 : 1;
    }

    if ((m = str.match(/rgba?\((\d+)\D+(\d+)\D+(\d+)(\D+([\d.]+))?\)/))) {
      r = parseInt(m[1], 10);
      g = parseInt(m[2], 10);
      b = parseInt(m[3], 10);
      a = m[4] ? parseFloat(m[5]) : 1;
    }

    r /= 255;
    g /= 255;
    b /= 255;

    var
      max = Math.max(r, g, b),
      min = Math.min(r, g, b),
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
      h *= 60;
    }

    this.H = h;
    this.S = s;
    this.L = l;
    this.A = a;
  }

  var proto = Color.prototype;

  proto.toString = function() {
    var
      h = limit(this.H, 360),
      s = limit(this.S, 1),
      l = limit(this.L, 1),
      a = limit(this.A, 1),
      r, g, b;

    // achromatic
    if (s === 0) {
      r = l;
      g = l;
      b = l;
    } else {
      var
        q = l < 0.5 ? l * (1+s) : l + s - l*s,
        p = 2 * l-q;
        h /= 360;

      r = hue2rgb(p, q, h + 1/3) * 255;
      g = hue2rgb(p, q, h      ) * 255;
      b = hue2rgb(p, q, h - 1/3) * 255;
    }

    if (this.hex) {
      return '#' + ((1 <<24) + (r <<16) + (g <<8) + b).toString(16).slice(1, 7) + (a < 1 ? (a*256<<0).toString(16) : '');
    }
    return 'rgba(' + [r <<0, g <<0, b <<0, a.toFixed(2)].join(',') + ')';
  };

  return Color;

}());
