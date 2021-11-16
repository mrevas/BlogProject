using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BlogProject.ViewModels
{
    public class ContactMe
    {
        [Required]
        [StringLength(100, ErrorMessage ="The {0} must be at least {2} and no more than {1} character long.", MinimumLength =2)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100, ErrorMessage ="The {0} must be at least {2} and no more than {1} character long.", MinimumLength =2)]
        public string Email { get; set; }

        [Phone]
        public string Phone { get; set; }

        [Required]
        [StringLength(100, ErrorMessage ="The {0} must be at least {2} and no more than {1} character long.", MinimumLength =2)]
        public string Subject { get; set; }

        [Required]
        [StringLength(500, ErrorMessage = "The {0} must be at least {2} and no more than {1} character long.", MinimumLength = 2)]
        public string Message { get; set; }
    }
}
