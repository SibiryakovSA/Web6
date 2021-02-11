using Microsoft.EntityFrameworkCore;
using Api.Models.DataBase.Classes;

namespace Api.Models.DataBase
{
    public class Context: DbContext
    {
        public DbSet<User> users { get; set; }
        public DbSet<Issue> issues { get; set; }
        public DbSet<Comment> comments { get; set; }

        public Context(DbContextOptions<Context> options) 
            :base(options)
        {
            //Database.EnsureCreated();   // создаем базу данных при первом обращении
        }

    }
}
