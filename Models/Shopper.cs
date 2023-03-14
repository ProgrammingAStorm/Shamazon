namespace Shamazon
{
    public class Shopper
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public string[] Interests { get; set; }

        public Review[] Reviews { get; set; }

        public Order[] Orders { get; set; }

        public Product[] Cart { get; set; }
    }
}

