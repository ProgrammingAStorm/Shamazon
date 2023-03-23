using Shamazon.Models;
using Shamazon.Services;
using Shamazon.Helpers;

using Microsoft.AspNetCore.Mvc;

namespace Shamazon.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SellersController : ControllerBase
{
    private readonly SellersService _sellersService;
    private readonly TokenService _tokenService;

    public SellersController(SellersService sellersService, TokenService tokenService)
    {
        _sellersService = sellersService;
        _tokenService = tokenService;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup(Seller newSeller)
    {
        if (!Validation.ValidateEmailFormat(newSeller.Email)) return StatusCode(409, new { message = "Email format is incorrect" });

        if (Validation.ValidatePasswordFormat(newSeller.Password)) return StatusCode(409, new { message = "Password format is incorrect" });

        if (await _sellersService.IsEmailInUse(newSeller.Email)) return StatusCode(409, new { message = "Email is already in use." });

        newSeller.Password = Hash.HashPassword(newSeller.Password);
        await _sellersService.CreateAsync(newSeller);

        Seller? seller = await _sellersService.GetAsync(newSeller.Id!);

        List<ClaimDTO> claims = _sellersService.CreateClaimDTOs(newSeller);

        var jwt = _tokenService.CreateToken(claims);

        return StatusCode(202, new { Token = jwt });
    }
}