var gl;

"use strict";

function Background(source, vertexShader, fragmentShader) {	
    var program = initShaders(gl, vertexShader || "texture-vertex-shader", fragmentShader || "texture-fragment-shader");
	
    var positions = [
		-1, -1,  0,
		 1, -1,  0,
		 1,  1,  0,
		-1,  1,  0
	];
	
    var indices = [
		0,  1,  2,
		0,  2,  3
	];
	
	var texcoords = [
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0
	];
	
    var vPosition = {
        numComponents: 3,
        buffer: gl.createBuffer(),
        location: gl.getAttribLocation(program, "vPosition")
    };
	
    gl.bindBuffer(gl.ARRAY_BUFFER, vPosition.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
	
    var elementArray = {
        buffer: gl.createBuffer()
    };
	
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArray.buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	
	var vTexcoord = {
		numComponents: 2,
		buffer: gl.createBuffer(),
		location: gl.getAttribLocation(program, "vTexcoord")
	};
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vTexcoord.buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
	
	var uTexture = {
		texture: gl.createTexture(),
		image: undefined,
	};
	
	uTexture.image = new Image();
	uTexture.image.src = source;
    //uTexture.image.crossOrigin = 'anonymous';
		
	uTexture.image.onload = function ()
	{
		gl.bindTexture(gl.TEXTURE_2D, uTexture.texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, uTexture.image);
			
		if (isPower2(uTexture.image.width) && isPower2(uTexture.image.height))
		{
			gl.generateMipmap(gl.TEXTURE_2D);
		}
		else
		{
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		}
	};
	
	this.program = program;
	
    this.render = function ()
	{
        gl.useProgram(program);
		
		gl.enableVertexAttribArray(vPosition.location);
        gl.bindBuffer(gl.ARRAY_BUFFER, vPosition.buffer);
        gl.vertexAttribPointer(vPosition.location, vPosition.numComponents, gl.FLOAT, gl.FALSE, 0, 0);
		
		gl.enableVertexAttribArray(vTexcoord.location);
		gl.bindBuffer(gl.ARRAY_BUFFER, vTexcoord.buffer);
        gl.vertexAttribPointer(vTexcoord.location, vTexcoord.numComponents, gl.FLOAT, gl.FALSE, 0, 0);
		
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArray.buffer);
		gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    };
};

function isPower2(value)
{
	return (value & (value - 1)) === 0;
}