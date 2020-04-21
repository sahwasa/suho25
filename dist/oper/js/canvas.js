var pos = {
  drawable: false,
  del: 0,
  x: -1,
  y: -1
};
var canvas, ctx;
var drawBackup = new Array();

// 화면 로드시 canvas 이벤트 적용
window.onload = function() {
  
  // IE7 대응 (IE7에서도 canvas기능을 사용하기위해 excanvas.js 추가)
  if (typeof G_vmlCanvasManager != "undefined") {
    canvas = G_vmlCanvasManager.initElement(canvas);
  } else {
    canvas = document.getElementById("canvas");
  }
  
  // canvas가 지원되는 브라우저에서만 적용
  if (canvas && canvas.getContext) {
    
    ctx = canvas.getContext("2d");
      ctx.lineCap = "round";
    
    canvas.addEventListener("mousedown", listener);
    canvas.addEventListener("mousemove", listener);
    canvas.addEventListener("mouseup", listener);
    canvas.addEventListener("mouseout", listener);
    
    canvas.addEventListener("touchstart", listener);
    canvas.addEventListener("touchmove", listener);
    canvas.addEventListener("touchend", listener);
    canvas.addEventListener("touchcancel", listener);
    
  }
}

function listener(event) {
  
  switch (event.type) {
    case "mousedown":
    case "touchstart":
      initDraw(event);
      break;
    
    case "mousemove":
    case "touchmove":
      if (pos.drawable) {
        draw(event);
      }
      break;
    
    case "mouseout":
    case "mouseup":
    case "touchend":
    case "touchcancel":
      finishDraw();
      break;
  }
}

// 그리기 시작
function initDraw(event) {
  saveCanvas();
  event.preventDefault();
  ctx.beginPath();
  pos.drawable = true;
  var coors = getPosition(event);
  pos.x = coors.X;
  pos.y = coors.Y;
  ctx.moveTo(pos.X, pos.Y);
}

// 그리기 & 지우기 (펜과 지우개 선택에 따라 달라짐)
function draw(event) {
  event.preventDefault();
  var coors = getPosition(event);
    // 그리기
  if (pos.del == 0) {
    ctx.lineTo(coors.X, coors.Y);
  }
  pos.x = coors.X;
  pos.y = coors.Y;
  ctx.stroke();
}

// 그리기 종료
function finishDraw() {
  pos.drawable = false;
  pos.x = -1;
  pos.y = -1;
}

// 마우스,터치 위치 반환
function getPosition(event) {
  var x = -1;
  var y = -1;
  if (event.type.startsWith("touch")) { // IE는 startsWith 미지원이므로 따로 정의필요
    x = event.touches[0].pageX;
    y = event.touches[0].pageY;
  } else {
    x = event.pageX;
    y = event.pageY;
  }
  return {X: (x - $(canvas).offset().left), Y: (y - $(canvas).offset().top)};
}

// 현재 상태 저장
function saveCanvas() {
  drawBackup.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

// 펜 선택
function pen(event, thisObj) {
  event.preventDefault();
  pos.del = 0;
}

// 되돌리기
function prevCanvas(event) {
  event.preventDefault();
  if (drawBackup.length > 0) {
    ctx.putImageData(drawBackup.pop(), 0, 0);
  }
}

// 모두 지우기
function clearCanvas(event) {
  event.preventDefault();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
}