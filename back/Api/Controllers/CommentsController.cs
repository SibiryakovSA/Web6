using System;
using System.Linq;
using Api.Models.DataBase;
using Api.Models.DataBase.Classes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class CommentsController : Controller
    {
        private readonly Context _db = null;

        public CommentsController(Context context)
        {
            _db = context;
        }
        
        [Authorize]
        [HttpGet]
        public IActionResult GetIssueComments(int issueId)
        {
            var userClaims = User.Claims.ToList();
            var user = _db.users.FirstOrDefault(u => u.login == userClaims[0].Value);
            var issue = _db.issues.FirstOrDefault(i => i.id == issueId);
            
            if (issue == null)
                return NotFound();

            if (userClaims[1].Value != "2" && issue.userId != user.id)
                return NotFound();

            var comments = _db.comments.Where(x => x.taskId == issueId);
            return Ok(comments);
        }

        [Authorize]
        [HttpPost]
        public IActionResult AddIssueComment(int issueId, string commentText)
        {
            var userClaims = User.Claims.ToList();
            var user = _db.users.FirstOrDefault(u => u.login == userClaims[0].Value);
            var issue = _db.issues.FirstOrDefault(i => i.id == issueId);
            
            if (issue == null)
                return NotFound();

            if (userClaims[1].Value != "2" && issue.userId != user.id)
                return NotFound();

            var comment = new Comment()
            {
                commentText = commentText,
                creationDateAndTime = DateTime.Now,
                taskId = issueId,
                userId = user.id
            };

            _db.comments.Add(comment);
            _db.SaveChanges();
            return Ok();
        }
    }
}