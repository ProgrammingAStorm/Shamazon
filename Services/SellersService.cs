using Shamazon.Models;
using Shamazon.Helpers;

using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Shamazon.Services
{
    public class SellersService
    {
        private readonly IMongoCollection<Seller> _sellersCollection;

        public SellersService(IOptions<ShamazonDatabaseSettings> ShamazonDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                ShamazonDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                ShamazonDatabaseSettings.Value.DatabaseName);

            _sellersCollection = mongoDatabase.GetCollection<Seller>(
                ShamazonDatabaseSettings.Value.SellersCollectionName);
        }

        public async Task<Seller?> GetAsync(string id) =>
            await _sellersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<Seller?> GetByEmailAsync(string email)
        {
            return await _sellersCollection.Find(x => x.Email == email).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(Seller newSeller) =>
            await _sellersCollection.InsertOneAsync(newSeller);

        public async Task<Boolean> IsEmailInUse(string email)
        {
            var seller = await GetByEmailAsync(email);

            return seller == null ? false : true;
        }

        public async Task<Boolean> IsPasswordCorrect(string email, string password)
        {
            Seller? seller = await GetByEmailAsync(email);

            return Hash.VerifyHashedPassword(seller!.Password, password);
        }

        public List<ClaimDTO> CreateClaimDTOs(Seller seller)
        {
            return new List<ClaimDTO>
            {
                new ClaimDTO("Id", seller.Id!),
                new ClaimDTO("Email", seller.Email),
                new ClaimDTO("Name", seller.Name),
                new ClaimDTO("UserType", "Seller"),
            };
        }
    }
}