using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Makai.Models.Domain.Metrics
{
    public class UserGrowth
    {
        public Decimal WeeklyGrowth { get; set; }
        public Decimal MonthlyGrowth { get;set; }
        public Decimal YearlyGrowth { get; set; }
    }
}
