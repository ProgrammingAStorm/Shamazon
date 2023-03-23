namespace Shamazon.Models
{
    public class ShamazonDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string ShoppersCollectionName { get; set; } = null!;

        public string SellersCollectionName { get; set; } = null!;
    }
}