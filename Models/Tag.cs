﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BlogProject.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public string BlogUserId { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "The {0} must be at least {2} and no more than {1}")]
        public string Text { get; set; }

        //Navigational Props
        public virtual Post Post { get; set; }
        public virtual BlogUser BlogUser { get; set; }

    }
}
