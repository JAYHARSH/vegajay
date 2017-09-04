using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Core.Models;
using vega.Persistence;

namespace vega.Controllers
{
    public class FeaturesController
    {
        private readonly VegaDbContext context;

        public FeaturesController(VegaDbContext context)
        {
            this.context=context;
        }
       [HttpGet("/api/features")]
    
        public async Task<IEnumerable<Feature>> GetFeatures()
        {
        
          var features = await context.Features.ToListAsync();
          return features;

        }
    }
}