using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class FixStaffSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "AssignedName",
                table: "Jobs",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

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

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_AssignedTo",
                table: "Jobs",
                column: "AssignedTo");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Staff_AssignedTo",
                table: "Jobs",
                column: "AssignedTo",
                principalTable: "Staff",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Staff_AssignedTo",
                table: "Jobs");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_AssignedTo",
                table: "Jobs");

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

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "AssignedName",
                keyValue: null,
                column: "AssignedName",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "AssignedName",
                table: "Jobs",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

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
    }
}
