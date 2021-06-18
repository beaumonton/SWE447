
function Kube( vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

   	this.program = initShaders(gl, vertShdr, fragShdr);

   	if ( this.program < 0 ) {
       	alert( "Error: Cube shader pipeline failed to compile.\n\n" +
       	    "\tvertex shader id:  \t" + vertShdr + "\n" +
       	    "\tfragment shader id:\t" + fragShdr + "\n" );
       	return; 
   	}
   	
	this.positions = {
		values : new Float32Array([
           // Add your list vertex positions here 
			// Front face
			-.5, -.5,  .5,
			.5, -.5,  .5,
			.5,  .5,  .5,
			-.5,  .5,  .5,
	
			// Back face
			-.5, -.5, -.5,
			-.5,  .5, -.5,
			.5,  .5, -.5,
			.5, -.5, -.5,
	
			// Top face
			-.5,  .5, -.5,
			-.5,  .5,  .5,
			.5,  .5,  .5,
			.5,  .5, -.5,
	
			// Bottom face
			-.5, -.5, -.5,
			.5, -.5, -.5,
			.5, -.5,  .5,
			-.5, -.5,  .5,
	
			// Right face
			.5, -0.5, -0.5,
			0.5,  0.5, -0.5,
			0.5,  0.5,  0.5,
			0.5, -0.5,  0.5,
	
			// Left face
			-0.5, -0.5, -0.5,
			-0.5, -0.5,  0.5,
			-0.5,  0.5,  0.5,
			-0.5,  0.5, -0.5,
            ]),
        numComponents : 3
    };
	
	this.textures = {
		values : new Float32Array([ 
			// Front
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Back
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Top
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Bottom
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Right
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Left
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
		]),
		numComponents : 2 
	};
    
    this.indices = { 
        values : new Uint16Array([
            // Add your list of triangle indices here
			0,  1,  2,      0,  2,  3,    // front
            4,  5,  6,      4,  6,  7,    // back
            8,  9,  10,     8,  10, 11,   // top
            12, 13, 14,     12, 14, 15,   // bottom
            16, 17, 18,     16, 18, 19,   // right
            20, 21, 22,     20, 22, 23,   // left

        ])
    };
    this.indices.count = this.indices.values.length;

	function loadTexture(gl, url) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
    
        // Because images have to be download over the internet
        // they might take a moment until they are ready.
        // Until then put a single pixel in the texture so we can
        // use it immediately. When the image has finished downloading
        // we'll update the texture with the contents of the image.
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    width, height, border, srcFormat, srcType,
                    pixel);
    
        const image = new Image();
        image.crossOrigin = undefined;
        image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        requestCORSIfNotSameOrigin(image, url);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                        srcFormat, srcType, image);
    
        // WebGL1 has different requirements for power of 2 images
        // vs non power of 2 images so check if the image is a
        // power of 2 in both dimensions.
        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
            // Yes, it's a power of 2. Generate mips.
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            // No, it's not a power of 2. Turn of mips and set
            // wrapping to clamp to edge
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
        };
        image.src = url;
    
        return texture;
    }

	function isPowerOf2(value) {
        return (value & (value - 1)) == 0;
    }

    function requestCORSIfNotSameOrigin(img, url) {
        if ((new URL(url, window.location.href)).origin !== window.location.origin) {
          img.crossOrigin = url;
        }
    }

	this.texture = loadTexture(gl, "test2.png");

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	
	this.positions.buffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

	this.textures.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.textures.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.textures.values, gl.STATIC_DRAW );

	this.indices.buffer = gl.createBuffer();
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
	gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );  

	this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
	gl.enableVertexAttribArray( this.positions.attributeLoc ); 
    
	this.textures.attributeLoc = gl.getAttribLocation( this.program, "vTexCoord" );
	gl.enableVertexAttribArray( this.textures.attributeLoc );

    texLoc = gl.getUniformLocation(this.program, 'tex');
	MVLoc = gl.getUniformLocation(this.program, "MV");
	PMLoc = gl.getUniformLocation(this.program, "PM");

    this.MV = undefined;

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, this.texture);

	var time = 0;
	const deltaTime = 0.8;
	this.render = function () {
		time += deltaTime;
		var ms = new MatrixStack();
		this.MV = translate(0, 0, -5);
		ms.load(this.MV);

		ms.push();
		ms.rotate(time, [1, 0, 0]);
		ms.rotate(time, [0, 1, 0]);


		gl.useProgram( this.program );
		gl.enable(gl.DEPTH_TEST);

		gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
		gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
				gl.FLOAT, gl.FALSE, 0, 0 );
		gl.enableVertexAttribArray(this.positions.attributeLoc);

		gl.bindBuffer( gl.ARRAY_BUFFER, this.textures.buffer );
		gl.vertexAttribPointer( this.textures.attributeLoc, this.textures.numComponents, gl.FLOAT, gl.FALSE, 0, 0 );
		gl.enableVertexAttribArray(this.textures.attributeLoc);
	
		gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

		gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(ms.current()) );
		gl.uniformMatrix4fv(PMLoc, gl.FALSE, flatten(this.PM));
		

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.uniform1i(texLoc, 0);

        // Draw the cube's base
		gl.drawElements(gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0);
    }
};