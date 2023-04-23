const request = ({
  url,
  method = "post",
  data,
  headers = {},
  requestList
}) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    Object.keys(headers).forEach(key =>
      xhr.setRequestHeader(key, headers[key])
    );
    xhr.send(data);
    xhr.onload = e => {
      console.log(11)
      resolve({
        data: e.target.response
      });
    };
  });
}

export { request };
