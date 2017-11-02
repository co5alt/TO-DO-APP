var i = 0;
for (i = 0; i < localStorage.length; i++) {
    var item_id = "item" + i;
}

function add_todo(container, todo_desc, due_date, priority, item_id) {

    var priority_class = "list-group-item-success";
    if (priority == "low") {
        priority_class = "list-group-item-success";
    } else if (priority == "medium") {
        priority_class = "list-group-item-warning";
    } else if (priority == "high") {
        priority_class = "list-group-item-danger";
    }

    var item_id = "item" + i;

    var todo_item = '<li id="' + item_id + '" class="' + priority_class + ' ' + container + ' list-group-item d-flex justify-content-between align-items-center"><span class="due-date">' + due_date + '</span><span class="scratch">' + todo_desc + '</span><span class="badge badge-danger badge-pill remove">X</span></li>';

    $(container + " ul").append(todo_item);
    var item = $('#' + item_id);
    item.css('display', 'none');
    item.slideDown();
    localStorage.setItem(item_id, JSON.stringify(todo_item));
    i++;

}

function load_todo() {
    for (i = 0; i < localStorage.length; i++) {
        var loaded = JSON.parse((localStorage.getItem(localStorage.key(i))));
        if (loaded.includes(".morning")) {
            $(".morning ul").append(loaded);
        }
        else if (loaded.includes(".afternoon")) {
            $(".afternoon ul").append(loaded);
        }
        
        else if (loaded.includes(".evening")) {
            $(".evening ul").append(loaded);
            
        }
    }
}


function reset_input() {
    $("#todo-desc").val("");
}

$(document).ready(function () {
    
    load_todo();

    $("body").on("click", ".remove", function () {
        $(this).parent().remove();
    });

    $("body").on("click", ".scratch", function () {
        $(this).parent().toggleClass("completed");
    });


    $("#todo-form").submit(function (event) {
        var todo_desc = $("#todo-desc").val();
        var todo_group = $("#todo-group").val();
        var due_date = $("#due-date").val();
        var priority = $("input[name='item-priority']:checked").val();

        if (todo_desc !== "") {

            if (todo_group == "morning") {

                add_todo(".morning", todo_desc, due_date, priority);
                reset_input();

            } else if (todo_group == "afternoon") {

                add_todo(".afternoon", todo_desc, due_date, priority);
                reset_input();

            } else if (todo_group == "evening") {
                add_todo(".evening", todo_desc, due_date, priority);
                reset_input();
            }

            event.preventDefault();
        }

    });

});

$("reset").on("click", function() {
    localStorage.clear();
});

$("#new-bar").on("click", function () {
    $("#add-todo").show();
    $("#new-bar").hide();
});

$("#collapse").on("click", function () {
    $("#new-bar").show();
    $("#add-todo").hide();
});

/*$(document).ready(function () {
    var i = 0;
    for (i = 0; i < localStorage.length; i++) {
        var taskID = "task-" + i;
        $('#taskList').append("<li id='" + taskID + "'>" + localStorage.getItem(taskID) + "</li>");
    }
    $('#clear').click(function () {
        localStorage.clear();
    });
    $('#taskEntryForm').submit(function () {
        if ($('#taskInput').val() !== "") {
            var taskID = "task-" + i;
            var taskMessage = $('#taskInput').val();
            localStorage.setItem(taskID, taskMessage);
            $('#taskList').append("<li class='task' id='" + taskID + "'>" + taskMessage + "</li>");
            var task = $('#' + taskID);
            task.css('display', 'none');
            task.slideDown();
            $('#taskInput').val("");
            i++;
        }
        return false;
    });

    $('#taskList').on("click", "li", function (event) {
        self = $(this);
        taskID = self.attr('id');
        localStorage.removeItem(taskID);
        self.slideUp('slow', function () {
            self.remove();
        });

    });


});*/
