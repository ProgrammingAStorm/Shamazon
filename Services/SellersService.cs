using Shamazon.Models;

using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Shamazon.Services
{
    public class SellersService
    {
        private readonly IMongoCollection<Seller> _sellersCollection;

        public SellersService(
            IOptions<ShamazonDatabaseSettings> ShamazonDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                ShamazonDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                ShamazonDatabaseSettings.Value.DatabaseName);

            _sellersCollection = mongoDatabase.GetCollection<Seller>(
                ShamazonDatabaseSettings.Value.SellersCollectionName);
        }

        public async Task<Seller?> GetAsync(string id) => await _sellersCollection.Find(x => x.Id == id).FirstOrDefaultAsync(); 

        public async Task CreateAsync(Seller newSeller) => await _sellersCollection.InsertOneAsync(newSeller);
    }
}