using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace BlogProject.Enums
{
    public enum ModerationType
    {
        [Description("Explicit language")]
        Language,
        [Description("Sexually explicit content")]
        Sexual,
        [Description("Physical threat to harm")]
        Threatening
    }
}
