using Shamazon.Models;
using Shamazon.Helpers;

using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Shamazon.Services
{
    public class ShoppersService
    {
        private readonly IMongoCollection<Shopper> _shoppersCollection;

        public ShoppersService(
        IOptions<ShamazonDatabaseSettings> ShamazonDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                ShamazonDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                ShamazonDatabaseSettings.Value.DatabaseName);

            _shoppersCollection = mongoDatabase.GetCollection<Shopper>(
                ShamazonDatabaseSettings.Value.ShoppersCollectionName);
        }

        // Get rid of this function at some point since you don't really
        // ever need to get all shoppers.
        public async Task<List<Shopper>> GetAsync() =>
        await _shoppersCollection.Find(_ => true).ToListAsync();

        public async Task<Shopper?> GetAsync(string id) =>
            await _shoppersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<Shopper?> GetByEmailAsync(string email)
        {
            return await _shoppersCollection.Find(x => x.Email == email).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(Shopper newShopper) =>
            await _shoppersCollection.InsertOneAsync(newShopper);

        public async Task UpdateAsync(string id, Shopper updatedShopper) =>
            await _shoppersCollection.ReplaceOneAsync(x => x.Id == id, updatedShopper);

        public async Task RemoveAsync(string id) =>
            await _shoppersCollection.DeleteOneAsync(x => x.Id == id);

        public async Task<Boolean> IsEmailInUse(string email)
        {
            var shopper = await GetByEmailAsync(email);

            return shopper == null ? false : true;
        }

        public async Task<Boolean> IsPasswordCorrect(string email, string password)
        {
            Shopper? shopper = await GetByEmailAsync(email);

            return Hash.VerifyHashedPassword(shopper!.Password, password);
        }

        public List<ClaimDTO> CreateClaimDTOs(Shopper shopper)
        {
            return new List<ClaimDTO>
            {
                new ClaimDTO("Id", shopper.Id!),
                new ClaimDTO("Email", shopper.Email),
                new ClaimDTO("FirstName", shopper.FirstName),
                new ClaimDTO("LastName", shopper.LastName),
                new ClaimDTO("UserType", "Shopper"),
            };
        }
    }
}