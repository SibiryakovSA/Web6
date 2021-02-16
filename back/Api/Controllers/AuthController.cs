using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Models.DataBase;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models.DataBase.Classes;

namespace Api.Controllers
{

    public class AuthController : Controller
    {
        private readonly Context _db = null;

        public AuthController(Context context)
        {
            _db = context;
        }

        [HttpPost]
        public async Task<IActionResult> Registr(string userName, string pass, int role = 1)
        {
            User user = await _db.users.FirstOrDefaultAsync(u => u.login == userName);
            if (user == null)
            {
                // добавляем пользователя в бд
                _db.users.Add(new User { login = userName, pass = pass, role = role });
                await _db.SaveChangesAsync();

                await Authenticate(userName, role); // аутентификация

                return Ok();
            }

            return NotFound();
        }

        private async Task Authenticate(string userName, int role)
        {
            // создаем один claim
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userName),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, role.ToString())
            };
            // создаем объект ClaimsIdentity
            ClaimsIdentity id = new ClaimsIdentity(claims, 
                "ApplicationCookie", 
                ClaimsIdentity.DefaultNameClaimType, 
                ClaimsIdentity.DefaultRoleClaimType);
            // установка аутентификационных куки
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }

        [HttpPost]
        public async Task<IActionResult> Login(string userName, string pass)
        {
            var user = await _db.users.FirstOrDefaultAsync(u => u.login == userName && u.pass == pass);
            if (user != null)
            {
                await Authenticate(userName, user.role);
                return Ok();
            }

            return NotFound();
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }

        [HttpGet]
        public IActionResult GetUserLogin()
        {
            if (User.Claims.ToList().Count != 0)
            {
                var userName = User.Claims.ToList()[0].Value;
                if (userName != null)
                {
                    return Ok(userName);
                }
            }

            return NotFound("Not Login");
        }
    }
}
