using BlogProject.Data;
using BlogProject.Enums;
using BlogProject.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogProject.Services
{
    public class DataService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<BlogUser> _userManager;

        public DataService(ApplicationDbContext dbContext, RoleManager<IdentityRole> roleManager, UserManager<BlogUser> userManager)
        {
            _dbContext = dbContext;
            _roleManager = roleManager;
            _userManager = userManager;
        }


        public async Task ManageDataAsync()
        {
            await _dbContext.Database.MigrateAsync();
            //Seed roles
            await SeedRolesAsync();
            //Seed users
            await SeedUsersAsync();
        }

        private async Task SeedRolesAsync()
        {
            // if roles exist, do nothing.
            if (_dbContext.Roles.Any()) return;
            //else create roles
            foreach (var role in Enum.GetNames(typeof(BlogRole)))
            {
                // use role manager to create roles
                await _roleManager.CreateAsync(new IdentityRole(role));
            }
        }


        private async Task SeedUsersAsync()
        {
            // if users exist, do nothing.
            if (_dbContext.Users.Any()) return;
            //else create a new instance of blog user
            var adminUser = new BlogUser()
            {
                Email = "mrevas919@gmail.com",
                UserName = "mrevas919@gmail.com",
                FirstName = "Marc",
                LastName = "Rivas",
                DisplayName = "mrivas",
                PhoneNumber = "(800) 555-1212",
                EmailConfirmed = true
            };
            await _userManager.CreateAsync(adminUser, "Abc&123");
            await _userManager.AddToRoleAsync(adminUser, BlogRole.Admin.ToString());

            var modUser = new BlogUser()
            {
                Email = "rachywolf@gmail.com",
                UserName = "rachywolf@gmail.com",
                DisplayName = "rachel",
                FirstName = "Rachel",
                LastName = "Rivas",
                PhoneNumber = "(800) 555-1213",
                EmailConfirmed = true
            };

            //use the user manager to create a new user
            await _userManager.CreateAsync(modUser, "Abc&123");

            //add seeded user to mod role
            await _userManager.AddToRoleAsync(modUser, BlogRole.Mod.ToString());
        }


    }
}
