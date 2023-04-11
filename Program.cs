using Shamazon.Models;
using Shamazon.Services;

using GraphQL.AspNet.Configuration;

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

// Add graphql services to the DI container
builder.Services.AddGraphQL();

var app = builder.Build();

app.UseGraphQL();

// // Configure the HTTP request pipeline.
// if (!app.Environment.IsDevelopment())
// {
//     // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//     app.UseHsts();
// }

// app.UseHttpsRedirection();
// app.UseStaticFiles();
// app.UseRouting();

// app.MapControllers();

// app.MapFallbackToFile("index.html");

app.Run();
