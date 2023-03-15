using Shamazon.Models;
using Shamazon.Services;
using Microsoft.AspNetCore.Mvc;

namespace Shamazon.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShoppersController : ControllerBase
{
    private readonly ShoppersService _shoppersService;

    public ShoppersController(ShoppersService shoppersService) =>
        _shoppersService = shoppersService;

    [HttpGet]
    public async Task<List<Shopper>> Get() =>
        await _shoppersService.GetAsync();

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

    [HttpPost]
    public async Task<IActionResult> Post(Shopper newShopper)
    {
        if (await _shoppersService.IsEmailInUse(newShopper.Email)!)
            return StatusCode(409, new { message = "Email is already in use." });

        await _shoppersService.CreateAsync(newShopper);

        return CreatedAtAction(nameof(Get), new { id = newShopper.Id }, newShopper);
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