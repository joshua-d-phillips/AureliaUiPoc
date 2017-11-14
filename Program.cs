﻿using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace Rubicon.UI.Aurelia {
	public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

		public static IWebHost BuildWebHost (string[] args) =>
			WebHost.CreateDefaultBuilder (args)
				.UseKestrel()
				.UseContentRoot(Directory.GetCurrentDirectory())
				.UseStartup<Startup> ()
				.Build ();
    }
}
