import React, { useState, useRef } from "react";
import styles from "./index.less";
import { Progress } from 'antd';

const SIZE = 10 * 1024 * 1024;

export default function Layout() {
  const [data, setData] = useState<Array<{ file: File }>>();
  const [percent, setPercent] = useState<number>(0);
  const workerRef = useRef<Worker>();

  const createFileChunk = (file: File, size = SIZE) => {
    const fileChunkList = [];
    let cur = 0;
    while (cur < file?.size) {
      fileChunkList.push({ file: file.slice(cur, cur + size) });
      cur += size;
    }
    return fileChunkList;
  };

  const request = (params: any) => {
    const { url, data, method = "post", headers = {}, onProgress } = params;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.send(data);

      xhr.onload = (e: any) => {
        return resolve({
          data: e.target.response,
        });
      };
    });
  };

  const createProgressHandler = (item: any) => {
    return (e: any) => {
      item.percentage = parseInt(String((e.loaded / e.total) * 100));
    };
  };

  const uploadChunks = (data: Array<{ chunk: File; hash: string }>) => {
    const requestList = data
      .map((item, index) => {
        const { hash, chunk } = item;
        const formData = new FormData();
        formData.append("chunk", chunk);
        formData.append("hash", hash);
        formData.append("filename", "CentOS7.zip");
        return { formData, index };
      })
      .map(({ formData, index }) => {
        return request({
          url: "http://localhost:8100",
          data: formData,
          // headers: {
          //   "content-type": "multipart/form-data",
          // },
          onProgress: createProgressHandler(data[index]),
        });
      });
    Promise.all(requestList).then((res) => {
      request({
        url: "http://localhost:8100/merge",
        data: JSON.stringify({
          filename: "CentOS7.zip",
          size: SIZE,
        }),
        // headers: {
        //   "Content-type": "application/json",
        // },
      });
    });
  };

  const calcContentHash = (fileChunkList: Array<any>) => {
    return new Promise((resolve) => {
          workerRef.current = new Worker('../../public/hash.js');
          workerRef.current.postMessage({fileChunkList});
          workerRef.current.onmessage = (e) => {
            setPercent(e.data.percentage);
          }
    })
  }

  const handleUpload = async (file: File) => {
    const fileChunkList = createFileChunk(file as File);
    const hash = await calcContentHash(fileChunkList);
    const data = fileChunkList.map(({ file: minFile }, index) => ({
      chunk: minFile,
      hash: `${file.name}-${index}`,
    }));
    uploadChunks(data as any);
  };

  const fileChanghe = (e: any) => {
    const [file] = e.target.files;
    handleUpload(file);
  };

  return (
    <div className={styles.navs}>
      <input type="file" onChange={fileChanghe} />
      <Progress type='circle' percent={percent} />
    </div>
  );
}
