
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Core.Models;
using vega.Core;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;

        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitofwork;
        public VehiclesController(IMapper mapper, IVehicleRepository repository, IUnitOfWork unitofwork)
        {
            this.unitofwork = unitofwork;
            this.repository = repository;
            this.mapper = mapper;
        }


        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody]VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = await repository.GetVehicle(id);
            if (vehicle == null)
                return NotFound();
            mapper.Map<VehicleResource, Vehicle>(vehicleResource, vehicle);
            vehicle.LastUpdate = System.DateTime.Now;
            await unitofwork.Complete();
            vehicle=await repository.GetVehicle(vehicle.Id);
            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateVehicle([FromBody]SaveVehicleResource vehicleResource)
        {
            
             
            if (!ModelState.IsValid)
           return BadRequest(ModelState);


            var vehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
            if (vehicle == null)
             return NotFound();
           
      
            vehicle.LastUpdate = System.DateTime.Now;
            repository.Add(vehicle);
            await unitofwork.Complete();
            vehicle = await repository.GetVehicle(vehicle.Id);
            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await repository.GetVehicle(id, includeRelated: false);
            if (vehicle == null)
                return NotFound();
            repository.Remove(vehicle);
            await unitofwork.Complete();
            return Ok(id);

        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicles(int id)
        {
            var vehicle = await repository.GetVehicle(id);
            if (vehicle == null)
                return NotFound();
            var vehicleResource = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(vehicleResource);
        }

        [HttpGet]
    
        public async Task<QueryResultResource<VehicleResource>> GetVehicles(VehicleQueryResource queryresource)
        {
            var vehiclequery=mapper.Map<VehicleQueryResource,VehicleQuery>(queryresource);
            var queryresult=await repository.GetVehicles(vehiclequery);
            return mapper.Map<QueryResult<Vehicle>,QueryResultResource<VehicleResource>>(queryresult);
        }

    }
}
