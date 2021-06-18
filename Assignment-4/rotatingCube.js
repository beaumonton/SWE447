
var cube = undefined;
var gl = undefined;
var angle = 0;
var canvas;
var w;
var h;
var aspect;
const fovy = 20;
const near = 0.1;
const far = 100;

function init() {
  canvas = document.getElementById("webgl-canvas");
  w = canvas.clientWidth;
  h = canvas.clientHeight;

  gl = WebGLUtils.setupWebGL( canvas );
  gl.viewport(0, 0, w, h);
  aspect = w / h;
  gl = WebGLUtils.setupWebGL( canvas );

  if ( !gl ) {
    alert("Unable to setup WebGL");
    return;
  }

  gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
  gl.enable( gl.DEPTH_TEST );

  cube = new Kube();

  render();
}

function render() {
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

  angle += 2.0; // degrees

  
  cube.MV = translate(0, 0, -5);
  cube.MV = rotate( angle, [1, 1, 0] );
  cube.PM = perspective(fovy, aspect, near, far);

  cube.render();

  requestAnimationFrame( render ); // schedule another call to render()
}

window.onresize = function(){
  w = canvas.clientWidth;
  h = canvas.clientHeight;

  gl.viewport(0, 0, w, h);

  aspect = w / h;
};

window.onload = init;