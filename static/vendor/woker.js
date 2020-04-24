self.onmessage = function (oEvent) {
    setInterval(function () {
      var xmlhttp = new XMLHttpRequest();
      var content = '';
      xmlhttp.open('POST', oEvent.data.url, true);
      xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xmlhttp.setRequestHeader('tokenid', oEvent.data.token);
      xmlhttp.send(JSON.stringify(oEvent.data.data));
      xmlhttp.onreadystatechange =function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          content = xmlhttp.responseText;
          self.postMessage({
            content:content
          });
        }
      };
    }, 3000);
};

