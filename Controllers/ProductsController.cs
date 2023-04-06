using Shamazon.Models;

using Microsoft.AspNetCore.Mvc;

namespace Shamazon.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpPost("upload")]
    public async Task<IActionResult> Upload(Product newProduct)
    {
        // TODO enforce validation so that no products with duplicated names are generated

        var byteArrays = new List<byte>[newProduct.ImageUrls.Length];

        foreach (var item in newProduct.ImageUrls)
        {
            var splitString = item.Split(',')[1];

            List<byte> decodedString = Convert.FromBase64String(splitString).ToList();

            byteArrays.Append(decodedString);
        }

        // TODO send byte arrys to AWS S3 bucket to be stored 
        // TODO replice ImageUrls property in newProduct with actual list of Cloud Flare links of the newly added images
        // TODO use newProduct to generate a new product in the database
        // TODO return the newly created product 

        return StatusCode(202, new { test = "success" });
    }
}