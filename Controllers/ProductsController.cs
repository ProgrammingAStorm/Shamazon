using Shamazon.Models;
using Shamazon.Services;

using GraphQL.AspNet.Controllers;
using GraphQL.AspNet.Attributes;

namespace Shamazon.Controllers;

[GraphRoute("Products")]
public class ProductsController : GraphController
{
    private readonly AmazonService _amazonService;
    private readonly ProductsService _productsService;

    public ProductsController(AmazonService amazonService, ProductsService productsService)
    {
        _amazonService = amazonService;
        _productsService = productsService;
    }

    [Mutation("Upload")]
    public async Task<IGraphProduct> Upload(string Name, string Description, string Price, string Id, string[] Links)
    {
        // TODO enforce validation so that no products with duplicated names are generated
        // TODO enforce validation so that base64 strings are actually base64 strings

        foreach (var item in Links)
        {
            Console.WriteLine(item);
        }

        // var imageStreams = new List<MemoryStream>();

        // foreach (var item in Images.ToArray())
        // {
        //     imageStreams.Add(Base64ToStream(item));
        // }

        // var length = Images.ToArray().Length;

        // string[] links = new string[length];

        // links = await _amazonService.UploadFilesAsync(imageStreams, Id, Name);


        // TODO replice ImageUrls property in newProduct with actual list of Cloud Flare links of the newly added Images
        // TODO use newProduct to generate a new product in the database
        // TODO return the newly created product 

        return new IGraphProduct()
        {
            Token = Name,
            Status = 202,
            Payload = null!
        };
    }

    MemoryStream Base64ToStream(string base64String)
    {
        byte[] bytes = Convert.FromBase64String(base64String);

        return new MemoryStream(bytes);
    }
}