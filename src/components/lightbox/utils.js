import notification from 'antd/lib/notification'


export const xhrDownload = (url, onProgress = () => { }, onComplete = () => { }, type = "blob") => {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true);
  xmlhttp.responseType = type;
  xmlhttp.setRequestHeader("Cache-Control", "no-cache");
  xmlhttp.onprogress = (event) => onProgress(event.loaded / event.total);
  xmlhttp.onload = () => onComplete(xmlhttp.response);
  xmlhttp.send();
};

export const downloadFile = async (
  uri,
  filename,
) => {
  xhrDownload(
    uri,
    (progress) => {
      notification.open({
        key: uri,
        message: "下载",
        duration: 0,
        description: `正在下载[${filename}]：${Math.round(progress * 100)}%`,
        placement: "bottomRight",
      });
    },
    (blob) => {
      const a = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      // onComplete()
      notification.close(uri);
    }
  )
}
