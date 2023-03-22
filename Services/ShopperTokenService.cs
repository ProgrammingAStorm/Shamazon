using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

using Shamazon.Models;

namespace Shamazon.Services
{
    public class ShopperTokenService
    {
        private readonly IConfiguration _configuration;

        public ShopperTokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string CreateShopperToken(Shopper shopper)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim("Id", shopper.Id!),
                new Claim(ClaimTypes.Email, shopper.Email),
                new Claim(ClaimTypes.GivenName, $"{shopper.FirstName} {shopper.LastName}"),
            };

            var jwt = CreateTokenBody(claims);

            return jwt;
        }

        private string CreateTokenBody(List<Claim> claims)
        {
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                            _configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
