var canvas;
var gl;
var V;
var P;
var near = 1;
var far = 1000;


var time = 0.0;
var timeDelta = 0.7;

var ms = new MatrixStack();

function init() 
{
  canvas = document.getElementById("webgl-canvas");

  // Configure our WebGL environment
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { alert("WebGL initialization failed"); }

  gl.clearColor(222/255, 222/255, 222/255, 1.0);
  gl.enable(gl.DEPTH_TEST);

  for (var name in Spheres ) 
  {
    var sphere = Spheres[name].model = new Sphere();

    sphere.uniforms = 
    { 
      color : gl.getUniformLocation(sphere.program, "color"),
      MV : gl.getUniformLocation(sphere.program, "MV"),
      P : gl.getUniformLocation(sphere.program, "P")
    };
  }

  for (var name in Cylinders) 
  {
    var cylinder = Cylinders[name].model = new Cylinder();

    cylinder.uniforms = 
    {
      color : gl.getUniformLocation(cylinder.program, "color"),
      MV : gl.getUniformLocation(cylinder.program, "MV"),
      P : gl.getUniformLocation(cylinder.program, "P")
    };
  }

  for (var name in BGs) 
  {
    var backdrop = BGs[name].model = new Background();

    backdrop.uniforms = 
    {
      texture : gl.getUniformLocation(backdrop.program, "uTexture"),
      MV : gl.getUniformLocation(backdrop.program, "MV"),
      P : gl.getUniformLocation(backdrop.program, "P")
    };
  }

  resize();

  window.requestAnimationFrame(render);  
}


function render() 
{
  time += timeDelta;

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  V = translate(0.0, 0.0, -0.5*(near + far));
  ms.load(V);  

  //drawBG();
  drawCylinders();
  drawSpheres();

  window.requestAnimationFrame(render);
}

