$('document').ready(() => {
  var tasks = [];
  var $list = $('#tasks-list');

  function getTask(task, cb) {
    task.taskId = task._id;
    window.TASKS_SRV.get({ taskId: task._id }).then(cb);
  }

  function updateTask(task, cb) {
    window.TASKS_SRV.update({
      taskId: task._id,
      _id: task._id,
      title: task.title,
      description: task.description,
      images: task.images,
      completed: task.completed
    }).then(cb);
  }

  function updateTaskTitle(task, cb) {
    window.TASKS_SRV.updateTitle({
      taskId: task._id,
      title: task.$el.find('input').val()
    }).then(cb);
  }

  function updateTaskImages(task, files, cb) {
    var data = new FormData();
    for (var i = 0; i < files.length; i++) {
      data.append('file', files[i]);
    }
    window.TASKS_SRV.updateImages({
      taskId: task._id,
      files: data
    }).then(cb);
  }

  function toogleCompletedTask(task, cb) {
    window.TASKS_SRV.updateCompleted({
      taskId: task._id,
      completed: !task.completed
    }).then(cb);
  }

  function removeTask(task, cb) {
    window.TASKS_SRV.delete({
      taskId: task._id
    }).then(cb);
  }

  function toggleTaskDetails(html) {
    if (html) {
      $('.tasks-list-container').removeClass('col-sm-12').addClass('col-sm-7');
      $('.task-details-container').addClass('col-sm-5').html(html);
    } else {
      $('.tasks-list-container').removeClass('col-sm-7').addClass('col-sm-12');
      $('.task-details-container').removeClass('col-sm-5').empty();
    }
  }

  function renderTaskDetails(task) {
    task.$details = _.template(document.getElementById('task-details-tpl').innerHTML)({
      task: task
    });
    task.$details = $(task.$details);
    task.$details.find('#edit-task-btn-save').on('click', e => {
      e.preventDefault();
      task.title = task.$details.find('#edit-task-title').val().trim();
      task.description = task.$details.find('#edit-task-description').val().trim();
      updateTask(task, res => {
        task.$el = renderTask(res).$el;
        task.$details = renderTaskDetails(res).$details;
        $('#' + task._id).replaceWith(task.$el);
      });
    });
    task.$details.find('#edit-task-btn-complete').on('click', e => {
      e.preventDefault();
      toogleCompletedTask(task, res => {
        task.$el = renderTask(res).$el;
        $('#' + task._id).replaceWith(task.$el);
      });
    });
    task.$details.find('#edit-task-btn-remove').on('click', e => {
      e.preventDefault();
      removeTask(task, res => {
        $('#' + task._id).remove();
        tasks = tasks.filter(item => {
          return item._id !== res._id;
        });
        toggleTaskDetails();
      });
    });
    task.$details.find('button#edit-task-image-btn').on('click', e => {
      e.preventDefault();
      var files = document.getElementById('edit-task-image').files;
      if (files && files.length) {
        updateTaskImages(task, files, res => {
          getTask(task, renderTaskDetails);
        });
      }
    });
    toggleTaskDetails(task.$details);
    return task;
  }

  function renderTask(task) {
    task.$el = _.template(document.getElementById('task-tpl').innerHTML)({
      task: task
    });
    task.$el = $(task.$el);
    task.$el.find('input.form-control').on('keypress', e => {
      if (e && e.which == 13) {
        updateTaskTitle(task, res => {
          task.$el = renderTask(res).$el;
          $('#' + task._id).replaceWith(task.$el);
        });
      }
    });
    task.$el.find('button.btn-task-status').on('click', e => {
      e.preventDefault();
      toogleCompletedTask(task, res => {
        task.$el = renderTask(res).$el;
        $('#' + task._id).replaceWith(task.$el);
      });
    });
    task.$el.find('button.btn-task-details').on('click', e => {
      e.preventDefault();
      getTask(task, renderTaskDetails);
    });

    return task;
  }

  function renderTasks(items) {
    items = items.map(renderTask);
    $list.empty().append(items.map(item => {
      return item.$el;
    }));
    return items;
  }

  function listTasks(params) {
    window.TASKS_SRV.list(params).then(items => {
      tasks = renderTasks(items);
    });
  }

  listTasks();

  $('#form-new-task').on('submit', e => {
    e.preventDefault();
    window.TASKS_SRV.create({
      task: {
        title: $('#new-task').val()
      }
    }).then(task => {
      task = renderTask(task);
      tasks.push(task);
      $list.prepend(task.$el);
    });
  });

  var filters = {};

  $('#btn-sort-az').on('click', e => {
    e.preventDefault();
    filters.sort = filters.sort !== '-title' ? '-title' : 'title';
    listTasks(filters);
  });

  $('#btn-sort-09').on('click', e => {
    e.preventDefault();
    filters.sort = filters.sort !== '-createdAt' ? '-createdAt' : 'createdAt';
    listTasks(filters);
  });

  $('#btn-filter-completed').on('click', e => {
    e.preventDefault();
    filters.filter = filters.filter !== '-completed' ? '-completed' : 'completed';
    listTasks(filters);
  });

  $('#btn-filter-enable').on('click', e => {
    e.preventDefault();
    filters.filter = filters.filter !== '-enable' ? '-enable' : 'enable';
    listTasks(filters);
  });
});