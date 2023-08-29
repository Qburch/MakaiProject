using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Makai.Models.Requests.InsuranceOptions
{
    public class InsuranceOptionUpdateRequest: InsuranceOptionAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}
