using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.DataBase.Classes
{
    public class User
    {
        public int id { get; set; }
        public string login { get; set; }
        public string pass { get; set; }
        public int role { get; set; }
    }
}
