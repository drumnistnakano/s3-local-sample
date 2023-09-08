import { S3 } from "@aws-sdk/client-s3";
import { sdkStreamMixin } from "@smithy/util-stream";

const testBucketName = "test-bucket";

const minioClient = new S3({
  region: "ap-northeast-1",
  endpoint: "http://127.0.0.1:9000",
  forcePathStyle: true,
  credentials: {
    accessKeyId: "ACCESS_KEY_DUMMY",
    secretAccessKey: "SECRET_KEY_DUMMY",
  },
});

const main = async () => {
  // Create S3 and contens.
  await minioClient.createBucket({
    Bucket: testBucketName,
  });
  await minioClient.putObject({
    Bucket: testBucketName,
    Key: "hello.txt",
    Body: "Hello World!",
  });
  const result = await minioClient.getObject({
    Bucket: testBucketName,
    Key: "hello.txt",
  });

  const fileContentStr = await sdkStreamMixin(result.Body).transformToString();
  console.log({ fileContentStr });

  return;
};

main();
