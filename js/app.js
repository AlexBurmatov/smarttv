var cameras = [];

var player;

function main() {
  setTimeout(function(){
    $('.loader').hide();
  }, 500);

  cameras.push(new Camera('Camera 1', 'Garage', 'http://109.194.146.93:1935/h4ck4t0n/ch1.stream/manifest.m3u8', "cam0"));
  cameras.push(new Camera('Camera 2', 'Home', 'http://109.194.146.93:1935/h4ck4t0n/ch2.stream/manifest.m3u8', "cam1"));
  cameras.push(new Camera('Camera 3', 'Yard', 'https://vs.domru.ru/translation?id=27900743&guid=8ca70a5c1f6636a639ac&mode=hls', "cam2"));
}

function openVideo(id) {
  var camera = cameras.filter(function (cam) {
    return cam.id == id;
  })[0];
  $('.ui.modal').children('.header').text(camera.name + ": " + camera.info);

  player.src({src: camera.url, type: 'application/x-mpegURL'});

  player.play();

  $('.ui.modal')
    .modal('show');
}

$(document).ready(function () {
  player = videojs('my-player');

  document.addEventListener("keydown", function (inEvent) {
    switch (inEvent.keyCode) {
      case 38:
        Key_Up();
        break;
      case 40:
        Key_Down();
        break;
      case 37:
        Key_Left();
        break;
      case 39:
        Key_Right();
        break;

      case 33:
        Key_ChUp();
        break;
      case 34:
        Key_ChDown();
        break;

      case 13:
        Key_Ok();
        break;

      case 403:
        Key_Back();
        break;
    }
  });
});

function Key_Right() {
  switcher("right");
}

function Key_Left() {
  switcher("left");
}

function switcher(turn) {
  var count = $(".card").length;

  var activeId = $(".active.card").attr("id");
  $(".active.card").removeClass("active");

  var number = + activeId[3];

  var newActiveId = turn == "right" ? "cam" + ((number + 1) % count) : "cam" + ((number + count - 1) % count);

  $("#"+newActiveId).addClass("active");
}

function Key_Ok() {
  var id = $(".active.card").attr("id");
  openVideo(id);
}

function Key_Back() {
  $('.ui.modal')
    .modal('hide');
}

var Camera = function(name, info, url, htmlId) {
    this.name = name;
    this.info = info;
    this.url = url;
    this.id = htmlId;
}

main();