$(function(){
  bindCheckBoxes($("li input[type='checkbox']"));
  bindDeleteButtons($("li span"));
  bindForm();
});

function bindCheckBoxes(boxes) {
  boxes.on('change', function() {
    var todo = $(this).parent();
    var done = $(this).is(':checked');

    done ? todo.addClass("done") : todo.removeClass("done");

    updateTodo(todo, done);
  });
}

function bindDeleteButtons(buttons) {
  buttons.on("click", function(e) {
    var todo = $(this).parent();

    deleteTodo(todo);
  });
}

function bindForm() {
  $("form").on("submit", function(e) {
    e.preventDefault();

    console.log( "todo[" + $(this).serialize() );

    $.ajax({
      url: "/todos",
      type: "POST",
      data: "todo[" + $(this).serialize() + "]",
      context: this,
      success: appendTodo
    });
  });
}

function updateTodo(todo, done) {
  $.ajax({
    url: "/todos/" + todo.data("todo-id"),
    type: "POST",
    dataType: 'json',
    data: {_method: "put", todo: {done: done}}
  });
}

function deleteTodo(todo) {
  $.ajax({
    url: "/todos/" + todo.data("todo-id"),
    type: "POST",
    dataType: "json",
    data: {_method: "delete"},
    success: removeTodo,
    context: todo
  });
}

function removeTodo() {
  this.remove();
}

function appendTodo(todo) {
  this.reset();

  var li = $("<li>" + todo.task + "</li>");
  li.append($("<input />", { type: "checkbox" }));
  li.append($("<span>&times;</span>"));
  li.data("todo-id", todo.id);

  $("ul").append(li);

  bindCheckBoxes(li.find("input"));
  bindDeleteButtons(li.find("span"));
}