using System.ComponentModel.DataAnnotations.Schema;

namespace vega.Core.Models
{   [Table("VehiclesFeature")]
    public class VehicleFeature
    {
        public int VehicleId { get; set; }
        public int FeatureId { get; set; }

        public Vehicle vehicle { get; set; }
        public Feature Feature { get; set; }
    }
}