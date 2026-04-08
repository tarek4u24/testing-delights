* Increase RAM space for Jmeter:
For Peak Load, modified the Heap size to 8GB RAM with G1GC garbage collector as (edited jmeter.bat):
` set HEAP=-Xms2g -Xmx8g -XX:MaxMetaspaceSize=512m -XX:+UseG1GC `

* Edit dashboard.bat and run it after the PT run to generate the Jmeter dashboard

* Groovy as a language for processors in Jmeter

* Add the host, filepath, global variables etc in Testplan

# Add Useful Plugins to your current Jmeter
1. UltimateThreadGroup https://jmeter-plugins.org/wiki/UltimateThreadGroup/
![image](https://user-images.githubusercontent.com/71566262/198200714-c6dab801-ee09-498d-b616-5134ed0446ac.png)

2. Add Plugins Manager https://jmeter-plugins.org/wiki/PluginsManager/

# 🧰 Most Common Components for HTTP API Testing
Below are the most frequently used elements in real performance test plans.
## 🔧 Pre‑Processors
1. JSR223 PreProcessor: Create variables from datasets to be used in the test e.g. Dataset as CSV

## 🔽 Post‑Processors
1. JSON Extractor: Extract values from the response JSON
2. JSR223 PostProcessor: Create variables from the fetched value
## 🧾 Config Elements
1. HTTP Header Manager: set the headers for the API requests e.g. Authorization, Content-Type
2. CSV Data Set Config: Read Data from CSV

## 🔁 Logic Controllers
1. Loop controller: To keep looping the HTTP requests Sampler (APIs)
2. Throughput Controller: To Control the %Distribution of load between different APIs

## 🌐 Samplers
1. HTTP Request: Create the API Requests

## ✔ Assertions
1. JSON Assertion: Assert expected response
## 👀 Listeners
1. Listener.View Results Tree: To view the requests response in more details (add a Filename to save the results)
2. Listener.Aggregate Report: To view the requests aggregates in a table