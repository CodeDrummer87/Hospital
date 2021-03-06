using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InternalAPI.DBContexts;
using InternalAPI.Modules.Implementation;
using InternalAPI.Modules.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace InternalAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            string connection = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<HospitalContext>(options => options.UseSqlServer(connection));

            services.AddCors(options => options.AddPolicy("AllowAllOrigin", builder => builder.
                                                                            AllowAnyOrigin().
                                                                            AllowAnyMethod().
                                                                            AllowAnyHeader()));
            services.AddControllers();

            services.AddScoped<IPatientDataTransfer, PatientDataTransfer>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("AllowAllOrigin");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
