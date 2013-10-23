define(['jquery', 'utils/cookies'], function($, Cookies) {
  // user data
  var userInfo = {};

  var setSessionCookie = function(sessionId, expirationDate) {
    Cookies.setItem('sessionId', sessionId, expirationDate);
  };

  var getSessionCookie = function() {
    console.warn(Cookies.getItem('sessionId'));
    return Cookies.getItem('sessionId');
  };

  var request = function(endpoint, type, dfd, data, isHttps) {
      var data = data || {},
        host = window.location.host,
        isHttps = isHttps || false,
        url = ((isHttps) ? "https://" : "http://") + host + "/" + endpoint,
        headers = {};

      $.ajax({
        url: url,
        headers: headers,
        type: type,
        data: data,
        dataType: 'json',
      })
      .done(function(data, textStatus, jqXHR) {
        if (textStatus === "success") {
          if (data){
            dfd.resolve(data);
          } else {
            console.log("Service Failure in " + url);

            dfd.reject({
              'data': data,
              'jqXHR': jqXHR,
              'textStatus': textStatus,
            });
          }
        }
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
        var errorObj = {}
        try {
          errorObj = JSON.parse(jqXHR.responseText);
        } catch (e) {
          console.warn('Server returned with unexpected results');
        }

        console.warn('errorObj', errorObj);
        dfd.reject(errorObj);
      });
    };

  return {
    getUserInfo: function(userID) {
      if (!$.isEmptyObject(userInfo))
        return userInfo;

      var dfd = $.Deferred(),
        promise = dfd.promise();

      request('user/'+userID, 'GET', dfd);

      promise.done(function(data) {
        if (!data) {
          return false;
        }
        
        userInfo = data;

        NAMESPACE.dispatcher.trigger('user:update:success', data);
      });

      promise.fail(function(data) {
        NAMESPACE.dispatcher.trigger('user:update:fail', data);
      });

      return promise;
    },
  };
});
