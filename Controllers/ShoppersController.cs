using Shamazon.Models;
using Shamazon.Services;
using Shamazon.Helpers;

using Microsoft.AspNetCore.Mvc;

namespace Shamazon.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShoppersController : ControllerBase
{
    private readonly ShoppersService _shoppersService;
    private readonly ShopperTokenService _shopperTokenService;

    public ShoppersController(ShoppersService shoppersService, ShopperTokenService shopperTokenService)
    {
        _shoppersService = shoppersService;
        _shopperTokenService = shopperTokenService;
    }
    
    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Shopper>> Get(string id)
    {
        var shopper = await _shoppersService.GetAsync(id);

        if (shopper is null)
        {
            return NotFound();
        }

        return shopper;
    }

    [HttpGet("login")]
    public async Task<ActionResult<Shopper>> Login(String Email, String Password)
    {
        if (await _shoppersService.IsEmailInUse(Email)! == false) return StatusCode(409, new { message = "Email is incorrect." });

        if (await _shoppersService.IsPasswordCorrect(Email, Password)! == false) return StatusCode(409, new { message = "Password is incorrect." });

        var shopper = await _shoppersService.GetByEmailAsync(Email);

        var jwt = _shopperTokenService.CreateShopperToken(shopper!);

        return StatusCode(202, new {token = jwt});
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup(Shopper newShopper)
    {
        if (!Validation.ValidateEmailFormat(newShopper.Email)) return StatusCode(409, new { message = "Email format is incorrect" });

        if (Validation.ValidatePasswordFormat(newShopper.Password)) return StatusCode(409, new { message = "Password format is incorrect" });

        if (await _shoppersService.IsEmailInUse(newShopper.Email)) return StatusCode(409, new { message = "Email is already in use." });

        newShopper.Password = Hash.HashPassword(newShopper.Password);
        await _shoppersService.CreateAsync(newShopper);

        Shopper? shopper = await _shoppersService.GetAsync(newShopper.Id!);

        var jwt = _shopperTokenService.CreateShopperToken(shopper!);

        return StatusCode(202, new { Token = jwt });
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Shopper updatedShopper)
    {
        var shopper = await _shoppersService.GetAsync(id);

        if (shopper is null)
        {
            return NotFound();
        }

        updatedShopper.Id = shopper.Id;

        await _shoppersService.UpdateAsync(id, updatedShopper);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var shopper = await _shoppersService.GetAsync(id);

        if (shopper is null)
        {
            return NotFound();
        }

        await _shoppersService.RemoveAsync(id);

        return NoContent();
    }
}