var toolbar = $('.header');
var controls = $('.controls');
var chatBtn = $('.chat-btn');
var sidebar = $('.sidebar');

var toolbarManager = new ToolbarManager(window, toolbar, controls);

$(window).mousemove(function(e) {
  toolbarManager.handleMouseMove(e);
});

$(chatBtn).on('click', function(e) {
  $('body').toggleClass('sidebar-active');
  sidebar.toggleClass('active');
});
