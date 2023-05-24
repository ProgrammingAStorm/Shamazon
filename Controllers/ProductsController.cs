using Shamazon.Models;

using GraphQL.AspNet.Controllers;
using GraphQL.AspNet.Attributes;

namespace Shamazon.Controllers;

[GraphRoute("Products")]
public class ProductsController : GraphController
{
    [Mutation("Upload")]
    public async Task<IGraphProduct> Upload(string Name, string Description, float Price, List<string> images, string Id)
    {
        // TODO enforce validation so that no products with duplicated names are generated
        // TODO enforce validation so that base64 strings are actually base64 strings

        var imageStreams = new List<MemoryStream>();

        foreach (var item in images.ToArray())
        {
            imageStreams.Add(Base64ToStream(item));
        }

        // TODO send memory streams to AWS S3 bucket to be stored 
        // TODO replice ImageUrls property in newProduct with actual list of Cloud Flare links of the newly added images
        // TODO use newProduct to generate a new product in the database
        // TODO return the newly created product 

        return new IGraphProduct()
        {
            Token = "Test",
            Status = 202,
            Payload = null!
        };
    }

    MemoryStream Base64ToStream(string base64String) {
        byte[] bytes = Convert.FromBase64String(base64String);

        using (MemoryStream memoryStream = new MemoryStream(bytes))
        {
            return memoryStream;
        }
    }
}