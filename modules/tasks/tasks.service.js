$('document').ready(() => {
  window.API_PATH = 'http://localhost:5001/';
  window.API_TASKS = window.API_PATH + 'tasks';

  window.TASKS_SRV = {
    create: function (params) {
      return $.ajax({
        url: window.API_TASKS,
        method: 'post',
        data: params.task
      });
    },
    list: function (params) {
      return $.ajax({
        url: window.API_TASKS,
        method: 'get',
        data: params
      });
    },
    get: function (params) {
      return $.ajax({
        url: window.API_TASKS + '/' + params.taskId,
        method: 'get',
        data: params
      });
    },
    update: function (params) {
      return $.ajax({
        url: window.API_TASKS + '/' + params.taskId,
        method: 'put',
        data: params
      });
    },
    delete: function (params) {
      return $.ajax({
        url: window.API_TASKS + '/' + params.taskId,
        method: 'delete'
      });
    },
    updateCompleted: function (params) {
      return $.ajax({
        url: window.API_TASKS + '/' + params.taskId + '/completed',
        method: 'put',
        data: params
      });
    },
    updateTitle: function (params) {
      return $.ajax({
        url: window.API_TASKS + '/' + params.taskId + '/title',
        method: 'put',
        data: params
      });
    },
    updateImages: function (params) {
      return $.ajax({
        url: window.API_TASKS + '/' + params.taskId + '/images',
        type: 'put',
        data: params.files,
        dataType: 'html',
        cache: false,
        contentType: false,
        processData: false
      });
    }
  };
});