function drawSpheres() 
{
  var name, sphere;

  name = "OuterGrass";
  sphere = Spheres[name];

  sphere.model.PointMode = false;

  ms.push();
  //ms.rotate(time * -2, [0, 0, 1]);
  ms.translate(0, -50, (sphere.distance));
  ms.rotate(time * -2, [0, 0, 1]);
  ms.scale(sphere.radius);
  gl.useProgram(sphere.model.program);
  gl.uniformMatrix4fv(sphere.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(sphere.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(sphere.model.uniforms.color, flatten(sphere.color));
  sphere.model.render();
  ms.pop();

  name = "Road";
  sphere = Spheres[name];

  sphere.model.PointMode = false;

  ms.push();
  //ms.rotate(time * -2, [0, 0, 1]);
  ms.translate(0, -50, (sphere.distance));
  ms.rotate(time * -2, [0, 0, 1]);
  ms.scale(sphere.radius);
  gl.useProgram(sphere.model.program);
  gl.uniformMatrix4fv(sphere.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(sphere.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(sphere.model.uniforms.color, flatten(sphere.color));
  sphere.model.render();
  ms.pop();

  name = "InnerGrass";
  sphere = Spheres[name];

  sphere.model.PointMode = false;

  ms.push();
  //ms.rotate(time * -2, [0, 0, 1]);
  ms.translate(0, -50, (sphere.distance));
  ms.rotate(time * -2, [0, 0, 1]);
  ms.scale(sphere.radius);
  gl.useProgram(sphere.model.program);
  gl.uniformMatrix4fv(sphere.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(sphere.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(sphere.model.uniforms.color, flatten(sphere.color));
  sphere.model.render();
  ms.pop();

  // Outer ring of wheel
  name = "Tire";
  sphere = Spheres[name];

  sphere.model.PointMode = false;

  ms.push();
  ms.rotate(time * 2, [0, 0, 1]);
  ms.translate(0, 0, (sphere.distance));
  ms.scale(sphere.radius);
  gl.useProgram(sphere.model.program);
  gl.uniformMatrix4fv(sphere.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(sphere.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(sphere.model.uniforms.color, flatten(sphere.color));
  sphere.model.render();
  ms.pop();

  // "Background" circle of wheel
  name = "Wheel";
  sphere = Spheres[name];

  sphere.model.PointMode = false;

  ms.push();
  ms.rotate(time * 2, [0, 0, 1]);
  ms.translate(0, 0, (sphere.distance));
  ms.scale(sphere.radius);
  gl.useProgram(sphere.model.program);
  gl.uniformMatrix4fv(sphere.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(sphere.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(sphere.model.uniforms.color, flatten(sphere.color));
  sphere.model.render();
  ms.pop();

  // Inner circle of wheel
  name = "Center";
  sphere = Spheres[name];

  sphere.model.PointMode = false;

  ms.push();
  ms.rotate(time * 2, [0, 0, 1]);
  ms.translate(0, 0, (sphere.distance));
  ms.scale(sphere.radius);
  gl.useProgram(sphere.model.program);
  gl.uniformMatrix4fv(sphere.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(sphere.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(sphere.model.uniforms.color, flatten(sphere.color));
  sphere.model.render();
  ms.pop();

  name = "Leaf1";
  sphere = Spheres[name];

  sphere.model.PointMode = false;

  ms.push();
  //PIVOT POINT
  ms.translate(0, -50, (sphere.distance));
  //ROTATE
  ms.rotate(time * -2, [0, 0, 1]);
  //MOVE AWAY FROM ORIGIN
  ms.translate(122, 0, 0);
  ms.scale(sphere.radius);
  gl.useProgram(sphere.model.program);
  gl.uniformMatrix4fv(sphere.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(sphere.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(sphere.model.uniforms.color, flatten(sphere.color));
  sphere.model.render();
  ms.pop();

  name = "Leaf2";
  sphere = Spheres[name];

  sphere.model.PointMode = false;

  ms.push();
  //PIVOT POINT
  ms.translate(0, -50, (sphere.distance));
  //ROTATE
  ms.rotate(time * -2, [0, 0, 1]);
  //LOCAL ROTATE
  ms.rotate(45, [0, 0, 45]);
  //MOVE AWAY FROM ORIGIN
  ms.translate(122, 0, 0);
  ms.scale(sphere.radius);
  gl.useProgram(sphere.model.program);
  gl.uniformMatrix4fv(sphere.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(sphere.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(sphere.model.uniforms.color, flatten(sphere.color));
  sphere.model.render();
  ms.pop();

  name = "Leaf3";
  sphere = Spheres[name];

  sphere.model.PointMode = false;

  ms.push();
  //PIVOT POINT
  ms.translate(0, -50, (sphere.distance));
  //ROTATE
  ms.rotate(time * -2, [0, 0, 1]);
  //LOCAL ROTATE
  ms.rotate(90, [0, 0, 45]);
  //MOVE AWAY FROM ORIGIN
  ms.translate(122, 0, 0);
  ms.scale(sphere.radius);
  gl.useProgram(sphere.model.program);
  gl.uniformMatrix4fv(sphere.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(sphere.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(sphere.model.uniforms.color, flatten(sphere.color));
  sphere.model.render();
  ms.pop();

  name = "Leaf4";
  sphere = Spheres[name];

  sphere.model.PointMode = false;

  ms.push();
  //PIVOT POINT
  ms.translate(0, -50, (sphere.distance));
  //ROTATE
  ms.rotate(time * -2, [0, 0, 1]);
  //LOCAL ROTATE
  ms.rotate(135, [0, 0, 45]);
  //MOVE AWAY FROM ORIGIN
  ms.translate(122, 0, 0);
  ms.scale(sphere.radius);
  gl.useProgram(sphere.model.program);
  gl.uniformMatrix4fv(sphere.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(sphere.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(sphere.model.uniforms.color, flatten(sphere.color));
  sphere.model.render();
  ms.pop();

  name = "Leaf5";
  sphere = Spheres[name];

  sphere.model.PointMode = false;

  ms.push();
  //PIVOT POINT
  ms.translate(0, -50, (sphere.distance));
  //ROTATE
  ms.rotate(time * -2, [0, 0, 1]);
  //LOCAL ROTATE
  ms.rotate(180, [0, 0, 45]);
  //MOVE AWAY FROM ORIGIN
  ms.translate(122, 0, 0);
  ms.scale(sphere.radius);
  gl.useProgram(sphere.model.program);
  gl.uniformMatrix4fv(sphere.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(sphere.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(sphere.model.uniforms.color, flatten(sphere.color));
  sphere.model.render();
  ms.pop();

  name = "Leaf6";
  sphere = Spheres[name];

  sphere.model.PointMode = false;

  ms.push();
  //PIVOT POINT
  ms.translate(0, -50, (sphere.distance));
  //ROTATE
  ms.rotate(time * -2, [0, 0, 1]);
  //LOCAL ROTATE
  ms.rotate(225, [0, 0, 45]);
  //MOVE AWAY FROM ORIGIN
  ms.translate(122, 0, 0);
  ms.scale(sphere.radius);
  gl.useProgram(sphere.model.program);
  gl.uniformMatrix4fv(sphere.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(sphere.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(sphere.model.uniforms.color, flatten(sphere.color));
  sphere.model.render();
  ms.pop();

  name = "Leaf7";
  sphere = Spheres[name];

  sphere.model.PointMode = false;

  ms.push();
  //PIVOT POINT
  ms.translate(0, -50, (sphere.distance));
  //ROTATE
  ms.rotate(time * -2, [0, 0, 1]);
  //LOCAL ROTATE
  ms.rotate(270, [0, 0, 45]);
  //MOVE AWAY FROM ORIGIN
  ms.translate(122, 0, 0);
  ms.scale(sphere.radius);
  gl.useProgram(sphere.model.program);
  gl.uniformMatrix4fv(sphere.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(sphere.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(sphere.model.uniforms.color, flatten(sphere.color));
  sphere.model.render();
  ms.pop();

  name = "Leaf8";
  sphere = Spheres[name];

  sphere.model.PointMode = false;

  ms.push();
  //PIVOT POINT
  ms.translate(0, -50, (sphere.distance));
  //ROTATE
  ms.rotate(time * -2, [0, 0, 1]);
  //LOCAL ROTATE
  ms.rotate(315, [0, 0, 45]);
  //MOVE AWAY FROM ORIGIN
  ms.translate(122, 0, 0);
  ms.scale(sphere.radius);
  gl.useProgram(sphere.model.program);
  gl.uniformMatrix4fv(sphere.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(sphere.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(sphere.model.uniforms.color, flatten(sphere.color));
  sphere.model.render();
  ms.pop();
}

function drawCylinders() 
{
  var name, cylinder;

  // Wheel spokes
  name = "Spoke1";
  cylinder = Cylinders[name];

  cylinder.model.PointMode = false;

  ms.push();
  ms.rotate(90, [0, -1, 0]);
  ms.rotate(time * 2, [1, 0, 0]);
  ms.translate(25, 0, (cylinder.distance));
  ms.scale(cylinder.radius);
  ms.scale(1, 1, 7);
  gl.useProgram(cylinder.model.program);
  gl.uniformMatrix4fv(cylinder.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(cylinder.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(cylinder.model.uniforms.color, flatten(cylinder.color));
  cylinder.model.render();
  ms.pop();


  name = "Spoke2";
  cylinder = Cylinders[name];

  cylinder.model.PointMode = false;

  ms.push();
  ms.rotate(90, [0, -1, 0]);
  ms.rotate(90, [1, 0, 0]);
  ms.rotate(time * 2, [1, 0, 0]);
  ms.translate(25, 0, (cylinder.distance));
  ms.scale(cylinder.radius);
  ms.scale(1, 1, 7);
  gl.useProgram(cylinder.model.program);
  gl.uniformMatrix4fv(cylinder.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(cylinder.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(cylinder.model.uniforms.color, flatten(cylinder.color));
  cylinder.model.render();
  ms.pop();


  name = "Spoke3";
  cylinder = Cylinders[name];

  cylinder.model.PointMode = false;

  ms.push();
  ms.rotate(90, [0, -1, 0]);
  ms.rotate(180, [1, 0, 0]);
  ms.rotate(time * 2, [1, 0, 0]);
  ms.translate(25, 0, (cylinder.distance));
  ms.scale(cylinder.radius);
  ms.scale(1, 1, 7);
  gl.useProgram(cylinder.model.program);
  gl.uniformMatrix4fv(cylinder.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(cylinder.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(cylinder.model.uniforms.color, flatten(cylinder.color));
  cylinder.model.render();
  ms.pop();


  name = "Spoke4";
  cylinder = Cylinders[name];

  cylinder.model.PointMode = false;

  ms.push();
  ms.rotate(90, [0, -1, 0]);
  ms.rotate(270, [1, 0, 0]);
  ms.rotate(time * 2, [1, 0, 0]);
  ms.translate(25, 0, (cylinder.distance));
  ms.scale(cylinder.radius);
  ms.scale(1, 1, 7);
  gl.useProgram(cylinder.model.program);
  gl.uniformMatrix4fv(cylinder.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(cylinder.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(cylinder.model.uniforms.color, flatten(cylinder.color));
  cylinder.model.render();
  ms.pop();

  name = "Tree1";
  cylinder = Cylinders[name];

  cylinder.model.PointMode = false;

  ms.push();
  //ms.rotate(time * -2, [1, 0, 0]);

  //PIVOT POINT
  ms.translate(0, -50, (cylinder.distance));
  //ROTATE
  ms.rotate(time * -2, [0, 0, 1]);
  //LAY DOWN => |
  ms.rotate(90, [0, -1, 0]);
  //ROTATE LOCAL
  ms.rotate(135, [1, 0, 0]);
  //MOVE AWAY FROM ORIGIN
  //ms.translate(0, 0, 50);

  ms.scale(cylinder.radius);
  ms.scale(1, 1, 60);
  gl.useProgram(cylinder.model.program);
  gl.uniformMatrix4fv(cylinder.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(cylinder.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(cylinder.model.uniforms.color, flatten(cylinder.color));
  cylinder.model.render();
  ms.pop();

  name = "Tree2";
  cylinder = Cylinders[name];

  cylinder.model.PointMode = false;

  ms.push();

  //MOVE ORIGIN
  ms.translate(0, -50, (cylinder.distance));
  //ROTATE
  ms.rotate(time * -2, [0, 0, 1]);
  //LAY DOWN
  ms.rotate(90, [0, -1, 0]);
  //LOCAL ROTATE
  ms.rotate(45, [1, 0, 0]);
  //MOVE AWAY FROM ORIGIN
  //ms.translate(0, 0, 50);

  ms.scale(cylinder.radius);
  ms.scale(1, 1, 60);
  gl.useProgram(cylinder.model.program);
  gl.uniformMatrix4fv(cylinder.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(cylinder.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(cylinder.model.uniforms.color, flatten(cylinder.color));
  cylinder.model.render();
  ms.pop();

  name = "Tree3";
  cylinder = Cylinders[name];

  cylinder.model.PointMode = false;

  ms.push();
  //MOVE ORIGIN
  ms.translate(0, -50, (cylinder.distance));
  //ROTATE
  ms.rotate(time * -2, [0, 0, 1]);
  //LAY DOWN
  ms.rotate(90, [0, -1, 0]);
  //LOCAL ROTATE
  ms.rotate(180, [1, 0, 0]);
  //MOVE AWAY FROM ORIGIN
  //ms.translate(0, 0, 50);

  ms.scale(cylinder.radius);
  ms.scale(1, 1, 60);
  gl.useProgram(cylinder.model.program);
  gl.uniformMatrix4fv(cylinder.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(cylinder.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(cylinder.model.uniforms.color, flatten(cylinder.color));
  cylinder.model.render();
  ms.pop();

  name = "Tree4";
  cylinder = Cylinders[name];

  cylinder.model.PointMode = false;

  ms.push();
  //MOVE ORIGIN
  ms.translate(0, -50, (cylinder.distance));
  //ROTATE
  ms.rotate(time * -2, [0, 0, 1]);
  //LAY DOWN
  ms.rotate(90, [0, -1, 0]);
  //LOCAL ROTATE
  ms.rotate(270, [1, 0, 0]);
  //MOVE AWAY FROM ORIGIN
  //ms.translate(0, 0, 50);

  ms.scale(cylinder.radius);
  ms.scale(1, 1, 60);
  gl.useProgram(cylinder.model.program);
  gl.uniformMatrix4fv(cylinder.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(cylinder.model.uniforms.P, false, flatten(P));
  gl.uniform4fv(cylinder.model.uniforms.color, flatten(cylinder.color));
  cylinder.model.render();
  ms.pop();

}

function drawBG() 
{
  var name, back, data;

  name = "Background";
  back = BGs[name];
  //data = Objects[name];

  ms.push();
  ms.rotate((time / 1) * 2, [0, 0, 1]);

  gl.useProgram(back.program);
  gl.uniformMatrix4fv(back.model.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(back.model.uniforms.P, false, flatten(P));
  gl.uniform1i(back.model.uniforms.texture, 0);
  back.render();
  ms.pop();
}

function resize() 
{
  var w = canvas.clientWidth;
  var h = canvas.clientHeight;

  gl.viewport(0, 0, w, h);

  var fovy = 20.0;
  var aspect = w / h;

  P = perspective(fovy, aspect, near, far);
}

window.onload = init;
window.onresize = resize;