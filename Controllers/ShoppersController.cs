using Shamazon.Models;
using Shamazon.Services;
using Shamazon.Helpers;

using GraphQL.AspNet.Controllers;
using GraphQL.AspNet.Attributes;

namespace Shamazon.Controllers;

[GraphRoute("Shoppers")]
public class ShoppersController : GraphController
{
    private readonly ShoppersService _shoppersService;
    private readonly TokenService _tokenService;

    public ShoppersController(ShoppersService shoppersService, TokenService tokenService)
    {
        _shoppersService = shoppersService;
        _tokenService = tokenService;
    }

    [Query("Shopper")]
    public async Task<IGraphShopper> RetrieveShopper(string id)
    {
        var shopper = await _shoppersService.GetAsync(id);

        if (shopper is null)
        {
            return new IGraphShopper()
            {
                Token = String.Empty,
                Status = 409,
                Payload = null!
            };
        }

        return new IGraphShopper()
        {
            Token = String.Empty,
            Status = 202,
            Payload = shopper!
        };
    }

    [Mutation("Login")]
    public async Task<IGraphShopper> Login(string Email, string Password)
    {
        if (await _shoppersService.IsEmailInUse(Email)! == false) return new IGraphShopper()
        {
            Token = "Email is incorrect.",
            Status = 409,
        };

        if (await _shoppersService.IsPasswordCorrect(Email, Password)! == false) return new IGraphShopper()
        {
            Token = "Password is incorrect.",
            Status = 409,
        };

        var shopper = await _shoppersService.GetByEmailAsync(Email);

        List<ClaimDTO> claims = _shoppersService.CreateClaimDTOs(shopper!);

        var jwt = _tokenService.CreateToken(claims);

        return new IGraphShopper()
        {
            Status = 202,
            Token = jwt,
            Payload = shopper!
        };
    }

    [Mutation("Signup")]
    public async Task<IGraphShopper> Signup(string Email, string Password, string FirstName, string LastName)
    {
        if (!Validation.ValidateEmailFormat(Email)) return new IGraphShopper()
        {
            Token = "Email format is incorrect",
            Status = 409,
            Payload = null!
        };

        if (Validation.ValidatePasswordFormat(Password)) return new IGraphShopper()
        {
            Token = "Password format is incorrect",
            Status = 409,
            Payload = null!
        };

        if (await _shoppersService.IsEmailInUse(Email)) return new IGraphShopper()
        {
            Token = "Email is already in use.",
            Status = 409,
            Payload = null!
        };

        var newShopper = new Shopper(
            Email,
            Hash.HashPassword(Password),
            FirstName,
            LastName
        );

        await _shoppersService.CreateAsync(newShopper);

        Shopper? shopper = await _shoppersService.GetByEmailAsync(newShopper.Email);

        List<ClaimDTO> claims = _shoppersService.CreateClaimDTOs(newShopper);

        var jwt = _tokenService.CreateToken(claims);

        return new IGraphShopper()
        {
            Status = 202,
            Token = jwt,
            Payload = shopper!
        };
    }
}