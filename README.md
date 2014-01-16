Color.js
========

A very simple color tool for adjusting hue, saturation, lightning and alpha of a given RGB color.

Usage:

~~~ js

var color = new Color('#ffcc00').setAlpha(0.8).setLightness(1.2);
// color is turned into a string, when used in appropriate context

~~~

Parameter for new Color(...) can be in any of these:
 * #0099ffAA
 * #09fA
 * #0099ff
 * #09f
 * 0099ffAA
 * 09fA
 * 0099ff
 * 09f
 * rgb(64, 128, 255)
 * rgba(64, 128, 255, 0.5)

Available Methods are:

 * hue(0..360)
 * lightness(0..1)
 * saturation(0..1)
 * alpha(0..1)

Note that the parameters are a relative change. new Color('rgba(0,0,0,0.5)').alpha(0.5) would result in 'rgba(0,0,0,0.25)'
