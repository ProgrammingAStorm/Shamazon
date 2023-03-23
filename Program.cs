using Shamazon.Models;
using Shamazon.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<ShamazonDatabaseSettings>(
    builder.Configuration.GetSection("ShamazonDatabase"));

builder.Services.AddSingleton<ShoppersService>();
builder.Services.AddSingleton<TokenService>();

builder.Services.AddSingleton<SellersService>();

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllers();
app.MapGet("/api/test", (IEnumerable<EndpointDataSource> endpointSources) => new { message = string.Join("\n", endpointSources.SelectMany(source => source.Endpoints)) });

app.MapFallbackToFile("index.html");

app.Run();
