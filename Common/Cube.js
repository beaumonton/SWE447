function Cube( vertexShaderId, fragmentShaderId ) 
{
    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    var vertShader = vertexShaderId || "Cube-vertex-shader";
    var fragShader = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShader, fragShader);

    if ( this.program < 0 ) 
    {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShader + "\n" +
            "\tfragment shader id:\t" + fragShader + "\n" );
        return; 
    }

    this.positions = 
    { 
        values : new Float32Array([
           0.5, 0.5, 0.5,     // 0
           0.5, -0.5, 0.5,    // 1
           -0.5, -0.5, 0.5,   // 2
           -0.5, 0.5, 0.5,    // 3
           0.5, 0.5, -0.5,    // 4
           0.5, -0.5, -0.5,   // 5
           -0.5, -0.5, -0.5,  // 6
           -0.5, 0.5, -0.5    // 7
            ]),
        numComponents : 3
    };
    
    this.indices = { 
        values : new Uint16Array
        ([
            // Add your list of triangle indices here
            //Front
            0, 1, 3,
            3, 1, 2,
            1, 5, 2,
            2, 5, 6, 
            4, 7, 5,
            5, 7, 6,
            4, 0, 7,
            7, 0, 3,
            3, 2, 7,
            7, 2, 6,
            4, 5, 0,
            0, 5, 1
        ])
    };
    this.indices.count = this.indices.values.length;

    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.render = function () 
    {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};
