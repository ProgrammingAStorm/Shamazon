using Shamazon.Models;
using Shamazon.Services;
using Shamazon.Helpers;

using GraphQL.AspNet.Controllers;
using GraphQL.AspNet.Attributes;

namespace Shamazon.Controllers;

[GraphRoute("Sellers")]
public class SellersController : GraphController
{
    private readonly SellersService _sellersService;
    private readonly TokenService _tokenService;

    public SellersController(SellersService sellersService, TokenService tokenService)
    {
        _sellersService = sellersService;
        _tokenService = tokenService;
    }

    [Query("Seller")]
    public async Task<IGraphSeller> RetrieveSeller(string id)
    {
        var seller = await _sellersService.GetAsync(id);

        if (seller is null)
        {
            return new IGraphSeller()
            {
                Token = String.Empty,
                Status = 409,
                Payload = null!
            };
        }

        return new IGraphSeller()
        {
            Token = String.Empty,
            Status = 202,
            Payload = seller!
        };
    }

    [Mutation("Login")]
    public async Task<IGraphSeller> Login(string Email, string Password)
    {
        if (await _sellersService.IsEmailInUse(Email)! == false) return new IGraphSeller()
        {
            Token = "Email is incorrect.",
            Status = 409,
        };

        if (await _sellersService.IsPasswordCorrect(Email, Password)! == false) return new IGraphSeller()
        {
            Token = "Password is incorrect.",
            Status = 409,
        };

        var seller = await _sellersService.GetByEmailAsync(Email);

        List<ClaimDTO> claims = _sellersService.CreateClaimDTOs(seller!);

        var jwt = _tokenService.CreateToken(claims);

        return new IGraphSeller()
        {
            Status = 202,
            Token = jwt,
            Payload = seller!
        };
    }

    [Mutation("Signup")]
    public async Task<IGraphSeller> Signup(Seller newSeller)
    {
        if (!Validation.ValidateEmailFormat(newSeller.Email)) return new IGraphSeller()
        {
            Payload = null!,
            Status = 409,
            Token = "Email format is incorrect"
        };

        if (Validation.ValidatePasswordFormat(newSeller.Password)) return new IGraphSeller()
        {
            Payload = null!,
            Status = 409,
            Token = "Password format is incorrect"
        };

        if (await _sellersService.IsEmailInUse(newSeller.Email)) return new IGraphSeller()
        {
            Payload = null!,
            Status = 409,
            Token = "Email is already in use."
        };

        if (await _sellersService.IsNameInUse(newSeller.Name)) return new IGraphSeller()
        {
            Payload = null!,
            Status = 409,
            Token = "Name is already in use."
        };

        newSeller.Password = Hash.HashPassword(newSeller.Password);
        await _sellersService.CreateAsync(newSeller);

        Seller? seller = await _sellersService.GetAsync(newSeller.Id!);

        List<ClaimDTO> claims = _sellersService.CreateClaimDTOs(seller!);
        var jwt = _tokenService.CreateToken(claims);

        return new IGraphSeller()
        {
            Payload = seller!,
            Status = 202,
            Token = jwt
        };
    }
}