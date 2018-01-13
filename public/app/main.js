var app = angular.module("watermark-application", ["ui.router"]);
app.constant('SERVER_ROOT_URL', 'http://localhost:3000/api');

app.controller("ApplyWaterMarkController", ["$scope", "$http", 
	function($scope, $http){

		$scope.imageLoaded = false;
		$scope.textAdded = false;

		$scope.theCanvas;
		$scope.canvasWaterMark;

		$scope.waterMarkFont;
		$scope.waterMarkColor;
		$scope.waterMarkText;

		$scope.init = function(){
			$scope.imageLoaded = false;
			$scope.textAdded = false;

			$scope.theCanvas = new fabric.Canvas('imageCanvas');

			$scope.fontFamilyOptions =  ["Andale Mono", 
				"Arial", 
				"Arial Black",
	            "Comic Sans MS",	
	            "Courier New",
	            "Georgia",	
	            "Impact",	
	            "Lucida Console",
	            "Lucida Sans Unicode",	
	            "Marlett",	
	            "Minion Web",
	            "Symbol",	
	            "Times New Roman",	
	            "Tahoma",
	            "Trebuchet MS",	 
	            "Verdana",	 	
	            "Webdings"
        	];

        	$scope.waterMarkFont = $scope.fontFamilyOptions[0];
        	$scope.waterMarkColor = "#FFFFFF";

        	// Set listener for when image is loaded
			document.getElementById('loadImageInput').onchange = function handleImage(e) {
			var reader = new FileReader();
			  reader.onload = function (event){
			    var imgObj = new Image();
			    imgObj.src = event.target.result;
			    imgObj.onload = function () {
			    	$scope.loadImage(imgObj.src, imgObj.width, imgObj.height);
			    }
			  }
			  reader.readAsDataURL(e.target.files[0]);
			};
		};

		$scope.loadImage = function(src, width, height){
			$scope.imageLoaded = true;
			//Default values
			realWidth = 375;
			realHeight = 350;

			if (width){
				realWidth = width;
			}

			if (height){
				realHeight = height;
			}

			$scope.theCanvas.setWidth(realWidth);
			$scope.theCanvas.setHeight(realHeight);

			var maxWidth = 1000;

			//Just so the image is not too big for the screen
			if ($scope.theCanvas.getWidth() > maxWidth){
				var newHeight = maxWidth * $scope.theCanvas.getHeight() / $scope.theCanvas.getWidth();
				$scope.theCanvas.setWidth(maxWidth);
				$scope.theCanvas.setHeight(newHeight);
			}


			$scope.theCanvas.setBackgroundImage(src,
		       $scope.theCanvas.renderAll.bind($scope.theCanvas), {
		        meetOrSlice: 'meet'
		    });

		    $scope.$apply();
		};

		$scope.addWaterMark = function(){
			$scope.textAdded = true;
			$scope.waterMarkText = "Hello angular";

			var newID = (new Date()).getTime().toString().substr(5);
			$scope.canvasWaterMark = new fabric.Text($scope.waterMarkText, {
				left: $scope.theCanvas.getWidth() / 2,
				top: $scope.theCanvas.getHeight() / 2,
				charSpacing: 1000,
				myid: newID
			});

			$scope.canvasWaterMark.setColor($scope.waterMarkColor);

		    $scope.theCanvas.add($scope.canvasWaterMark).setActiveObject($scope.canvasWaterMark);
		    $scope.theCanvas.calcOffset();
		    $scope.theCanvas.renderAll();
		};

		$scope.changeWaterMarkText = function(){
		  $scope.canvasWaterMark.setText($scope.waterMarkText);
		  $scope.theCanvas.renderAll();
		};

		$scope.changeWaterMarkFont = function(){
			if ($scope.canvasWaterMark === null || $scope.canvasWaterMark === undefined){
				return;
			}

			$scope.canvasWaterMark.set("fontFamily",$scope.waterMarkFont);
  			$scope.theCanvas.renderAll();
		};

		$scope.changeWaterMarkColor = function(){
			if ($scope.canvasWaterMark === null || $scope.canvasWaterMark === undefined){
				return;
			}

  			$scope.canvasWaterMark.setColor($scope.waterMarkColor);
  			$scope.theCanvas.renderAll();
		};

		$scope.saveImage = function(){
			$scope.theCanvas.discardActiveObject();
			$scope.theCanvas.renderAll();
			$("#imageCanvas").get(0).toBlob(function(blob){
				saveAs(blob, "edited.jpg");
			});
		};
}]);