using Shamazon.Models;
using Shamazon.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Database settings service
builder.Services.Configure<ShamazonDatabaseSettings>(
    builder.Configuration.GetSection("ShamazonDatabase"));

// Model Services
builder.Services.AddSingleton<ShoppersService>();
builder.Services.AddSingleton<SellersService>();

// Util Services
builder.Services.AddSingleton<TokenService>();

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

app.MapFallbackToFile("index.html");

app.Run();
