using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Congratulator.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BirthdayRecords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    pictureUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BirthdayRecords", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "BirthdayRecords",
                columns: new[] { "Id", "Date", "Name", "pictureUrl" },
                values: new object[,]
                {
                    { 1, new DateTime(1993, 4, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), "Constantine", "" },
                    { 2, new DateTime(1994, 2, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), "Bob", "" },
                    { 3, new DateTime(1994, 4, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Alex", "" },
                    { 4, new DateTime(1992, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Michael", "" },
                    { 5, new DateTime(1993, 5, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), "John", "" },
                    { 6, new DateTime(1996, 10, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), "Jack", "" },
                    { 7, new DateTime(1987, 7, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "Sam", "" },
                    { 8, new DateTime(1990, 12, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "Nataniel", "" },
                    { 9, new DateTime(1996, 8, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "Kim", "" },
                    { 10, new DateTime(1991, 10, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), "Xavier", "" },
                    { 11, new DateTime(1994, 4, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "Anna", "" },
                    { 12, new DateTime(1993, 7, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), "Denis", "" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BirthdayRecords");
        }
    }
}
