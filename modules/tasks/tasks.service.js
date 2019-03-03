$('document').ready(() => {
  window.API_PATH = (() => {
    var host = location.host;
    if (host.indexOf('localhost') > -1) {
      host = 'http://localhost:5001/';
    } else if (host.indexOf('herokuapp') > -1) {
      if (host.indexOf('koa') > -1) {
        host = 'https://nl-koa-api.herokuapp.com/';
      } else if (host.indexOf('express') > -1) {
        host = 'https://nl-express-api.herokuapp.com/';
      } else if (host.indexOf('hapi') > -1) {
        host = 'https://nl-hapi-api.herokuapp.com/';
      } else if (host.indexOf('meteor') > -1) {
        host = 'https://nl-meteor-api.herokuapp.com/';
      }
    }
    return host;
  })();
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