using Shamazon.Models;
using Shamazon.Services;

using GraphQL.AspNet.Controllers;
using GraphQL.AspNet.Attributes;

namespace Shamazon.Controllers;

[GraphRoute("Products")]
public class ProductsController : GraphController
{
    private readonly AmazonService _amazonService;

    public ProductsController(AmazonService amazonService)
    {
        _amazonService = amazonService;
    }

    [Mutation("Upload")]
    public async Task<IGraphProduct> Upload(string Name, string Description, string Price, string ID)
    {
        // TODO enforce validation so that no products with duplicated names are generated
        // TODO enforce validation so that base64 strings are actually base64 strings

        //var imageStreams = new List<MemoryStream>();

        Console.WriteLine(Price);

        // Console.WriteLine(Images.ToArray().Length);

        // foreach (var item in Images.ToArray())
        // {
        //     Console.WriteLine(item);
        //     imageStreams.Add(Base64ToStream(item));
        // }

        // var length = Images.ToArray().Length;

        // string[] links = new string[length];

        // if (length == 1)
        // {
        //     links = await _amazonService.UploadFileAsync(imageStreams.ElementAt(0), Id, Name);
        // }
        // else
        // {
        //     links = await _amazonService.UploadFileAsyncBulk(imageStreams, Id, Name);
        // }

        // Console.WriteLine(links);

        // TODO replice ImageUrls property in newProduct with actual list of Cloud Flare links of the newly added Images
        // TODO use newProduct to generate a new product in the database
        // TODO return the newly created product 

        return new IGraphProduct()
        {
            Token = Price,
            Status = int.Parse(Price),
            Payload = null!
        };
    }

    MemoryStream Base64ToStream(string base64String)
    {
        byte[] bytes = Convert.FromBase64String(base64String);

        using (MemoryStream memoryStream = new MemoryStream(bytes))
        {
            return memoryStream;
        }
    }
}