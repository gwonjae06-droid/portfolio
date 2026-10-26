/** Fixed-step damped wave equation and a spring/buoyancy body, in surface coordinates. */
export class WaveField {
  constructor(width=112,height=72){
    this.width=width;this.height=height;
    this.current=new Float32Array(width*height);this.previous=new Float32Array(width*height);this.next=new Float32Array(width*height);
    this.pixels=new Uint8Array(width*height*4);
  }
  disturb(x,y,amount=.16,radius=3){
    const cx=x*(this.width-1),cy=y*(this.height-1);
    for(let j=Math.max(1,Math.floor(cy-radius*2));j<Math.min(this.height-1,cy+radius*2);j++)for(let i=Math.max(1,Math.floor(cx-radius*2));i<Math.min(this.width-1,cx+radius*2);i++){
      const weight=Math.exp(-((i-cx)**2+(j-cy)**2)/(radius*radius));
      const k=j*this.width+i;this.current[k]=Math.max(-.9,Math.min(.9,this.current[k]+amount*weight));
    }
  }
  step(){
    const {width:w,height:h,current:a,previous:b,next:c}=this;
    // Courant coefficient 0.22 < 0.5 keeps this 2D finite-difference solver stable.
    for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){
      const k=y*w+x,lap=a[k-1]+a[k+1]+a[k-w]+a[k+w]-4*a[k];
      const edge=Math.min(x,y,w-x-1,h-y-1);
      c[k]=(2*a[k]-b[k]+.22*lap)*(edge<5?.94+edge*.009:.987);
    }
    this.previous=a;this.current=c;this.next=b;
  }
  sample(x,y){
    const px=Math.max(0,Math.min(this.width-1.001,x*(this.width-1))),py=Math.max(0,Math.min(this.height-1.001,y*(this.height-1)));
    const ix=Math.floor(px),iy=Math.floor(py),fx=px-ix,fy=py-iy,k=iy*this.width;
    const a=this.current[k+ix]*(1-fx)+this.current[k+ix+1]*fx;
    const b=this.current[k+this.width+ix]*(1-fx)+this.current[k+this.width+ix+1]*fx;
    return a*(1-fy)+b*fy;
  }
  texture(){
    for(let i=0;i<this.current.length;i++){
      const v=Math.round(Math.max(0,Math.min(1,this.current[i]*.5+.5))*65535),k=i*4;
      this.pixels[k]=v>>8;this.pixels[k+1]=v&255;this.pixels[k+2]=0;this.pixels[k+3]=255;
    }return this.pixels;
  }
  clear(){this.current.fill(0);this.previous.fill(0);this.next.fill(0);}
}
export class FloatingBody {
  constructor(x=.76,y=.54){this.x=x;this.y=y;this.homeX=x;this.homeY=y;this.vx=0;this.vy=0;this.angle=0;this.angularVelocity=0;}
  moveHome(x,y){this.x+=x-this.homeX;this.y+=y-this.homeY;this.homeX=x;this.homeY=y;}
  step(field,t,dt=1/60){
    const height=field.sample(this.x,this.y),left=field.sample(this.x-.025,this.y),right=field.sample(this.x+.025,this.y);
    const slope=right-left,ambient=Math.sin(t*.95+this.x*6)*.006+Math.sin(t*1.7)*.002;
    // Water slope supplies lateral force; buoyancy follows surface elevation.
    const ax=-slope*2.1+(this.homeX-this.x)*.65-this.vx*1.3;
    const ay=(this.homeY-height*.13-ambient-this.y)*10-this.vy*3.2;
    this.vx+=ax*dt;this.vy+=ay*dt;this.x+=this.vx*dt;this.y+=this.vy*dt;
    this.x=Math.max(.12,Math.min(.88,this.x));this.y=Math.max(.16,Math.min(.86,this.y));
    const targetAngle=Math.max(-16,Math.min(16,slope*58+Math.sin(t*.8)*2.8));
    this.angularVelocity+=((targetAngle-this.angle)*8-this.angularVelocity*3.5)*dt;this.angle+=this.angularVelocity*dt;
  }
}
