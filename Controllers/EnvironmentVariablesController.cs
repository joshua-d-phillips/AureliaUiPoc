using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AureliaUiPoc.Controllers {
	[Route ("[controller]")]
	public class EnvironmentVariablesController : Controller {
		[HttpGet ("{key}")]
		public async Task<IActionResult> Get (string key) =>
			await Task.Run (() => {
				IActionResult result = null;

				var value = Environment.GetEnvironmentVariable (key);

				if (value != null)
					result = new OkObjectResult (new EnvironmentVariable { Key = key, Value = value });
				else
					result = new ObjectResult ($"Environment variable `{key}` not configured.") { StatusCode = 500 };

				return result;
			});

		//[HttpGet ("{key}")]
		//public IActionResult Get (string key) {
		//	IActionResult result = null;

		//	var value = Environment.GetEnvironmentVariable (key);

		//	if (value != null)
		//		result = new OkObjectResult (new EnvironmentVariable { Key = key, Value = value });
		//	else
		//		result = new ObjectResult ($"Environment variable `{key}` not configured.") { StatusCode = 500 };

		//	return result;
		//}
	}

	public class EnvironmentVariable {
		public string Key { get; set; }
		public string Value { get; set; }
	}
}
