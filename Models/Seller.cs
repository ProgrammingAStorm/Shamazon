using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Shamazon.Models
{
    public class Seller
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public Product[]? Products { get; set; }

        public Order[]? Orders { get; set; }

        public Seller(string name, string email, string password)
        {
            Name = name;
            Email = email;
            Password = password;
        }
    }

    public class IGraphSeller : IGraphResponse
    {
        public Seller Payload { get; set; }
    }
}