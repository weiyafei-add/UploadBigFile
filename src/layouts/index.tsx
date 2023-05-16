import React, { useState, useRef, useEffect } from "react";
import styles from "./index.less";
import { Progress } from 'antd';
import SparkMd5 from 'spark-md5';

const SIZE = 10 * 1024 * 1024;

export default function Layout() {
  const [currentHash, setHash] = useState<string>();
  const [percent, setPercent] = useState<number>(0);
  const workerRef = useRef<Worker>();

  useEffect(() => {
    console.log()
  }, [])

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

  const uploadChunks = (data: Array<{ chunk: File; hash: string }>, fileHash: string, ext: string) => {
    const requestList = data
      .map((item, index) => {
        const { hash, chunk } = item;
        const formData = new FormData();
        formData.append("chunk", chunk);
        formData.append("hash", hash);
        formData.append("filename", fileHash as string);
        return { formData, index };
      })
      .map(({ formData, index }) => {
        return request({
          url: "http://localhost:8101",
          data: formData,
          // headers: {
          //   "content-type": "multipart/form-data",
          // },
          onProgress: createProgressHandler(data[index]),
        });
      });
    Promise.all(requestList).then((res) => {
      request({
        url: "http://localhost:8101/merge",
        data: JSON.stringify({
          filename: fileHash,
          size: SIZE,
          ext,
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
            const { hash, percentage } = e.data;
            setPercent(percentage);
            if(hash) {
              resolve(hash);
              setHash(hash);
            }
          }
    })
  }

  const handleUpload = async (file: File) => {
    const fileChunkList = createFileChunk(file as File);
    const hash = await calcContentHash(fileChunkList) as string;
    const data = fileChunkList.map(({ file: minFile }, index) => ({
      chunk: minFile,
      hash: `${hash}-${index}`,
    }));
    uploadChunks(data as any, hash, file.name.split('.')[1]);
  };

  const fileChanghe = (e: any) => {
    const [file] = e.target.files;
    handleUpload(file);
  };

  return (
    <div className={styles.navs}>
      <input type="file" onChange={fileChanghe} />
      <Progress  percent={percent} />
    </div>
  );
}
