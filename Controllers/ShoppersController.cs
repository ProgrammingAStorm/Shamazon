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
    public async Task<ActionResult<Shopper>> Login()
    {
        return new Shopper();
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup(Shopper newShopper)
    {
        // TODO validate email on this side too
        // TODO validate password on this side too
        bool todo;

        if (await _shoppersService.IsEmailInUse(newShopper.Email)!) return StatusCode(409, new { message = "Email is already in use." });

        newShopper.Password = Hash.HashPassword(newShopper.Password);
        await _shoppersService.CreateAsync(newShopper);

        Shopper? shopper = await _shoppersService.GetAsync(newShopper.Id!);

        var jwt = _shopperTokenService.CreateShopperToken(shopper!);

        return StatusCode(202, new {Token = jwt});
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