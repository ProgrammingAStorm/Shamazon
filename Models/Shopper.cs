using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Shamazon.Models
{
    public class Shopper
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string[]? Interests { get; set; }

        public Review[]? Reviews { get; set; }

        public Order[]? Orders { get; set; }

        public Product[]? Cart { get; set; }

        public Shopper(string email, string password, string firstName, string lastName) {
            Email = email;
            Password = password;
            FirstName = firstName;
            LastName = lastName;
        }
    }


    public class IGraphShopper : IGraphResponse
    {
        public Shopper Payload { get; set; }
    }
}

