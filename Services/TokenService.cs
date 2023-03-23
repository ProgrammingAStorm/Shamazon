using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

using Shamazon.Models;

namespace Shamazon.Services
{
    public class TokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string CreateToken(List<ClaimDTO> claimDTOs)
        {
            CreateTokenClaims(claimDTOs, out List<Claim> claims);

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

        private void CreateTokenClaims(List<ClaimDTO> claimDTOs, out List<Claim> claims)
        {
            claims = new List<Claim> {};

            foreach (var claim in claimDTOs)
            {
                claims.Add(new Claim(claim.ClaimType, claim.ClaimValue));
            }
        }
    }

    public class ClaimDTO
    {
        public readonly string ClaimType;
        public readonly string ClaimValue;

        public ClaimDTO(string claimType, string claimValue)
        {
            ClaimType = claimType;
            ClaimValue = claimValue;
        }
    }
}
