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
    private readonly TokenService _tokenService;

    public ProductsController(AmazonService amazonService, ProductsService productsService, TokenService tokenService)
    {
        _amazonService = amazonService;
        _productsService = productsService;
        _tokenService = tokenService;
    }

    [Mutation("Upload")]
    public async Task<IGraphProduct> Upload(string Name, string Description, string Price, string Id, string[] Links)
    {
        var newProduct = new Product(Name, Description, Links, float.Parse(Price), Id);

        await _productsService.CreateAsync(newProduct);

        var product = await _productsService.GetByNameAndSellerAsync(Name, Id);

        return new IGraphProduct()
        {
            Token = null!,
            Status = 202,
            Payload = product
        };
    }

    [Query("CheckName")]
    public async Task<IGraphProduct> CheckName(string Name)
    {
        var product = await _productsService.CheckNameAsync(Name);

        if(product == null)
        {
            return new IGraphProduct()
            {
                Token = null!,
                Status = 409,
                Payload = null!
            };
        }

        return new IGraphProduct()
        {
            Token = "Product name is already in use",
            Status = 202,
            Payload = null!
        };
    }
}