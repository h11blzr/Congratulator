using Congratulator.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace Congratulator.Data
{
    public class BirthdayDbContext : DbContext
    {
        public BirthdayDbContext(DbContextOptions<BirthdayDbContext> options) : base(options) { }

        public DbSet<BirthdayRecord> BirthdayRecords { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BirthdayRecord>().HasData(
                new BirthdayRecord() { Id = 1, Name = "Constantine", Date = DateTime.Parse("19-04-1993"), pictureUrl = "" },
                new BirthdayRecord() { Id = 2, Name = "Bob", Date = DateTime.Parse("27/02/1994"), pictureUrl = "" },
                new BirthdayRecord() { Id = 3, Name = "Alex", Date = DateTime.Parse("15/04/1994"), pictureUrl = "" },
                new BirthdayRecord() { Id = 4, Name = "Michael", Date = DateTime.Parse("01/02/1992"), pictureUrl = "" },
                new BirthdayRecord() { Id = 5, Name = "John", Date = DateTime.Parse("16/05/1993"), pictureUrl = "" },
                new BirthdayRecord() { Id = 6, Name = "Jack", Date = DateTime.Parse("29/10/1996"), pictureUrl = "" },
                new BirthdayRecord() { Id = 7, Name = "Sam", Date = DateTime.Parse("07/07/1987"), pictureUrl = "" },
                new BirthdayRecord() { Id = 8, Name = "Nataniel", Date = DateTime.Parse("13/12/1990"), pictureUrl = "" },
                new BirthdayRecord() { Id = 9, Name = "Kim", Date = DateTime.Parse("03/08/1996"), pictureUrl = "" },
                new BirthdayRecord() { Id = 10, Name = "Xavier", Date = DateTime.Parse("16/10/1991"), pictureUrl = "" },
                new BirthdayRecord() { Id = 11, Name = "Anna", Date = DateTime.Parse("07/04/1994"), pictureUrl = "" },
                new BirthdayRecord() { Id = 12, Name = "Denis", Date = DateTime.Parse("23/07/1993"), pictureUrl = "" }
                );
        }
    }
}
