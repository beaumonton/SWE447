var img = 'midterm-bg.png';

var spokeColor = [128/255, 92/255, 69/255, 1.0];
var spokeRadius = 0.5;

var Spheres = {
    Tire : {
        model : undefined,
        radius : 12,  
        distance : 0,
        color : spokeColor
    },

    Wheel : {
        model : undefined,
        radius : 8,
        distance : 12,
        color : [ 0.0, 0.0, 0.0, 1.0 ]
    },

    Center : {
        model : undefined,
        radius : 1.5,
        distance : 20,
        color : spokeColor
    },
};

var Cylinders = {
    Spoke1 : {
        model : undefined,
        radius : spokeRadius,
        distance : 3,
        color : spokeColor
    },

    Spoke2 : {
        model : undefined,
        radius : spokeRadius,
        distance : 3,
        color : spokeColor
    },

    Spoke3 : {
        model : undefined,
        radius : spokeRadius,
        distance : 3,
        color : spokeColor
    },

    Spoke4 : {
        model : undefined,
        radius : spokeRadius,
        distance : 3,
        color : spokeColor
    },

};

  var BGs = {
    Background : {
        model : undefined,
        source : img,
    }
  };