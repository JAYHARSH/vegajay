using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Vega.Migrations
{
    public partial class MinorChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Vehicles(ContactEmail,ContactName,ContactPhone,isRegistered,LastUpdate,ModelId) VALUES ('1','2','3','true','12/04/2011',2)");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
