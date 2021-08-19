var img = "midterm-bg.png";

var spokeColor = [128/255, 92/255, 69/255, 1.0];
var spokeRadius = 0.5;

var barkColor = [100/255, 60/255, 10/255, 1.0];
var barkRadius = 2;
var barkDistance = -90;

var Spheres = {
    Tire : {
        model : undefined,
        radius : 12,  
        distance : 10,
        color : spokeColor
    },

    Wheel : {
        model : undefined,
        radius : 8,
        distance : 15,
        color : [0/255, 127/255, 0/255, 1.0]
    },

    Center : {
        model : undefined,
        radius : 1.2,
        distance : 25,
        color : spokeColor
    },

    OuterGrass : {
        model : undefined,
        radius : 90,  
        distance : -120,
        color : [0/255, 127/255, 0/255, 1.0]
    },

    Road : {
        model : undefined,
        radius : 55,
        distance : -75,
        color : [ 0.2, 0.2, 0.2, 1.0 ]
    },

    InnerGrass : {
        model : undefined,
        radius : 35,  
        distance : -50,
        color : [0/255, 127/255, 0/255, 1.0]
    },

    Leaf1 : {
        model : undefined,
        radius : 8,
        distance : barkDistance,
        color : [0/255, 127/255, 0/255, 1.0]
    },

    Leaf2 : {
        model : undefined,
        radius : 8,
        distance : barkDistance,
        color : [0/255, 127/255, 0/255, 1.0]
    },

    Leaf3 : {
        model : undefined,
        radius : 8,
        distance : barkDistance,
        color : [0/255, 127/255, 0/255, 1.0]
    },

    Leaf4 : {
        model : undefined,
        radius : 8,
        distance : barkDistance,
        color : [0/255, 127/255, 0/255, 1.0]
    },

    Leaf5 : {
        model : undefined,
        radius : 8,
        distance : barkDistance,
        color : [0/255, 127/255, 0/255, 1.0]
    },

    Leaf6 : {
        model : undefined,
        radius : 8,
        distance : barkDistance,
        color : [0/255, 127/255, 0/255, 1.0]
    },

    Leaf7 : {
        model : undefined,
        radius : 8,
        distance : barkDistance,
        color : [0/255, 127/255, 0/255, 1.0]
    },

    Leaf8 : {
        model : undefined,
        radius : 8,
        distance : barkDistance,
        color : [0/255, 127/255, 0/255, 1.0]
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

    Tree1 : {
        model : undefined,
        radius : barkRadius,
        distance : barkDistance,
        color : barkColor
    },

    Tree2 : {
        model : undefined,
        radius : barkRadius,
        distance : barkDistance,
        color : barkColor
    },

    Tree3 : {
        model : undefined,
        radius : barkRadius,
        distance : barkDistance,
        color : barkColor
    },

    Tree4 : {
        model : undefined,
        radius : barkRadius,
        distance : barkDistance,
        color : barkColor
    },

};

  var BGs = {
    Background : {
        model : undefined,
        source : img,
    }
  };