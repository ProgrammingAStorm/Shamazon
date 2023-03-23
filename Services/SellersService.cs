using Shamazon.Models;

using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Shamazon.Services
{
    public class SellersServices
    {
        private readonly IMongoCollection<Seller> _sellersCollection;

        public SellersServices(
            IOptions<ShamazonDatabaseSettings> ShamazonDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                            ShamazonDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                ShamazonDatabaseSettings.Value.DatabaseName);

            _sellersCollection = mongoDatabase.GetCollection<Seller>(
                ShamazonDatabaseSettings.Value.SellersCollectionName);
        }
    }
}