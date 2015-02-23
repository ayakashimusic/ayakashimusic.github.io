function getPointsOnCircle(center, radius, count) {
    var angle = 360/count;
    var startPoints = [];
    
    for (var i = angle/2; i < 360; i += angle) {
        var j = i * Math.PI / 180;
        var x = radius * Math.sin(j);
        var y = radius * Math.cos(j);
        
        x += center.x;
        y += center.y;
        
        startPoints[startPoints.length] = new Point(x, y);
        //console.log(x, y);
    }
    
    //console.log(startPoints);
    return startPoints;
}

function drawCircle(center, radius, color, width){
    var path = new Path.Circle(center, radius);
    path.strokeColor = color;
    path.strokeWidth = width;
}

function drawPoints(pointArray){
    var path = new Path.Circle(center, 2);
    path.fillColor = 'black';
    
    var symbol = new Symbol(path);
    
    for(var i=0; i<pointArray.length; i++){
        symbol.place(pointArray[i]);
    }
}

function drawLines(center, pointArray, length, color, width){
    var justifiedPoints = [];
    
    for(var i=0; i<pointArray.length; i++){
        var start = pointArray[i];
        var vector = start - center;
        vector = vector.normalize();
        var end = start + vector * length;
        
        var line = new Path();
        line.strokeColor = color;
        line.add(start);
        line.add(end);
        
        //console.log(vector);
        
        var justification = 'left';
        
        if(vector.x > 0){
            end = end + new Point(length,0);
            line.add(end);
            justification = 'left';
        }
        else{
            end = end + new Point(-length,0);
            line.add(end);
            justification = 'right';
        }
        
        line.strokeWidth = width;
        //line.strokeCap = 'round';

        justifiedPoints[justifiedPoints.length] = {position: end, justification: justification};
    }
    
    return justifiedPoints;
}

function drawText(justifiedPoints, menuItems, spacing, color){
    for(var i=0; i<justifiedPoints.length; i++){
        var text = new PointText({
            fontSize: 30,
            fillColor: color,
            justification: justifiedPoints[i].justification,
            point: justifiedPoints[i].position,
            content: menuItems[i]
        });
        
        if(text.justification == 'left'){
            text.point += spacing;
        }
        else{
            text.point -= spacing;
        }
        
        text.onMouseEnter = function(event) {
            this.fillColor = 'blue';
        }

        text.onMouseLeave = function(event) {
            this.fillColor = color;
        }
    }
}

function onResize(event) {
    setSize();
}

function setSize(){
    center = new Point(canvas.width()/2, canvas.height()/2);
    radius = canvas.height()/3;
}

function start(){
    var menuItems = ["Info", "Music", "Bio", "Shows", "Misc", "Misc"]
    var count = menuItems.length;
    var length = 40;
    var color = "#ECF0FF";
    var textSpacing = new Point(10, 0);
    var lineWidth = 6;

    var circlePoints = getPointsOnCircle(center, radius, count);
    //drawPoints([center]);
    //drawPoints(circlePoints);
    drawCircle(center, radius, color, lineWidth);
    var justifiedPoints = drawLines(center, circlePoints, length, color, lineWidth);
    drawText(justifiedPoints, menuItems, textSpacing, "white");
}


// START //
var canvas = $("#CanvasHolder");
var center, radius;
setSize();
start();