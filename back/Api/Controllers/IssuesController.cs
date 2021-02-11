﻿using System.Linq;
using Api.Models.DataBase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Api.Models.DataBase.Classes;

namespace Api.Controllers
{
    [Authorize]
    public class IssuesController : Controller
    {
        private readonly Context _db = null;

        public IssuesController(Context context)
        {
            _db = context;
        }
        
        [HttpGet]
        public IActionResult GetIssues()
        {
            if (User.Claims.ToList()[1].Value == "2")
                return GetAllIssues();
            return GetUserIssues();
        }

        [Authorize(Roles = "2")]
        [HttpGet]
        public IActionResult GetAllIssues()
        {
            return Ok(_db.issues);
        }

        [HttpGet]
        public IActionResult GetUserIssues()
        {
            var user = _db.users.FirstOrDefault(x => x.login == User.Claims.ToList()[0].Value);
            return Ok(_db.issues.Where(x => x.userId == user.id));
        }

        [HttpPost]
        public IActionResult DeleteIssue(int id)
        {
            var user = _db.users.FirstOrDefault(x => x.login == User.Claims.ToList()[0].Value);
            IQueryable<Issue> userIssues;
            if (user.role == 2)
            {
                userIssues = _db.issues;
            }
            else
                userIssues = _db.issues.Where(x => x.userId == user.id);

            var issue = userIssues.FirstOrDefault(x => x.id == id);
            if (issue != null) {
                var comments = _db.comments.Where(x => x.taskId == issue.id);
                _db.RemoveRange(comments);
                _db.Remove(issue);
                _db.SaveChanges();
                return Ok();
            }

            return NotFound();
        }

        [HttpPost]
        public IActionResult AddIssue(string issueName, string issueText = "", bool isComplited = false)
        {
            var user = _db.users.FirstOrDefault(x => x.login == User.Claims.ToList()[0].Value);
            var issue = new Issue() { isComplited = isComplited, issueText = issueText, issueName = issueName, userId = user.id };

            var result = _db.issues.Add(issue);
            _db.SaveChanges();

            return Ok(result.Entity.id);
        }

        [HttpPost]
        public IActionResult EditIssue(int issueId, string issueName = null, string issueText = null,
            bool? isComplited = null)
        {
            var userClaims = User.Claims.ToList();
            var user = _db.users.FirstOrDefault(u => u.login == userClaims[0].Value);
            var issue = _db.issues.FirstOrDefault(i => i.id == issueId);
            
            if (issue == null)
                return NotFound();

            if (userClaims[1].Value != "2" && issue.userId != user.id)
                return NotFound();

            if (issueName == null && issueText == null && isComplited == null)
                return NotFound();
            
            if (issueName != null) 
                issue.issueName = issueName;

            if (issueText != null)
                issue.issueText = issueText;

            if (isComplited != null) 
                issue.isComplited = (bool) isComplited;

            _db.SaveChanges();
            return Ok();
        }
    }
}