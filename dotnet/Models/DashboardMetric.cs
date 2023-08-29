using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Makai.Models.Domain.Metrics
{
    public class DashboardMetric
    {
        public List<UserStatus> UserStatusMetrics { get; set; }
        public UserGrowth UserGrowth { get; set; }
        public RevenueGrowth RevenueGrowth { get; set;}
    }
}
