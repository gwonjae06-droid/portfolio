const vertex=`attribute vec2 position;varying vec2 vUv;void main(){vUv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;
const fragment=`precision highp float;
varying vec2 vUv;
uniform vec2 resolution;
uniform float time;
uniform sampler2D ripples;
uniform vec2 grid;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float octave(vec2 uv,float choppy){uv+=noise(uv);vec2 w=1.-abs(sin(uv));vec2 s=abs(cos(uv));w=mix(w,s,w);return pow(1.-pow(w.x*w.y,.65),choppy);}
float sea(vec2 p){
  float f=.55,a=.30,c=3.5,h=0.;mat2 m=mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<4;i++){float d=octave((p+time*.24)*f,c)+octave((p-time*.19)*f,c);h+=d*a;p=m*p;f*=1.88;a*=.22;c=mix(c,1.,.22);}return h;
}
float ripple(vec2 uv){vec4 t=texture2D(ripples,vec2(clamp(uv.x,0.,1.),clamp(1.-uv.y,0.,1.)));return (t.r*.99610895+t.g*.00389105)*2.-1.;}
vec3 sky(vec3 d){
  float y=max(d.y,0.);vec3 col=mix(vec3(.46,.62,.69),vec3(.13,.30,.45),pow(y,.55));
  float clouds=noise(d.xz/(y+.2)*2.+vec2(time*.006,0.));col+=vec3(.14,.16,.16)*smoothstep(.48,.82,clouds)*pow(y,.35);
  return col;
}
void main(){
  vec2 uv=vUv,screen=uv*2.-1.;float aspect=resolution.x/resolution.y;
  vec3 origin=vec3(0.,3.8,5.);vec3 ray=normalize(vec3(screen.x*aspect*.75,screen.y*.62-.83,-1.55));
  float dist=-origin.y/ray.y;vec3 p=origin+ray*dist;
  for(int i=0;i<3;i++){float h=sea(p.xz)*.55-.2;dist=(h-origin.y)/ray.y;p=origin+ray*dist;}
  float eps=.025+dist*.0009;
  float h=sea(p.xz),hx=sea(p.xz+vec2(eps,0.)),hz=sea(p.xz+vec2(0.,eps));
  vec2 texel=1./grid;
  float rx=ripple(uv+vec2(texel.x,0.))-ripple(uv-vec2(texel.x,0.));
  float ry=ripple(uv+vec2(0.,texel.y))-ripple(uv-vec2(0.,texel.y));
  vec3 normal=normalize(vec3((h-hx)/eps*.46-rx*5.,1.,(h-hz)/eps*.46-ry*5.));
  vec3 reflected=reflect(ray,normal);float fresnel=pow(1.-max(dot(normal,-ray),0.),3.)*.68+.12;
  vec3 deep=vec3(.012,.105,.16),shallow=vec3(.035,.27,.30);
  float diffuse=max(dot(normal,normalize(vec3(-.3,.85,-.5))),0.);
  vec3 refracted=mix(deep,shallow,diffuse*.6+clamp(h*.4,0.,.3));
  vec3 color=mix(refracted,sky(reflected),fresnel);
  vec3 light=normalize(vec3(.5,.55,-.65));
  float spec=pow(max(dot(reflect(ray,normal),light),0.),160.);
  float sparkle=pow(max(dot(reflect(ray,normal),light),0.),35.);
  color+=vec3(1.,.94,.79)*(spec*1.8+sparkle*.12);
  color+=vec3(.16,.33,.34)*pow(clamp(h-.5,0.,1.),3.)*.6;
  color=mix(color,vec3(.23,.39,.47),clamp(pow(dist/70.,1.5),0.,.5));
  color=pow(max(color,vec3(0.)),vec3(.85));
  gl_FragColor=vec4(color,1.);
}`;
export function createWaterRenderer(canvas,field){
  const gl=canvas.getContext('webgl',{alpha:false,antialias:false,powerPreference:'low-power'});if(!gl)return null;
  function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){const msg=gl.getShaderInfoLog(s);gl.deleteShader(s);throw Error(msg);}return s;}
  const program=gl.createProgram(),v=shader(gl.VERTEX_SHADER,vertex),f=shader(gl.FRAGMENT_SHADER,fragment);gl.attachShader(program,v);gl.attachShader(program,f);gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.deleteShader(v);gl.deleteShader(f);
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const position=gl.getAttribLocation(program,'position');const locations=Object.fromEntries(['resolution','time','ripples','grid'].map(n=>[n,gl.getUniformLocation(program,n)]));
  const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,field.width,field.height,0,gl.RGBA,gl.UNSIGNED_BYTE,field.texture());
  return {
    resize(w,h){const scale=w<650?.8:Math.min(window.devicePixelRatio||1,1.15);canvas.width=Math.round(w*scale);canvas.height=Math.round(h*scale);gl.viewport(0,0,canvas.width,canvas.height);},
    render(t){gl.useProgram(program);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture);gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,field.width,field.height,gl.RGBA,gl.UNSIGNED_BYTE,field.texture());gl.uniform1i(locations.ripples,0);gl.uniform2f(locations.grid,field.width,field.height);gl.uniform2f(locations.resolution,canvas.width,canvas.height);gl.uniform1f(locations.time,t);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);}
  };
}
