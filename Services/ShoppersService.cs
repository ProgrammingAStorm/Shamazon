using Shamazon.Models;
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

        public async Task<List<Shopper>> GetAsync() =>
        await _shoppersCollection.Find(_ => true).ToListAsync();

        public async Task<Shopper?> GetAsync(string id) =>
            await _shoppersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Shopper newShopper) =>
            await _shoppersCollection.InsertOneAsync(newShopper);

        public async Task UpdateAsync(string id, Shopper updatedShopper) =>
            await _shoppersCollection.ReplaceOneAsync(x => x.Id == id, updatedShopper);

        public async Task RemoveAsync(string id) =>
            await _shoppersCollection.DeleteOneAsync(x => x.Id == id);
    }
}