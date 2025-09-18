using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class SeedStaffWithPassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Staff",
                columns: new[] { "Id", "Email", "JobsCompleted", "Name", "PasswordHash", "Phone", "Rating", "Role", "Specialties", "Status" },
                values: new object[,]
                {
                    { new Guid("24d5c3d3-8cf4-421c-8fe2-f922bb943d56"), "olivia1@example.com", 0, "Olivia Lee", "$2a$11$mfAIXO3ezYqkcqi6n8X29O6DruaVVTlLAgDbewx7Q4g6l3f2H3PKq", "555-1009", 4.9000000000000004, "staff", "", "active" },
                    { new Guid("26673c20-e172-443a-8cc8-4bdcacd00251"), "alice1@example.com", 0, "Alice Johnson", "$2a$11$tgHi2UjbUUerAwNwJGS6Ku5hwBXLqmzj3PICKxza.QfoiSHgrWMci", "555-1003", 4.7000000000000002, "staff", "", "active" },
                    { new Guid("462adfb4-a302-44eb-b5e4-dea488c1d4d2"), "john1@example.com", 0, "John Smith", "$2a$11$Ru.c/DvGnqIHrXzvIYbuieIjTDVL3RDtHXinY6zBrNqFmGDxRb7r.", "555-1002", 4.2000000000000002, "staff", "", "busy" },
                    { new Guid("746d7cb2-17c8-4f22-b65f-6595193e53b0"), "sara1@example.com", 0, "Sara White", "$2a$11$WEq0WH6gBwhNO7fRkV7cS.4fjheUVstOz/ir3RwnbBzXLI9nazpZu", "555-1005", 4.7999999999999998, "staff", "", "active" },
                    { new Guid("7add9704-fdef-4729-adce-1edb64653e20"), "bob1@example.com", 0, "Bob Brown", "$2a$11$eGYhH7AN/wVezE8clFjUeOlEhGJAysEzkWKKiskeesFJjmh4I3T/C", "555-1004", 4.0999999999999996, "staff", "", "offline" },
                    { new Guid("90fec09d-cc22-47f4-ba0a-28ac853113b6"), "jane1@example.com", 0, "Jane Doe", "$2a$11$.hDD9TaONP.omDAwm.yDveXyswkazAT0vg/GrYlicBmNNACB7.5rC", "555-1001", 4.5, "staff", "", "active" },
                    { new Guid("a5dfdb2d-5e7a-474e-920d-59f7b1fd5ddd"), "chris1@example.com", 0, "Chris Green", "$2a$11$3Dqlv3A//n7y7ZWykYdP7.eyC5HdB4IUJTFyxgYD7ntQWfLr3RZYu", "555-1008", 4.0, "staff", "", "offline" },
                    { new Guid("a9d604cb-8892-425f-9901-74eccfcb65f1"), "emma1@example.com", 0, "Emma Davis", "$2a$11$ebaI3RSrddE9/LDowrLSU.oFOnaPpU6IzCFds33r8cmPvXB6.mWNy", "555-1007", 4.5999999999999996, "staff", "", "active" },
                    { new Guid("b77976d9-9a87-42dc-b9a7-be03d359ed14"), "mike1@example.com", 0, "Mike Wilson", "$2a$11$0fT22JLO4qPuqm8jeEfW0.un655eQIa6Mf9k/V05FBo8CxZAC/Xga", "555-1006", 4.2999999999999998, "staff", "", "busy" },
                    { new Guid("d04cd190-da97-449f-baa5-6b42f2aaa555"), "david1@example.com", 0, "David King", "$2a$11$2YckThZXB2BiPfykjOJ/1.R4B7j7wbOdDAkmiTxRLqgY8EtSG43oO", "555-1010", 4.2000000000000002, "staff", "", "busy" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("24d5c3d3-8cf4-421c-8fe2-f922bb943d56"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("26673c20-e172-443a-8cc8-4bdcacd00251"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("462adfb4-a302-44eb-b5e4-dea488c1d4d2"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("746d7cb2-17c8-4f22-b65f-6595193e53b0"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("7add9704-fdef-4729-adce-1edb64653e20"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("90fec09d-cc22-47f4-ba0a-28ac853113b6"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("a5dfdb2d-5e7a-474e-920d-59f7b1fd5ddd"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("a9d604cb-8892-425f-9901-74eccfcb65f1"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("b77976d9-9a87-42dc-b9a7-be03d359ed14"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("d04cd190-da97-449f-baa5-6b42f2aaa555"));
        }
    }
}
