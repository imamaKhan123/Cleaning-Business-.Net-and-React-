using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class FixStaffSeed2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("052c2e44-51f0-4d54-98a3-2b57f645b5ac"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("48107f85-c941-4b78-888c-b70c9d4ce969"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("4e133d0a-6f35-4c95-893f-696a1a31df7a"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("57202660-cfdc-415c-a1fa-18f3ecdc03a8"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("6a22521b-5efc-4eb5-bd3d-21e84e0f0bd9"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("79cf5dc9-f8bc-45fe-b507-1422f6c8a3e8"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("7a3b09bc-9155-499d-b000-f660c1cc4de3"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("bf35676d-2bad-441b-bf94-186090d72c39"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("ca0d83cc-ef5a-4dd9-8a43-b539dde54810"));

            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("ec6c134a-d548-466a-b0e3-1608eb0a8d4e"));

            migrationBuilder.InsertData(
                table: "Staff",
                columns: new[] { "Id", "Email", "JobsCompleted", "Name", "PasswordHash", "Phone", "Rating", "Role", "Specialties", "Status" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), "jane1@example.com", 0, "Jane Doe", "$2a$11$EIX4n0kIEuFhXDJ1yJsy..PCMLz7pQ6XZ8UoRQvM5CnxyyCP6Yl82", "555-1001", 4.5, "staff", "", "active" },
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Staff",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"));

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

            migrationBuilder.InsertData(
                table: "Staff",
                columns: new[] { "Id", "Email", "JobsCompleted", "Name", "PasswordHash", "Phone", "Rating", "Role", "Specialties", "Status" },
                values: new object[,]
                {
                    { new Guid("052c2e44-51f0-4d54-98a3-2b57f645b5ac"), "john1@example.com", 0, "John Smith", "$2a$11$41XyyldLSS23DpPr/HpS9.FozyDOFhxtk8znzG1IkJxZqSnhe0xmW", "555-1002", 4.2000000000000002, "staff", "", "busy" },
                    { new Guid("48107f85-c941-4b78-888c-b70c9d4ce969"), "chris1@example.com", 0, "Chris Green", "$2a$11$Ox43o93NBrl2IKdz6m0OPe5cvYa//FjInij.WIWWt4xr06/5hJpe2", "555-1008", 4.0, "staff", "", "offline" },
                    { new Guid("4e133d0a-6f35-4c95-893f-696a1a31df7a"), "alice1@example.com", 0, "Alice Johnson", "$2a$11$C1jolhm5naOZdGLFpkEuI.F4eqUvZJtJQU.bB6cWvsEyUhMbdCbam", "555-1003", 4.7000000000000002, "staff", "", "active" },
                    { new Guid("57202660-cfdc-415c-a1fa-18f3ecdc03a8"), "jane1@example.com", 0, "Jane Doe", "$2a$11$elfeNqZ0OvqtfcpIppTm6.9xvfxufa6Lt/Ok/5LYJHpDZDDmFPtxK", "555-1001", 4.5, "staff", "", "active" },
                    { new Guid("6a22521b-5efc-4eb5-bd3d-21e84e0f0bd9"), "david1@example.com", 0, "David King", "$2a$11$sHduc.He7vQRaC8GnmADE.nvfRcQXf.F6MV.xFJIq34gp.W4CIHp.", "555-1010", 4.2000000000000002, "staff", "", "busy" },
                    { new Guid("79cf5dc9-f8bc-45fe-b507-1422f6c8a3e8"), "bob1@example.com", 0, "Bob Brown", "$2a$11$giHQR1.rsaPzh6grQ0p3jOc6Y/0TGRmI8UreuaCg/MQd3HCq5bSyG", "555-1004", 4.0999999999999996, "staff", "", "offline" },
                    { new Guid("7a3b09bc-9155-499d-b000-f660c1cc4de3"), "sara1@example.com", 0, "Sara White", "$2a$11$Iort/M5GW5345sRwbZ8gr.JEnDM4ROkZQuVTmKap/Ba0enPSYpOwC", "555-1005", 4.7999999999999998, "staff", "", "active" },
                    { new Guid("bf35676d-2bad-441b-bf94-186090d72c39"), "mike1@example.com", 0, "Mike Wilson", "$2a$11$hWFWT0/KyCMF88GGoZpiceyKizQZOXwdU0p2Vle4sTGlMY5e1SvXK", "555-1006", 4.2999999999999998, "staff", "", "busy" },
                    { new Guid("ca0d83cc-ef5a-4dd9-8a43-b539dde54810"), "emma1@example.com", 0, "Emma Davis", "$2a$11$YFDqf/Yi.UBAc0f73Ac4/uO.UUSjHtB2gtl139GyXfQqHG/xQgaIm", "555-1007", 4.5999999999999996, "staff", "", "active" },
                    { new Guid("ec6c134a-d548-466a-b0e3-1608eb0a8d4e"), "olivia1@example.com", 0, "Olivia Lee", "$2a$11$yI5R97FXpAf.iiaaQpGRm.jthI1kUfXTBgBWKnnEpVHiEXcVlFVM2", "555-1009", 4.9000000000000004, "staff", "", "active" }
                });
        }
    }
}
