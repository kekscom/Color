!function(a){var b=function(){function a(a,b,c){return 0>c&&(c+=1),c>1&&(c-=1),1/6>c?a+6*(b-a)*c:.5>c?b:2/3>c?a+(b-a)*(2/3-c)*6:a}function b(a,b){return Math.min(b,Math.max(0,a||0))}var c={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgrey:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",grey:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},d=function(a){if(a=a||"","object"==typeof a){var d=a;this.R=b(d.r,max),this.G=b(d.g,max),this.B=b(d.b,max),this.A=void 0!==d.a?b(d.a,1):1}else if("string"==typeof a){a=a.toLowerCase(),a=c[a]||a;var e;(e=a.match(/^#?(\w{2})(\w{2})(\w{2})$/))?(this.R=parseInt(e[1],16)/255,this.G=parseInt(e[2],16)/255,this.B=parseInt(e[3],16)/255,this.A=1):(e=a.match(/rgba?\((\d+)\D+(\d+)\D+(\d+)(\D+([\d.]+))?\)/))&&(this.R=parseInt(e[1],10)/255,this.G=parseInt(e[2],10)/255,this.B=parseInt(e[3],10)/255,this.A=e[4]?parseFloat(e[5]):1)}};d.prototype={toHSL:function(){var a,b,c=Math.max(this.R,this.G,this.B),d=Math.min(this.R,this.G,this.B),e=(c+d)/2,f=c-d;if(f){switch(b=e>.5?f/(2-c-d):f/(c+d),c){case this.R:a=(this.G-this.B)/f+(this.G<this.B?6:0);break;case this.G:a=(this.B-this.R)/f+2;break;case this.B:a=(this.R-this.G)/f+4}a*=60}else a=b=0;return{h:a,s:b,l:e}},fromHSL:function(b){if(0===b.s)this.R=b.l,this.G=b.l,this.B=b.l;else{var c=b.l<.5?b.l*(1+b.s):b.l+b.s-b.l*b.s,d=2*b.l-c;b.h/=360,this.R=a(d,c,b.h+1/3),this.G=a(d,c,b.h),this.B=a(d,c,b.h-1/3)}return this},toString:function(){return 1===this.A?"#"+((1<<24)+(Math.round(255*this.R)<<16)+(Math.round(255*this.G)<<8)+Math.round(255*this.B)).toString(16).slice(1,7):"rgba("+[Math.round(255*this.R),Math.round(255*this.G),Math.round(255*this.B),this.A.toFixed(2)].join(",")+")"},toArray:function(){return[this.R,this.G,this.B]},hue:function(a){var b=this.toHSL();return b.h*=a,this.fromHSL(b),this},saturation:function(a){var b=this.toHSL();return b.s*=a,this.fromHSL(b),this},lightness:function(a){var b=this.toHSL();return b.l*=a,this.fromHSL(b),this},alpha:function(a){return this.A*=a,this},copy:function(){var a=new d;return a.R=this.R,a.G=this.G,a.B=this.B,a.A=this.A,a}}}();"function"==typeof a.define?a.define([],b):"object"==typeof a.exports?a.exports=b:a.Color=b}(this);