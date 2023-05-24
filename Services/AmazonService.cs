using Shamazon.Models;

using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;

using Microsoft.Extensions.Options;

namespace Shamazon.Services
{
    public class AmazonService
    {
        private readonly string bucketName;
        private static readonly RegionEndpoint bucketRegion = RegionEndpoint.USWest2;
        private readonly IAmazonS3 s3Client;

        public AmazonService(IOptions<AmazonSettings> AmazonSettings)
        {
            bucketName = AmazonSettings.Value.BucketName;
            s3Client = new AmazonS3Client(bucketRegion);
        }

        public async Task<string[]> UploadFileAsync(MemoryStream file, string id, string productName)
        {
            var fileTransferUtility = new TransferUtility(s3Client);

            string[] fileName = {
                id + '-' + productName
            };

            await fileTransferUtility.UploadAsync(file, bucketName, fileName[0]);

            return fileName;
        }

        public async Task<string[]> UploadFileAsyncBulk(List<MemoryStream> files, string id, string productName)
        {
            var fileTransferUtility = new TransferUtility(s3Client);

            string[] fileNames = new string[files.ToArray().Length];

            for(int index = 0; index < files.ToArray().Length; index++)
            {
                var fileName = id + '-' + productName + '-' + index.ToString();
                fileNames[index] = fileName;

                await fileTransferUtility.UploadAsync(files[index], bucketName, id + '-' + fileName);
            }

            return fileNames;
        }
    }
}