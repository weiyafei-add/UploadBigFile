const http = require("http");
const server = http.createServer();
const fs = require("fs-extra");
const multiparty = require("multiparty");
const path = require("path");

const UPLOAD_DIR = path.resolve(__dirname, "..", "target");

const resolvePost = (req) =>
  new Promise((resolve) => {
    let chunk = "";
    req.on("data", (data) => {
      chunk += data;
    });
    req.on("end", () => {
      resolve(JSON.parse(chunk));
    });
  });

const pipeStream = (path, writeStream) => {
  return new Promise((resolve) => {
    const readStream = fs.createReadStream(path);
    // console.log("readStream", readStream);
    readStream.on("end", () => {
      fs.unlinkSync(path);
      resolve();
    });
    readStream.pipe(writeStream);
  });
};

const mergeFileChunk = async (filePath, filename, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, "chunkDir_" + filename); // chunk 文件夹
  const chunkPaths = await fs.readdir(chunkDir);
  chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
  chunkPaths.map((chunk, index) => {
    pipeStream(path.resolve(chunkDir, chunk), fs.createWriteStream(filePath, { start: index * size }));
  });
};
server.on("request", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONs") {
    res.statusCode = 200;
    res.end();
    return;
  }
  const multipartyInstance = new multiparty.Form();
  multipartyInstance.parse(req, async (error, fields, files) => {
    if (error) {
      console.log(error);
      return;
    }
    const [hash] = fields.hash;
    const [filename] = fields.filename;

    const [chunk] = files.chunk;

    const chunkDir = path.resolve(UPLOAD_DIR, "chunkDir_" + path.parse(filename).base);

    if (!fs.existsSync(chunkDir)) {
      await fs.mkdirs(chunkDir);
    }

    await fs.move(chunk.path, `${chunkDir}/${hash}`);
    res.end("chunk resolved");
  });

  if (req.url === "/merge") {
    // const data = await resolvePost(req);
    // const { filename, size } = data;
    // const filePath = path.resolve(UPLOAD_DIR, filename);
    // await mergeFileChunk(filePath, filename, size);
    // res.writeHead(200, {
    //   "content-type": "application/json",
    // });
    // res.end(
    //   JSON.stringify({
    //     code: 0,
    //     message: "文件合并成功",
    //   })
    // );
  }
});

server.listen(8100, () => {
  console.log("listening port 8100");
});
