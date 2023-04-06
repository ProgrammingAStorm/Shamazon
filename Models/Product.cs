using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Shamazon.Models
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string[] ImageUrls { get; set; }

        public float Price { get; set; }

        public string ProductSeller { get; set; }

        public string[]? Tags { get; set; }

        public Review[]? Reviews { get; set; }
    }
}