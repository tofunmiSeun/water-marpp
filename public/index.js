var text;
var canvas;

var defaultText = "hello world";


var readyFunction = function () {	
	// Obtain a canvas drawing surface from fabric.js
	canvas = new fabric.Canvas('c');

	var customisationFontOptions =  ["Andale Mono", 	"Arial",  "Arial Black",
            "Comic Sans MS",	"Courier New",
            "Georgia",	"Impact",	"Lucida Console",
            "Lucida Sans Unicode",	"Marlett",	"Minion Web",
            "Symbol",	"Times New Roman",	"Tahoma",
            "Trebuchet MS",	 "Verdana",	 	"Webdings"
        ];

    // ART CUSTOMISATION
	document.getElementById('customPatternControl').onchange = function handleImage(e) {
	var reader = new FileReader();
	  reader.onload = function (event){
	    var imgObj = new Image();
	    imgObj.src = event.target.result;
	    imgObj.onload = function () {
	    	setBackground(imgObj.src, imgObj.width, imgObj.height);
	    }
	  }
	  reader.readAsDataURL(e.target.files[0]);
	};
};

var setBackground = function(src, width, height){
	//Default values
	realWidth = 375;
	realHeight = 350;

	if (width){
		realWidth = width;
	}

	if (height){
		realHeight = height;
	}

	canvas.setWidth(realWidth);
	canvas.setHeight(realHeight);

	var maxWidth = 1000;

	//Just so the image is not too big for the screen
	if (canvas.getWidth() > maxWidth){
		var newHeight = maxWidth * canvas.getHeight() / canvas.getWidth();
		canvas.setWidth(maxWidth);
		canvas.setHeight(newHeight);
	}


	canvas.setBackgroundImage(src,
       canvas.renderAll.bind(canvas), {
        meetOrSlice: 'meet'
    });
};

var addText = function(){
	var newID = (new Date()).getTime().toString().substr(5);
	text = new fabric.Text(defaultText, {
		left: canvas.getWidth() / 2,
		top: canvas.getHeight() / 2,
		myid: newID
	});

	text.setColor('#FFFFFF');

    canvas.add(text).setActiveObject(text);
    canvas.calcOffset();
    canvas.renderAll();
};

var saveImage = function(){
	canvas.discardActiveObject();
	canvas.renderAll();
	$("#c").get(0).toBlob(function(blob){
		saveAs(blob, "myImage.jpg");
	});
};

 var editWaterMarkText = function(){
  text.setText(document.getElementById('textbox_id').value);
  canvas.renderAll();
};

var editWaterMarkFont = function(){
  text.set("fontFamily",document.getElementById('select_id').value);
  canvas.renderAll();
};

var editWaterMarkColor = function(){
  text.setColor(document.getElementById('color_id').value);
  canvas.renderAll();
};

$(document).ready(readyFunction);