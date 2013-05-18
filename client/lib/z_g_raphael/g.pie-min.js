/*!
 * g.Raphael 0.51 - Charting library, based on Rapha�l
 *
 * Copyright (c) 2009-2012 Dmitry Baranovskiy (http://g.raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
(function()***REMOVED***function t(f,k,l,i,d,b)***REMOVED***function t(d,b,c,e,f)***REMOVED***var a=Math.PI/180,g=d+c*Math.cos(-e*a),i=d+c*Math.cos(-f*a),h=d+c/2*Math.cos(-(e+(f-e)/2)*a),j=b+c*Math.sin(-e*a),k=b+c*Math.sin(-f*a),a=b+c/2*Math.sin(-(e+(f-e)/2)*a),d=["M",d,b,"L",g,j,"A",c,c,0,+(180<Math.abs(f-e)),1,i,k,"z"];d.middle=***REMOVED***x:h,y:a***REMOVED***;return d***REMOVED***var b=b||***REMOVED******REMOVED***,q=[],m=f.set(),a=f.set(),n=f.set(),o=d.length,h=0,j=0,p=0,g=b.maxSlices||100,e=parseFloat(b.minPercent)||1,r=Boolean(e);a.covers=m;if(1==o)n.push(f.circle(k,l,i).attr(***REMOVED***fill:b.colors&&
b.colors[0]||this.colors[0],stroke:b.stroke||"#fff","stroke-width":null==b.strokewidth?1:b.strokewidth***REMOVED***)),m.push(f.circle(k,l,i).attr(this.shim)),j=d[0],d[0]=***REMOVED***value:d[0],order:0,valueOf:function()***REMOVED***return this.value***REMOVED******REMOVED***,b.href&&b.href[0]&&m[0].attr(***REMOVED***href:b.href[0]***REMOVED***),n[0].middle=***REMOVED***x:k,y:l***REMOVED***,n[0].mangle=180;else***REMOVED***for(var c=0;c<o;c++)j+=d[c],d[c]=***REMOVED***value:d[c],order:c,valueOf:function()***REMOVED***return this.value***REMOVED******REMOVED***;d.sort(function(c,d)***REMOVED***return d.value-c.value***REMOVED***);for(c=0;c<o;c++)if(r&&100*d[c]/j<e&&(g=c,r=!1),c>g)r=!1,
d[g].value+=d[c],d[g].others=!0,p=d[g].value;o=Math.min(g+1,d.length);p&&d.splice(o)&&(d[g].others=!0);for(c=0;c<o;c++)***REMOVED***p=h-360*d[c]/j/2;c||(h=90-p,p=h-360*d[c]/j/2);if(b.init)var s=t(k,l,1,h,h-360*d[c]/j).join(",");g=t(k,l,i,h,h-=360*d[c]/j);e=b.matchColors&&!0==b.matchColors?d[c].order:c;e=f.path(b.init?s:g).attr(***REMOVED***fill:b.colors&&b.colors[e]||this.colors[e]||"#666",stroke:b.stroke||"#fff","stroke-width":null==b.strokewidth?1:b.strokewidth,"stroke-linejoin":"round"***REMOVED***);e.value=d[c];e.middle=g.middle;
e.mangle=p;q.push(e);n.push(e);b.init&&e.animate(***REMOVED***path:g.join(",")***REMOVED***,+b.init-1||1E3,">")***REMOVED***for(c=0;c<o;c++)e=f.path(q[c].attr("path")).attr(this.shim),b.href&&b.href[c]&&e.attr(***REMOVED***href:b.href[c]***REMOVED***),e.attr=function()***REMOVED******REMOVED***,m.push(e),n.push(e)***REMOVED***a.hover=function(c,b)***REMOVED***for(var b=b||function()***REMOVED******REMOVED***,e=this,a=0;a<o;a++)(function(a,f,g)***REMOVED***var h=***REMOVED***sector:a,cover:f,cx:k,cy:l,mx:a.middle.x,my:a.middle.y,mangle:a.mangle,r:i,value:d[g],total:j,label:e.labels&&e.labels[g]***REMOVED***;f.mouseover(function()***REMOVED***c.call(h)***REMOVED***).mouseout(function()***REMOVED***b.call(h)***REMOVED***)***REMOVED***)(n[a],
m[a],a);return this***REMOVED***;a.each=function(c)***REMOVED***for(var b=0;b<o;b++)***REMOVED***var a=n[b];c.call(***REMOVED***sector:a,cover:m[b],cx:k,cy:l,x:a.middle.x,y:a.middle.y,mangle:a.mangle,r:i,value:d[b],total:j,label:this.labels&&this.labels[b]***REMOVED***)***REMOVED***return this***REMOVED***;a.click=function(b)***REMOVED***for(var c=this,a=0;a<o;a++)(function(a,e,f)***REMOVED***var g=***REMOVED***sector:a,cover:e,cx:k,cy:l,mx:a.middle.x,my:a.middle.y,mangle:a.mangle,r:i,value:d[f],total:j,label:c.labels&&c.labels[f]***REMOVED***;e.click(function()***REMOVED***b.call(g)***REMOVED***)***REMOVED***)(n[a],m[a],a);return this***REMOVED***;a.inject=function(a)***REMOVED***a.insertBefore(m[0])***REMOVED***;
if(b.legend)***REMOVED***h=b.legend;c=b.legendothers;s=b.legendmark;q=b.legendpos;p=k+i+i/5;g=l+10;h=h||[];q=q&&q.toLowerCase&&q.toLowerCase()||"east";s=f[s&&s.toLowerCase()]||"circle";a.labels=f.set();for(e=0;e<o;e++)***REMOVED***var r=n[e].attr("fill"),u=d[e].order;d[e].others&&(h[u]=c||"Others");h[u]=this.labelise(h[u],d[e],j);a.labels.push(f.set());a.labels[e].push(f[s](p+5,g,5).attr(***REMOVED***fill:r,stroke:"none"***REMOVED***));a.labels[e].push(r=f.text(p+20,g,h[u]||d[u]).attr(this.txtattr).attr(***REMOVED***fill:b.legendcolor||"#000","text-anchor":"start"***REMOVED***));
m[e].label=a.labels[e];g+=1.2*r.getBBox().height***REMOVED***f=a.labels.getBBox();a.labels.translate.apply(a.labels,***REMOVED***east:[0,-f.height/2],west:[-f.width-2*i-20,-f.height/2],north:[-i-f.width/2,-i-f.height-10],south:[-i-f.width/2,i+10]***REMOVED***[q]);a.push(a.labels)***REMOVED***a.push(n,m);a.series=n;a.covers=m;return a***REMOVED***var v=function()***REMOVED******REMOVED***;v.prototype=Raphael.g;t.prototype=new v;Raphael.fn.piechart=function(f,k,l,i,d)***REMOVED***return new t(this,f,k,l,i,d)***REMOVED******REMOVED***)();