using Shamazon.Models;

using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;

using Microsoft.Extensions.Options;

namespace Shamazon.Services
{
    public class AmazonService
    {
        private readonly string _bucketName;
        private readonly string _cloudFrontLink;
        private readonly IAmazonS3 _amazonS3;
        private readonly IConfiguration _configuration;

        public AmazonService(IConfiguration configuration, IAmazonS3 amazonS3)
        {
            _configuration = configuration;

            _bucketName = configuration.GetValue<string>("AWS:BucketName")!;
            _cloudFrontLink = configuration.GetValue<string>("AWS:CloudFrontLink")!;

            _amazonS3 = amazonS3;
        }

        public async Task<string[]> UploadFilesAsync(List<MemoryStream> files, string id, string productName)
        {
            var fileTransferUtility = new TransferUtility(_amazonS3);

            string[] fileNames = new string[files.ToArray().Length];

            for(int index = 0; index < files.ToArray().Length; index++)
            {
                var fileName = id + '-' + productName + '-' + index.ToString();
                fileNames[index] = _cloudFrontLink + fileName;

                await fileTransferUtility.UploadAsync(files.ToArray().ElementAt(index), _bucketName, fileName);
            }

            return fileNames;
        }
    }
}