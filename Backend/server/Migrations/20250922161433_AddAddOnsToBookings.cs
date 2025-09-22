using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddAddOnsToBookings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("55555555-5555-5555-5555-555555555555"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("66666666-6666-6666-6666-666666666666"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("77777777-7777-7777-7777-777777777777"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("88888888-8888-8888-8888-888888888888"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("99999999-9999-9999-9999-999999999999"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"));

            migrationBuilder.RenameColumn(
                name: "AddOns",
                table: "Bookings",
                newName: "AddOnsJson");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AddOnsJson",
                table: "Bookings",
                newName: "AddOns");

            migrationBuilder.InsertData(
                table: "Staff",
                columns: new[] { "Id", "Email", "JobsCompleted", "Name", "PasswordHash", "Phone", "Rating", "Role", "Specialties", "Status" },
                values: new object[,]
                {
                    { new Guid("22222222-2222-2222-2222-222222222222"), "john1@example.com", 0, "John Smith", "$2a$11$EIX4n0kIEuFhXDJ1yJsy..PCMLz7pQ6XZ8UoRQvM5CnxyyCP6Yl82", "555-1002", 4.2000000000000002, "staff", "", "busy" },
                    { new Guid("33333333-3333-3333-3333-333333333333"), "alice1@example.com", 0, "Alice Johnson", "$2a$11$EIX4n0kIEuFhXDJ1yJsy..PCMLz7pQ6XZ8UoRQvM5CnxyyCP6Yl82", "555-1003", 4.7000000000000002, "staff", "", "active" },
                    { new Guid("44444444-4444-4444-4444-444444444444"), "bob1@example.com", 0, "Bob Brown", "$2a$11$EIX4n0kIEuFhXDJ1yJsy..PCMLz7pQ6XZ8UoRQvM5CnxyyCP6Yl82", "555-1004", 4.0999999999999996, "staff", "", "offline" },
                    { new Guid("55555555-5555-5555-5555-555555555555"), "sara1@example.com", 0, "Sara White", "$2a$11$EIX4n0kIEuFhXDJ1yJsy..PCMLz7pQ6XZ8UoRQvM5CnxyyCP6Yl82", "555-1005", 4.7999999999999998, "staff", "", "active" },
                    { new Guid("66666666-6666-6666-6666-666666666666"), "mike1@example.com", 0, "Mike Wilson", "$2a$11$EIX4n0kIEuFhXDJ1yJsy..PCMLz7pQ6XZ8UoRQvM5CnxyyCP6Yl82", "555-1006", 4.2999999999999998, "staff", "", "busy" },
                    { new Guid("77777777-7777-7777-7777-777777777777"), "emma1@example.com", 0, "Emma Davis", "$2a$11$EIX4n0kIEuFhXDJ1yJsy..PCMLz7pQ6XZ8UoRQvM5CnxyyCP6Yl82", "555-1007", 4.5999999999999996, "staff", "", "active" },
                    { new Guid("88888888-8888-8888-8888-888888888888"), "chris1@example.com", 0, "Chris Green", "$2a$11$EIX4n0kIEuFhXDJ1yJsy..PCMLz7pQ6XZ8UoRQvM5CnxyyCP6Yl82", "555-1008", 4.0, "staff", "", "offline" },
                    { new Guid("99999999-9999-9999-9999-999999999999"), "olivia1@example.com", 0, "Olivia Lee", "$2a$11$EIX4n0kIEuFhXDJ1yJsy..PCMLz7pQ6XZ8UoRQvM5CnxyyCP6Yl82", "555-1009", 4.9000000000000004, "staff", "", "active" },
                    { new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), "david1@example.com", 0, "David King", "$2a$11$EIX4n0kIEuFhXDJ1yJsy..PCMLz7pQ6XZ8UoRQvM5CnxyyCP6Yl82", "555-1010", 4.2000000000000002, "staff", "", "busy" }
                });
        }
    }
}
